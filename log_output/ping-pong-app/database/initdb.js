import { readFileSync } from 'fs';
import { join } from 'path';
import pool from '../config/database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initDatabase() {
  const sqlFiles = ['schema.sql']; // Order matters
  
  try {
    for (const filename of sqlFiles) {
      console.log(`Executing ${filename}...`);
      const filePath = join(__dirname, filename);
      const sql = readFileSync(filePath, 'utf8');
      await pool.query(sql);
    }
    console.log('Database initialization complete');
  } catch (err) {
    console.error('Database initialization failed:', err);
    throw err;
  }
}

export default initDatabase;
