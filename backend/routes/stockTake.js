
import express from "express";
import { addStockTake, getStockTakes } from "../controllers/stockTakeController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);
router.get("/", getStockTakes);
router.post("/", addStockTake);

export default router;
