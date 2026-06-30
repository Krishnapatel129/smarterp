import express from "express";
import {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
} from "../controllers/purchaseController.js";

const router = express.Router();

router.post("/", createPurchase);
router.get("/", getPurchases);
router.get("/:id", getPurchaseById);
router.delete("/:id", deletePurchase);

export default router;