import express from "express";
import path from "path";
import axios from "axios";
import cors from "cors";
import fs from "fs/promises";
import { existsSync, createWriteStream } from "fs";

const PORT = process.env.PORT || 3001;
const VOLUME_DIR = path.join(process.cwd(), "images");
const IMAGE_FILE = path.join(VOLUME_DIR, "image.jpg");

try {
  await fs.mkdir(VOLUME_DIR, { recursive: true });
} catch (err) {
  console.error("Could not create directory:", err);
}

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Required if you use cookies or sessions
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world from express!</h1>");
});

app.get("/api/image", async (req, res) => {
  try {
    let shouldDownload = false;

    if (existsSync(IMAGE_FILE)) {
      const stats = await fs.stat(IMAGE_FILE);
      const ageInMs = Date.now() - stats.mtime.getTime();

      // download image if older than 10 mins
      if (ageInMs > 1000 * 60 * 10) {
        shouldDownload = true;
      }
    } else {
      shouldDownload = true;
    }

    if (shouldDownload) {
      const response = await axios({
        url: "https://picsum.photos/1200",
        method: "GET",
        responseType: "stream",
      });

      res.setHeader("Content-Type", response.headers["content-type"]);
      const writer = createWriteStream(IMAGE_FILE);
      await new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
      res.sendFile(IMAGE_FILE);
    } else {
      res.sendFile(IMAGE_FILE);
    }
  } catch (error) {
    console.error(error);
    if (!res.headersSent) res.status(500).send("Server Error");
  }
});

const todoNotes = ["Learn Javascript", "Learn React", "Build a project"];

app.get("/api/todo", (req, res) => {
  res.json(todoNotes);
});

app.post("/api/todo", (req, res) => {
  const { title } = req.body;
  todoNotes.push(title)
  res.json(todoNotes)
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
