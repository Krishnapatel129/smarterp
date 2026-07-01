import pool from "../config/db.js";

export const getGSTReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id AS sale_id,
        s.invoice_no,
        s.sale_date,
        l.ledger_name AS customer_name,
        si.item_name,
        si.hsn_code,
        si.gst_percent,
        sales_items.quantity,
        sales_items.rate,
        sales_items.amount AS taxable_value,

        ROUND((sales_items.amount * si.gst_percent / 100), 2) AS gst_amount,
        ROUND((sales_items.amount * si.gst_percent / 200), 2) AS cgst,
        ROUND((sales_items.amount * si.gst_percent / 200), 2) AS sgst,
        ROUND((sales_items.amount + (sales_items.amount * si.gst_percent / 100)), 2) AS total_amount

      FROM sales_items
      LEFT JOIN sales s ON sales_items.sale_id = s.id
      LEFT JOIN ledgers l ON s.customer_id = l.id
      LEFT JOIN stock_items si ON sales_items.stock_item_id = si.id
      ORDER BY s.sale_date DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("GST REPORT ERROR:", error);
    res.status(500).json({ message: "Failed to fetch GST report" });
  }
};