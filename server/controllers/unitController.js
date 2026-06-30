import pool from "../config/db.js";

export const createUnit = async (req, res) => {
  try {
    const { unit_name, symbol } = req.body;

    const result = await pool.query(
      `INSERT INTO units (unit_name, symbol)
      VALUES ($1,$2) RETURNING *`,
      [unit_name, symbol]
    );

    res.status(201).json({ message: "Unit created", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Create failed", error: error.message });
  }
};

export const getUnits = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM units ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

export const getUnitById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM units WHERE id=$1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Unit not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const { unit_name, symbol } = req.body;

    const result = await pool.query(
      `UPDATE units SET unit_name=$1, symbol=$2
      WHERE id=$3 RETURNING *`,
      [unit_name, symbol, req.params.id]
    );

    res.json({ message: "Unit updated", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    await pool.query("DELETE FROM units WHERE id=$1", [req.params.id]);
    res.json({ message: "Unit deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};