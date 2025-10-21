import express from "express";
import { getOrders, createOrder } from "../controllers/orderController";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();
router.get("/", authenticateToken, getOrders);
router.post("/", authenticateToken, createOrder);

export default router;
