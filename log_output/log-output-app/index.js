import { v4 as uuidv4 } from "uuid";
import http from "http";
import fs from "fs/promises";
import path from "path";

const PORT = process.env.PORT || 3001;
const LOG_DIR = path.join(process.cwd(), "shared");
const LOG_FILE = path.join(LOG_DIR, "log_output.txt");
const PING_PONG_FILE = path.join(LOG_DIR + "1", "ping-pong-requests.txt");

try {
  await fs.mkdir(LOG_DIR, { recursive: true });
} catch (err) {
  console.error("Could not create directory:", err);
}

const appendToFile = async (message) => {
  try {
    fs.appendFile(LOG_FILE, `\n${message}`, "utf8");
  } catch (e) {
    console.error(e);
  }
};

setInterval(async () => {
  const message = `${new Date().toISOString()}: ${uuidv4()}`;
  console.log(`${message}`);
  await appendToFile(`${message}`);
}, 5000);

const server = http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile(PING_PONG_FILE, "utf8").catch(() => "0");
    const pingCount = parseInt(data, 10) || 0;
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    res.end(
      `${new Date().toISOString()}: ${uuidv4()}\n Ping count: ${pingCount}`
    );
  } catch (err) {
    console.error(err);
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
