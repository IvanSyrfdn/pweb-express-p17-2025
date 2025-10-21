import express from "express";
import { addItemToOrder, getItemsByOrder } from "../controllers/orderItemController";

const router = express.Router();
router.post("/", addItemToOrder);
router.get("/:id", getItemsByOrder);

export default router;
