import express from "express";
import { getGSTReport } from "../controllers/gstController.js";

const router = express.Router();

router.get("/", getGSTReport);

export default router;