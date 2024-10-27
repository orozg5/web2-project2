import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());

app.listen(port, () => {
  console.log("Server running!");
});
