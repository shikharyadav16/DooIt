import express from "express";
import { handleLogin, handleSignup, handleSignupOtp } from "../controllers/auth.controller"

const router = express.Router();

router
    .post("/login", handleLogin)
    .post("/signup", handleSignup)
    .post("/signup/otp", handleSignupOtp)

export default router;