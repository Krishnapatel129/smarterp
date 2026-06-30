import pool from "../config/db.js";

export const createLedger = async (req, res) => {
  try {
    const {
      ledger_name,
      group_name,
      opening_balance,
      balance_type,
      email,
      phone,
      address,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO ledgers 
      (ledger_name, group_name, opening_balance, balance_type, email, phone, address)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [ledger_name, group_name, opening_balance, balance_type, email, phone, address]
    );

    res.status(201).json({
      message: "Ledger created successfully",
      ledger: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Ledger creation failed", error: error.message });
  }
};

export const getLedgers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ledgers ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ledgers", error: error.message });
  }
};

export const getLedgerById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ledgers WHERE id=$1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ledger not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ledger", error: error.message });
  }
};

export const updateLedger = async (req, res) => {
  try {
    const {
      ledger_name,
      group_name,
      opening_balance,
      balance_type,
      email,
      phone,
      address,
    } = req.body;

    const result = await pool.query(
      `UPDATE ledgers SET
        ledger_name=$1,
        group_name=$2,
        opening_balance=$3,
        balance_type=$4,
        email=$5,
        phone=$6,
        address=$7
      WHERE id=$8
      RETURNING *`,
      [
        ledger_name,
        group_name,
        opening_balance,
        balance_type,
        email,
        phone,
        address,
        req.params.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ledger not found" });
    }

    res.json({
      message: "Ledger updated successfully",
      ledger: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Ledger update failed", error: error.message });
  }
};

export const deleteLedger = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM ledgers WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ledger not found" });
    }

    res.json({ message: "Ledger deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Ledger delete failed", error: error.message });
  }
};