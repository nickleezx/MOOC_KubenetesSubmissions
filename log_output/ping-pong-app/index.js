import express from 'express'
import path from "path";
import fs from "fs/promises";

const app = express()
const PORT = process.env.PORT || 3001

const LOG_DIR = path.join(process.cwd(), "shared1");
const LOG_FILE = path.join(LOG_DIR, "ping-pong-requests.txt");

const updatePingPongCount = async (pingCount) => {
  try {
    await fs.writeFile(LOG_FILE, String(pingCount))
  } catch (error) {
    console.error(error)
  }
}

try {
  await fs.mkdir(LOG_DIR, { recursive: true });
} catch (err) {
  console.error("Could not create directory:", err);
}

const data = await fs.readFile(LOG_FILE, "utf8").catch(() => "0");
let pingCount = parseInt(data, 10) || 0;

app.get('/', (req, res) => {
  res.send("ping pong application")
})

app.get('/api/pingpong', async (req, res) => {
  res.send(`pong ${pingCount}`)
  pingCount += 1
  await updatePingPongCount(pingCount)
})

app.listen(PORT, () => {
  console.log(`Ping pong application is running on http://localhost:${PORT}`)
})