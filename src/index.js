import express from "express";
import dotenv from "dotenv";
import { createPool } from "mysql2/promise";

dotenv.config();

const app = express();
const PORT = process.env.APP_DOCKER_PORT;

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_DOCKER_PORT,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
 
app.get("/ping", async (req, res) => {
 const result = await pool.query('SELECT NOW()');
    res.json(result[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
