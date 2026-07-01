import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import pool from "./config/db.js";
import companyRoutes from "./routes/companyRoutes.js";
import ledgerRoutes from "./routes/ledgerRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import stockGroupRoutes from "./routes/stockGroupRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";
import stockItemRoutes from "./routes/stockItemRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import receiptRoutes from "./routes/receiptRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contraRoutes from "./routes/contraRoutes.js";
import stockLedgerRoutes from "./routes/stockLedgerRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/companies", companyRoutes);

app.use("/api/ledgers", ledgerRoutes);

app.use("/api/groups", groupRoutes);

app.use("/api/stock-groups", stockGroupRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/stock-items", stockItemRoutes);
app.use("/api/purchase", purchaseRoutes);

app.use("/api/sales", salesRoutes);

app.use("/api/billing", billingRoutes);

app.use("/api/receipts", receiptRoutes);

app.use("/api/payments", paymentRoutes);
app.use("/api/contra", contraRoutes);
app.use("/api/stock-ledger", stockLedgerRoutes);

app.get("/", (req, res) => {
  res.send("SmartERP Backend Running");
});
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connected successfully",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});