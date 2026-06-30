import express from "express";
import {
  createSale,
  getSale,
  getSaleById,
  updateSale,
  deleteSale,
} from "../controllers/salesController.js";

const router = express.Router();

router.post("/", createSale);
router.get("/", getSale);
router.get("/:id", getSaleById);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;