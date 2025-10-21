import express from "express";
import { register, login, getMe } from "../controllers/authController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/orders", verifyToken, getMe);

export default router;
