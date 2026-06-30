import express from "express";
import {
  createStockItem,
  getStockItems,
  getStockItemById,
  updateStockItem,
  deleteStockItem,
} from "../controllers/stockItemController.js";

const router = express.Router();

router.post("/", createStockItem);
router.get("/", getStockItems);
router.get("/:id", getStockItemById);
router.put("/:id", updateStockItem);
router.delete("/:id", deleteStockItem);

export default router;