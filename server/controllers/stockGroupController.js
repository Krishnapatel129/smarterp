import pool from "../config/db.js";

export const createStockGroup = async (req, res) => {
  try {
    const { group_name, parent_group, description } = req.body;

    const result = await pool.query(
      `INSERT INTO stock_groups 
      (group_name, parent_group, description)
      VALUES ($1,$2,$3) RETURNING *`,
      [group_name, parent_group, description]
    );

    res.status(201).json({ message: "Stock group created", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Create failed", error: error.message });
  }
};

export const getStockGroups = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stock_groups ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

export const getStockGroupById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stock_groups WHERE id=$1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Stock group not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

export const updateStockGroup = async (req, res) => {
  try {
    const { group_name, parent_group, description } = req.body;

    const result = await pool.query(
      `UPDATE stock_groups SET 
      group_name=$1, parent_group=$2, description=$3
      WHERE id=$4 RETURNING *`,
      [group_name, parent_group, description, req.params.id]
    );

    res.json({ message: "Stock group updated", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export const deleteStockGroup = async (req, res) => {
  try {
    await pool.query("DELETE FROM stock_groups WHERE id=$1", [req.params.id]);
    res.json({ message: "Stock group deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};