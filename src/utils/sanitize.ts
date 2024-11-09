const chars: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
};

export const sanitize = (txt: string) => {
  txt = txt.replace(/[&<>"']/g, (c) => chars[c]);
  txt = txt
    .replace(/javascript:/gi, "")
    .replace(/script/gi, "")
    .replace(/alert/gi, "");
  return txt;
};
