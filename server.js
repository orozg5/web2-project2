import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";
import { serialize, parse } from "cookie";
import { SignJWT, jwtVerify } from "jose";

async function encrypt(payload) {
  const key = new TextEncoder().encode(process.env.REACT_APP_ENCRYPTION_KEY);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(key);
}

async function decrypt(input) {
  const key = new TextEncoder().encode(process.env.REACT_APP_ENCRYPTION_KEY);
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

async function checkRole(req, res, next) {
  const cookieValue = parse(req.headers.cookie || "")["session"];
  let user = { role: "" };
  if (cookieValue) {
    user = await decrypt(cookieValue);
  }

  if (user.role === "admin") {
    req.user = { role: "admin" };
    next();
  } else {
    res.status(403).send("Access denied!");
  }
}

const sanitize = (txt) => {
  const chars = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  txt = txt.replace(/[&<>"']/g, (c) => chars[c]);
  txt = txt
    .replace(/javascript:/gi, "")
    .replace(/script/gi, "")
    .replace(/alert/gi, "");
  return txt;
};

dotenv.config();
const app = express();
const port = parseInt(process.env.PORT) || 8080;
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL || "", process.env.REACT_APP_SUPABASE_ANON_KEY || "");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
    credentials: true,
  })
);
app.use(express.static("public"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/page", checkRole, (req, res) => {
  res.render("page", { user: req.user });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }

  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
  let isPasswordValid = false;
  if (data) {
    isPasswordValid = password == data.password;
  }

  if (!isPasswordValid || error || !data) {
    return res.status(401).json({ error: "Invalid credentials!" });
  }

  const encryptedSessionData = await encrypt({
    first_name: data.first_name,
    last_name: data.last_name,
    role: data.role,
    email: data.email,
  });

  const cookie = serialize("session", encryptedSessionData, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ first_name: data.first_name, last_name: data.last_name, role: data.role, email: data.email });
});

app.post("/api/logout", async (req, res) => {
  res.clearCookie('session');
  res.status(200).json({message: "Succesfully logged out!"})
});

app.get("/api/user", async (req, res) => {
  const cookieValue = parse(req.headers.cookie || "")["session"];

  let userData;
  if (cookieValue) {
    const user = await decrypt(cookieValue);
    userData = {
      role: user.role,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  }

  res.status(200).json(userData);
});

app.post("/api/xss", async (req, res) => {
  try {
    const { data } = req.body;
    // it was already sanitized on the frontend, but we can do it on the backend too just in case
    // after that we could save it to db
    res.status(200).json({ text: sanitize(data) });
  } catch (err) {
    res.status(500);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log("Server running!");
});
