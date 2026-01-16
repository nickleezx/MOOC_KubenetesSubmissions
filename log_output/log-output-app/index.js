import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import express from "express";

const PORT = process.env.PORT || 3001;
const LOG_DIR = path.join(process.cwd(), "shared");
const LOG_FILE = path.join(LOG_DIR, "log_output.txt");
const PING_PONG_FILE = path.join(LOG_DIR + "1", "ping-pong-requests.txt");
const BASE_URL = process.env.BASE_URL || "http://localhost:8081/api/";
const ENV_MESSAGE = process.env.MESSAGE || "No message found";
const configFilePath =
  process.env.NODE_ENV === "dev"
    ? path.join(process.cwd(), "information.txt")
    : "/config/information.txt";

try {
  await fs.mkdir(LOG_DIR, { recursive: true });
} catch (err) {
  console.error("Could not create directory:", err);
}

const app = express();

app.get("/", async (req, res) => {
  try {
    // Read ping counts from file
    // const data = await fs.readFile(PING_PONG_FILE, "utf8").catch(() => "0");
    // const pingCount = parseInt(data, 10) || 0;

    // make http request to get ping count
    const response = await axios.get(`${BASE_URL}/pingpong`);
    const data = response.data;
    const pingCount = Number(data.split(" ")[1]);
    console.log("data:", data);
    console.log("pingCount:", pingCount);

    // Read information.txt config
    const configInformation = await fs
      .readFile(configFilePath, "utf8")
      .catch(() => "File not found");

    if (!pingCount) {
      throw new Error("Failed to convert number of pings from str to int");
    }

    res.end(
      [
        `file content: ${configInformation}`,
        `env variable: ${ENV_MESSAGE}`,
        `${new Date().toISOString()}: ${uuidv4()}`,
        `Ping count: ${pingCount}`,
      ].join("\n")
    ); // Joins them with a newline, but NO leading spaces
  } catch (err) {
    console.error(err);
  }
});

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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
