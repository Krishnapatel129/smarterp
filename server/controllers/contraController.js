import pool from "../config/db.js";

export const createContra = async (req, res) => {
  try {
    const {
      voucher_no,
      voucher_date,
      from_account,
      to_account,
      amount,
      narration,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO contra_vouchers
      (voucher_no, voucher_date, from_account, to_account, amount, narration)
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        voucher_no,
        voucher_date,
        from_account,
        to_account,
        amount,
        narration,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        message: "Voucher No already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create contra voucher",
    });
  }
};

export const getContraList = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        c.id,
        c.voucher_no,
        c.voucher_date,
        f.ledger_name AS from_account,
        t.ledger_name AS to_account,
        c.amount,
        c.narration
      FROM contra_vouchers c
      LEFT JOIN ledgers f ON c.from_account=f.id
      LEFT JOIN ledgers t ON c.to_account=t.id
      ORDER BY c.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch contra vouchers",
    });
  }
};

export const deleteContra = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM contra_vouchers WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Delete failed",
    });
  }
};