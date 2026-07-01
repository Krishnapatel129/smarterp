import pool from "../config/db.js";

export const createReceipt = async (req, res) => {
  try {
    const {
      receipt_no,
      receipt_date,
      customer_id,
      payment_mode,
      amount,
      narration,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO receipt_vouchers
       (receipt_no, receipt_date, customer_id, payment_mode, amount, narration)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        receipt_no,
        receipt_date,
        customer_id,
        payment_mode,
        amount,
        narration,
      ]
    );

    res.status(201).json({
      message: "Receipt voucher created successfully",
      receipt: result.rows[0],
    });
  } catch (error) {
    console.error("CREATE RECEIPT ERROR:", error);

    if (error.code === "23505") {
      return res.status(409).json({ message: "Receipt No already exists" });
    }

    res.status(500).json({ message: "Failed to create receipt" });
  }
};

export const getReceipts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        r.id,
        r.receipt_no,
        r.receipt_date,
        l.ledger_name AS customer_name,
        r.payment_mode,
        r.amount,
        r.narration
      FROM receipt_vouchers r
      LEFT JOIN ledgers l ON r.customer_id = l.id
      ORDER BY r.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("GET RECEIPTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch receipts" });
  }
};

export const deleteReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM receipt_vouchers WHERE id = $1", [id]);

    res.json({ message: "Receipt deleted successfully" });
  } catch (error) {
    console.error("DELETE RECEIPT ERROR:", error);
    res.status(500).json({ message: "Failed to delete receipt" });
  }
};