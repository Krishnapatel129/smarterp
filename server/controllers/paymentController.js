import pool from "../config/db.js";

export const createPayment = async (req, res) => {
  try {
    const {
      payment_no,
      payment_date,
      supplier_id,
      payment_mode,
      amount,
      narration,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO payment_vouchers
       (payment_no, payment_date, supplier_id, payment_mode, amount, narration)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [payment_no, payment_date, supplier_id, payment_mode, amount, narration]
    );

    res.status(201).json({
      message: "Payment voucher created successfully",
      payment: result.rows[0],
    });
  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error);

    if (error.code === "23505") {
      return res.status(409).json({ message: "Payment No already exists" });
    }

    res.status(500).json({ message: "Failed to create payment" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.payment_no,
        p.payment_date,
        l.ledger_name AS supplier_name,
        p.payment_mode,
        p.amount,
        p.narration
      FROM payment_vouchers p
      LEFT JOIN ledgers l ON p.supplier_id = l.id
      ORDER BY p.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("GET PAYMENTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM payment_vouchers WHERE id = $1", [id]);

    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("DELETE PAYMENT ERROR:", error);
    res.status(500).json({ message: "Failed to delete payment" });
  }
};