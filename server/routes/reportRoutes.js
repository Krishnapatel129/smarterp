import express from "express";

import {
  getSalesReport,
  getPurchaseReport,
  getCustomerOutstanding,
  getSupplierOutstanding,
  getProfitLossReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/sales", getSalesReport);

router.get("/purchase", getPurchaseReport);

router.get("/customer-outstanding", getCustomerOutstanding);

router.get("/supplier-outstanding", getSupplierOutstanding);

router.get("/profit-loss", getProfitLossReport);

export default router;