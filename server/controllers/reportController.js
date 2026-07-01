import pool from "../config/db.js";

export const getSalesReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id,
        s.voucher_no,
        s.invoice_no,
        s.sale_date,
        l.ledger_name AS customer_name,
        s.total_amount
      FROM sales s
      LEFT JOIN ledgers l ON s.customer_id = l.id
      ORDER BY s.sale_date DESC, s.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("SALES REPORT ERROR:", error);
    res.status(500).json({ message: "Failed to fetch sales report" });
  }
};
export const getPurchaseReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.voucher_no,
        p.invoice_no,
        p.purchase_date,
        l.ledger_name AS supplier_name,
        COALESCE(SUM(pi.amount), 0) AS total_amount
      FROM purchase_vouchers p
      LEFT JOIN ledgers l
        ON p.supplier_id = l.id
      LEFT JOIN purchase_items pi
        ON p.id = pi.purchase_id
      GROUP BY
        p.id,
        p.voucher_no,
        p.invoice_no,
        p.purchase_date,
        l.ledger_name
      ORDER BY p.purchase_date DESC, p.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("PURCHASE REPORT ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch purchase report",
    });
  }
};
export const getCustomerOutstanding = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        l.id AS customer_id,
        l.ledger_name AS customer_name,

        COALESCE(s.total_sales, 0) AS total_sales,
        COALESCE(r.total_receipt, 0) AS total_receipt,

        (
          COALESCE(s.total_sales, 0) -
          COALESCE(r.total_receipt, 0)
        ) AS outstanding_amount

      FROM ledgers l

      LEFT JOIN (
        SELECT
          customer_id,
          SUM(total_amount) AS total_sales
        FROM sales
        GROUP BY customer_id
      ) s ON l.id = s.customer_id

      LEFT JOIN (
        SELECT
          customer_id,
          SUM(amount) AS total_receipt
        FROM receipt_vouchers
        GROUP BY customer_id
      ) r ON l.id = r.customer_id

      WHERE COALESCE(s.total_sales, 0) > 0
      ORDER BY outstanding_amount DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("CUSTOMER OUTSTANDING ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch customer outstanding report",
    });
  }
};
export const getSupplierOutstanding = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        l.id AS supplier_id,
        l.ledger_name AS supplier_name,

        COALESCE(p.total_purchase, 0) AS total_purchase,
        COALESCE(pay.total_payment, 0) AS total_payment,

        (
          COALESCE(p.total_purchase, 0) -
          COALESCE(pay.total_payment, 0)
        ) AS outstanding_amount

      FROM ledgers l

      LEFT JOIN (
        SELECT
          pv.supplier_id,
          SUM(pi.amount) AS total_purchase
        FROM purchase_vouchers pv
        LEFT JOIN purchase_items pi
          ON pv.id = pi.purchase_id
        GROUP BY pv.supplier_id
      ) p ON l.id = p.supplier_id

      LEFT JOIN (
        SELECT
          supplier_id,
          SUM(amount) AS total_payment
        FROM payment_vouchers
        GROUP BY supplier_id
      ) pay ON l.id = pay.supplier_id

      WHERE COALESCE(p.total_purchase, 0) > 0
      ORDER BY outstanding_amount DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("SUPPLIER OUTSTANDING ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch supplier outstanding report",
    });
  }
};
export const getProfitLossReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COALESCE(s.total_sales, 0) AS total_sales,
        COALESCE(p.total_purchase, 0) AS total_purchase,
        (
          COALESCE(s.total_sales, 0) -
          COALESCE(p.total_purchase, 0)
        ) AS gross_profit
      FROM
        (
          SELECT COALESCE(SUM(total_amount), 0) AS total_sales
          FROM sales
        ) s,
        (
          SELECT COALESCE(SUM(pi.amount), 0) AS total_purchase
          FROM purchase_items pi
        ) p
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("PROFIT LOSS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch profit loss report",
    });
  }
};