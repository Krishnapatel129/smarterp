import pool from "../config/db.js";

export const createStockItem = async (req, res) => {
  try {
    const {
      item_name,
      stock_group,
      unit,
      opening_stock,
      rate,
      gst_percentage,
      description,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO stock_items
      (item_name, stock_group, unit, opening_stock, rate, gst_percentage, description)
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [item_name, stock_group, unit, opening_stock, rate, gst_percentage, description]
    );

    res.status(201).json({ message: "Stock item created", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Create failed", error: error.message });
  }
};

export const getStockItems = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stock_items ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

export const getStockItemById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stock_items WHERE id=$1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

export const updateStockItem = async (req, res) => {
  try {
    const {
      item_name,
      stock_group,
      unit,
      opening_stock,
      rate,
      gst_percentage,
      description,
    } = req.body;

    const result = await pool.query(
      `UPDATE stock_items SET
      item_name=$1,
      stock_group=$2,
      unit=$3,
      opening_stock=$4,
      rate=$5,
      gst_percentage=$6,
      description=$7
      WHERE id=$8 RETURNING *`,
      [
        item_name,
        stock_group,
        unit,
        opening_stock,
        rate,
        gst_percentage,
        description,
        req.params.id,
      ]
    );

    res.json({ message: "Stock item updated", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export const deleteStockItem = async (req, res) => {
  try {
    await pool.query("DELETE FROM stock_items WHERE id=$1", [req.params.id]);
    res.json({ message: "Stock item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};