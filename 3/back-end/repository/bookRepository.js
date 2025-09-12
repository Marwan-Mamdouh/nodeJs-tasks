import fs from "fs";

const filePath = "db/books.json";

export function readJson() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON:", err);
    return [];
  }
}

export function writeJson(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing JSON:", err);
  }
}
