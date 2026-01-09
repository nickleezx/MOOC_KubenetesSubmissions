import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;
const LOG_DIR = path.join(process.cwd(), "shared");
const LOG_FILE = path.join(LOG_DIR, "log_output.txt");

app.get("/file-content", async (req, res) => {
  const data = await fs.readFile(LOG_FILE, "utf8");
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`File reader application is running on http://localhost:${PORT}`);
});
