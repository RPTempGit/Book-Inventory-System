
import express from "express";
import { getTransactions, createTransaction, deleteTransaction } from "../controllers/transactionController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);
router.get("/", getTransactions);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router;