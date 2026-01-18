import express from 'express'
import path from "path";
import fs from "fs/promises";
import pool from './config/database.js'
import initDatabase from './database/initdb.js';

const app = express()
const PORT = process.env.PORT || 3001

// const LOG_DIR = path.join(process.cwd(), "shared1");
// const LOG_FILE = path.join(LOG_DIR, "ping-pong-requests.txt");

// const updatePingPongCount = async (pingCount) => {
//   try {
//     await fs.writeFile(LOG_FILE, String(pingCount))
//   } catch (error) {
//     console.error(error)
//   }
// }

// try {
//   await fs.mkdir(LOG_DIR, { recursive: true });
// } catch (err) {
//   console.error("Could not create directory:", err);
// }

// const data = await fs.readFile(LOG_FILE, "utf8").catch(() => "0");
// let pingCount = parseInt(data, 10) || 0;

app.get('/', (req, res) => {
  res.send("ping pong application")
})

app.get('/api/pingpong', async (req, res) => {
  try {
  const query = `
    INSERT INTO ping_pong_request (id, count) 
    VALUES (1, 1) 
    ON CONFLICT (id) 
    DO UPDATE SET count = ping_pong_request.count + 1 
    RETURNING count
  `;

  const result = await pool.query(query);
  const newCount = result.rows[0].count;
  
  res.send(`pong ${newCount}`);
} catch (err) {
  console.error(err);
  res.status(500).send('Server error');
}
});


process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await pool.end();
  process.exit(0);
});


initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Ping pong application is running on http://localhost:${PORT}`)
  })
}).catch(err => console.error('Failed to initialise database', err))