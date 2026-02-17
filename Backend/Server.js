import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- DATABASE CONNECTION ---------- */
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false
});

/* ---------- TEST DB CONNECTION ---------- */
pool.connect()
  .then(() => console.log("PostgreSQL connected ✅"))
  .catch(err => console.error("DB connection error ❌", err));

/* ---------- ROUTES ---------- */

// Health check
app.get("/", (req, res) => {
  res.send("Item Master Backend is running 🚀");
});

// Example: Get all items
app.get("/api/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Example: Add item
app.post("/api/items", async (req, res) => {
  const { name, price } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
