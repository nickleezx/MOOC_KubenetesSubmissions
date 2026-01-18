import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER || "your_user",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "your_database",
  password: process.env.POSTGRES_PASSWORD || "your_password",
  port: process.env.POSTGRES_PORT || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
