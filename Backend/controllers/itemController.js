const pool = require("../db");

// Create Table Automatically
const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price NUMERIC NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

createTable();

// GET ALL
exports.getItems = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM items ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM items WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Item not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.createItem = async (req, res) => {
  try {
    const { name, price } = req.body;

    const result = await pool.query(
      "INSERT INTO items (name, price) VALUES ($1,$2) RETURNING *",
      [name, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const result = await pool.query(
      "UPDATE items SET name=$1, price=$2 WHERE id=$3 RETURNING *",
      [name, price, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM items WHERE id=$1", [id]);

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
