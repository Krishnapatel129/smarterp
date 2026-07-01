import express from "express";
import { getInventoryValuation } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getInventoryValuation);

export default router;