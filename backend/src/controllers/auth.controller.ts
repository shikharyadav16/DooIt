import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler";
import { generateToken } from "../utils/jwt"
import type { Request, Response } from "express";
import type { JwtPayload } from "../utils/jwt";

interface IauthBody {
    name?: string;
    email: string;
    password: string;
}


/**
 * @description Signup of User
 * @route POST /api/signup
 * @access Public
 * @body { name: string, email: string, password: string }
 */

export const handleSignup = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password }: IauthBody = req.body;

    if (!name || name.length < 3 || name.length > 25) {
        return res.status(400).json({ success: false, message: "Invalid name" });
    }

    if (!password || password.length < 6 || password.length > 25) {
        return res.status(400).json({ success: false, message: "Invalid password" });
    }

    if (!email || !email.includes("@")) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const userObj = user.toObject();
    delete userObj.password;

    if (!user._id) return res.status(403).json()

    const payload: JwtPayload = { userId: user._id.toString() };
    const token: string = generateToken(payload);

    res.cookie("token", token, {
        httpOnly: true,
        // secure: true
    })

    return res.status(201).json({
        success: true,
        message: "Signup successful",
        user: userObj,
    });
});

/**
 * @description Login user
 * @route  POST /api/login
 * @access Public
 * @body { email: string, password: string }
 */

export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: IauthBody = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token: string = generateToken({ userId: user._id.toString() } as JwtPayload);

    res.cookie("token", token, {
        httpOnly: true,
        // secure: true
    })

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
        success: true,
        message: "Login successful",
        user: userObj,
    });
});