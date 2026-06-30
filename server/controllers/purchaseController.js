import pool from "../config/db.js";

export const createPurchase = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      purchase_date,
      supplier_id,
      invoice_no,
      items,
      subtotal,
      gst_amount,
      total,
      narration,
    } = req.body;

    await client.query("BEGIN");

    const countResult = await client.query(
      "SELECT COUNT(*) FROM purchase_vouchers"
    );

    const nextNo = Number(countResult.rows[0].count) + 1;
    const voucher_no = `PUR-${String(nextNo).padStart(4, "0")}`;

    const purchaseResult = await client.query(
      `INSERT INTO purchase_vouchers
      (voucher_no, purchase_date, supplier_id, invoice_no, subtotal, gst_amount, total, narration)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        voucher_no,
        purchase_date,
        supplier_id,
        invoice_no,
        subtotal,
        gst_amount,
        total,
        narration,
      ]
    );

    const purchaseId = purchaseResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO purchase_items
        (purchase_id, stock_item_id, quantity, rate, gst_percent, amount)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          purchaseId,
          item.stock_item_id,
          item.quantity,
          item.rate,
          item.gst_percent,
          item.amount,
        ]
      );

      await client.query(
        `UPDATE stock_items
         SET opening_quantity = opening_quantity + $1
         WHERE id = $2`,
        [item.quantity, item.stock_item_id]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Purchase voucher created successfully",
      purchase: purchaseResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ message: "Purchase creation failed" });
  } finally {
    client.release();
  }
};

export const getPurchases = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT pv.*, l.ledger_name AS supplier_name
       FROM purchase_vouchers pv
       LEFT JOIN ledgers l ON pv.supplier_id = l.id
       ORDER BY pv.id DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch purchases" });
  }
};

export const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const voucher = await pool.query(
      `SELECT * FROM purchase_vouchers WHERE id = $1`,
      [id]
    );

    const items = await pool.query(
      `SELECT pi.*, si.item_name
       FROM purchase_items pi
       LEFT JOIN stock_items si ON pi.stock_item_id = si.id
       WHERE pi.purchase_id = $1`,
      [id]
    );

    res.json({
      voucher: voucher.rows[0],
      items: items.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch purchase" });
  }
};

export const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM purchase_vouchers WHERE id = $1", [id]);

    res.json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};