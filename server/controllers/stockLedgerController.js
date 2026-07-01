import pool from "../config/db.js";

export const getStockLedger = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        si.id AS stock_item_id,
        si.item_name,
        si.opening_stock,
        si.rate AS purchase_rate,

        COALESCE(p.total_purchase, 0) AS stock_in,
        COALESCE(s.total_sales, 0) AS stock_out,

        (
          COALESCE(si.opening_stock, 0)
          + COALESCE(p.total_purchase, 0)
          - COALESCE(s.total_sales, 0)
        ) AS closing_stock,

        (
          (
            COALESCE(si.opening_stock, 0)
            + COALESCE(p.total_purchase, 0)
            - COALESCE(s.total_sales, 0)
          ) * COALESCE(si.rate, 0)
        ) AS stock_value

      FROM stock_items si

      LEFT JOIN (
        SELECT stock_item_id, SUM(quantity) AS total_purchase
        FROM purchase_items
        GROUP BY stock_item_id
      ) p ON si.id = p.stock_item_id

      LEFT JOIN (
        SELECT stock_item_id, SUM(quantity) AS total_sales
        FROM sales_items
        GROUP BY stock_item_id
      ) s ON si.id = s.stock_item_id

      ORDER BY si.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("STOCK LEDGER ERROR:", error);
    res.status(500).json({ message: "Failed to fetch stock ledger" });
  }
};