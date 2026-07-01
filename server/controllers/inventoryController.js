import pool from "../config/db.js";

export const getInventoryValuation = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        si.id,
        si.item_name,
        si.opening_stock,
        si.rate AS purchase_rate,

        COALESCE(p.total_purchase,0) AS stock_in,
        COALESCE(s.total_sales,0) AS stock_out,

        (
          COALESCE(si.opening_stock,0)
          + COALESCE(p.total_purchase,0)
          - COALESCE(s.total_sales,0)
        ) AS closing_stock,

        (
          (
            COALESCE(si.opening_stock,0)
            + COALESCE(p.total_purchase,0)
            - COALESCE(s.total_sales,0)
          ) * si.rate
        ) AS stock_value

      FROM stock_items si

      LEFT JOIN (
        SELECT stock_item_id,
        SUM(quantity) total_purchase
        FROM purchase_items
        GROUP BY stock_item_id
      ) p
      ON si.id=p.stock_item_id

      LEFT JOIN (
        SELECT stock_item_id,
        SUM(quantity) total_sales
        FROM sales_items
        GROUP BY stock_item_id
      ) s
      ON si.id=s.stock_item_id

      ORDER BY si.item_name;
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:"Inventory Report Failed"
    });
  }
};