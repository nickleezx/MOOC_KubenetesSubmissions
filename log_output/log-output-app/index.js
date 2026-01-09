import { v4 as uuidv4 } from "uuid";
import http from "http";
import fs from "fs/promises";
import path from "path";

const PORT = process.env.PORT || 3001;
const LOG_DIR = path.join(process.cwd(), "shared");
const LOG_FILE = path.join(LOG_DIR, "log_output.txt");

const appendToFile = async (message) => {
  try {
    fs.appendFile(
      LOG_FILE,
      `\n${message}`,
      "utf8"
    );
  } catch (e) {
    console.error(e);
  }
};

setInterval( async () => {
  const message = `${new Date().toISOString()}: ${uuidv4()}`
  console.log(`${message}`);
  await appendToFile(`${message}`)
}, 5000);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`${new Date().toISOString()}: ${uuidv4()}`);
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
