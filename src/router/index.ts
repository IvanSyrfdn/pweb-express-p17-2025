import express from "express";
const router = express.Router();

import foodRouter from "./food.router";

router.use("/food", foodRouter);

export default router;