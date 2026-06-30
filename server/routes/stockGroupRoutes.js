import express from "express";
import {
  createStockGroup,
  getStockGroups,
  getStockGroupById,
  updateStockGroup,
  deleteStockGroup,
} from "../controllers/stockGroupController.js";

const router = express.Router();

router.post("/", createStockGroup);
router.get("/", getStockGroups);
router.get("/:id", getStockGroupById);
router.put("/:id", updateStockGroup);
router.delete("/:id", deleteStockGroup);

export default router;