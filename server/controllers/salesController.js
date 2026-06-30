import pool from "../config/db.js";

export const createSale = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      voucher_no,
      sale_date,
      customer_id,
      invoice_no,
      items,
    } = req.body;

    console.log("SALES BODY:", req.body);

    const total_amount = items.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    await client.query("BEGIN");

    const saleResult = await client.query(
      `INSERT INTO sales 
       (voucher_no, sale_date, customer_id, invoice_no, total_amount)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [voucher_no, sale_date, customer_id, invoice_no, total_amount]
    );

    const sale_id = saleResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO sales_items 
         (sale_id, stock_item_id, quantity, rate, amount)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          sale_id,
          item.stock_item_id,
          item.quantity,
          item.rate,
          item.amount,
        ]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Sale created successfully",
      sale_id,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("CREATE SALE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

export const getSale = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.voucher_no,
        s.sale_date,
        s.customer_id,
        l.ledger_name AS customer_name,
        s.invoice_no,
        s.total_amount
      FROM sales s
      LEFT JOIN ledgers l ON s.customer_id = l.id
      ORDER BY s.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("GET SALES ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const saleResult = await pool.query(
      "SELECT * FROM sales WHERE id=$1",
      [req.params.id]
    );

    if (saleResult.rows.length === 0) {
      return res.status(404).json({ message: "Sales voucher not found" });
    }

    const itemsResult = await pool.query(
      "SELECT * FROM sales_items WHERE sale_id=$1",
      [req.params.id]
    );

    res.json({
      ...saleResult.rows[0],
      items: itemsResult.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sales voucher",
      error: error.message,
    });
  }
};

export const updateSale = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const {
      voucher_no,
      invoice_no,
      customer_id,
      sale_date,
      total_amount,
      items,
    } = req.body;

    const saleResult = await client.query(
      `UPDATE sales SET
        voucher_no=$1,
        invoice_no=$2,
        customer_id=$3,
        sale_date=$4,
        total_amount=$5
      WHERE id=$6
      RETURNING *`,
      [
        voucher_no,
        invoice_no,
        customer_id,
        sale_date,
        total_amount,
        req.params.id,
      ]
    );

    if (saleResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Sales voucher not found" });
    }

    await client.query("DELETE FROM sales_items WHERE sale_id=$1", [
      req.params.id,
    ]);

    for (const item of items) {
      await client.query(
        `INSERT INTO sales_items
        (sale_id, stock_item_id, quantity, rate, amount)
        VALUES ($1,$2,$3,$4,$5)`,
        [
          req.params.id,
          item.stock_item_id,
          item.quantity,
          item.rate,
          item.amount,
        ]
      );
    }

    await client.query("COMMIT");

    res.json({
      message: "Sales voucher updated successfully",
      sale: saleResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({
      message: "Sales update failed",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

export const deleteSale = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM sales WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Sales voucher not found" });
    }

    res.json({ message: "Sales voucher deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Sales delete failed",
      error: error.message,
    });
  }
};