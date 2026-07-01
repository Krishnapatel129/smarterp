import express from "express";
import {
  createContra,
  getContraList,
  deleteContra,
} from "../controllers/contraController.js";

const router = express.Router();

router.post("/", createContra);
router.get("/", getContraList);
router.delete("/:id", deleteContra);

export default router;