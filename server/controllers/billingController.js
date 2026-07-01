import pool from "../config/db.js";

export const createBill = async (req, res) => {
  const client = await pool.connect();

  try {
    const { bill_no, bill_date, customer_id, total_amount, items } = req.body;

    await client.query("BEGIN");

    const billResult = await client.query(
      `INSERT INTO bills 
       (bill_no, bill_date, customer_id, total_amount)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [bill_no, bill_date, customer_id, total_amount]
    );

    const billId = billResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO bill_items
         (bill_id, stock_item_id, quantity, rate, amount)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          billId,
          item.stock_item_id,
          item.quantity,
          item.rate,
          item.amount,
        ]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Bill created successfully",
      bill_id: billId,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("CREATE BILL ERROR:", error);
    res.status(500).json({ message: "Failed to create bill" });
  } finally {
    client.release();
  }
};

export const getBills = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        b.id,
        b.bill_no,
        b.bill_date,
        l.ledger_name AS customer_name,
        b.total_amount
      FROM bills b
      LEFT JOIN ledgers l ON b.customer_id = l.id
      ORDER BY b.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("GET BILLS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch bills" });
  }
};

export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const billResult = await pool.query(
      `SELECT 
        b.id,
        b.bill_no,
        b.bill_date,
        b.total_amount,
        l.ledger_name AS customer_name
       FROM bills b
       LEFT JOIN ledgers l ON b.customer_id = l.id
       WHERE b.id = $1`,
      [id]
    );

    const itemsResult = await pool.query(
      `SELECT 
        bi.*,
        si.item_name
       FROM bill_items bi
       LEFT JOIN stock_items si ON bi.stock_item_id = si.id
       WHERE bi.bill_id = $1`,
      [id]
    );

    res.json({
      bill: billResult.rows[0],
      items: itemsResult.rows,
    });
  } catch (error) {
    console.error("GET BILL BY ID ERROR:", error);
    res.status(500).json({ message: "Failed to fetch bill" });
  }
};