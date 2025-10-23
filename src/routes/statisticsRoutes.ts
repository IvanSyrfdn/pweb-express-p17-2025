import express from "express";
import { getStatistics } from "../controllers/statisticsController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// hanya bisa diakses oleh user login
router.get("/", authenticateToken, getStatistics);

export default router;
