import express from "express";
import authRoutes from "./auth.routes";
import todoRoutes from "../routes/todo.routes";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/", authMiddleware, todoRoutes);

export default router;