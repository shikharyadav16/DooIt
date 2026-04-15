import express from "express";
import { handleLogin, handleSignup } from "../controllers/auth.controller"

const router = express.Router();

router
    .post("/login", handleLogin)
    .post("/signup", handleSignup)

export default router;