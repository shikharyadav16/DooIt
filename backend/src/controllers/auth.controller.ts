import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import crypto from "crypto";
import asyncHandler from "../utils/asyncHandler";
import { generateToken } from "../utils/jwt"
import sendMail from "../services/mailer.service";
import Otp from "../models/Otp";

import type { Request, Response } from "express";
import type { IMailResponse } from "../services/mailer.service";
import type { JwtPayload } from "../utils/jwt";
import type { AuthRequest } from "../middlewares/auth.middleware";

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 1000000);
    console.log('OTP:', otp)
    // const mailObj = {
    //     to: email,
    //     subject: "OTP",
    //     text: `OTP: ${otp}`,
    //     html: `<h2>OTP: ${otp} </h2>`
    // }

    // const mailResponse: IMailResponse = await sendMail(mailObj);
    // if (!mailResponse.success) {
    //     return res.status(401).json({ success: false, message: mailResponse.message })
    // }

    await Otp.deleteMany({ email });
    await Otp.create({
        otp,
        name,
        password: hashedPassword,
        email,
        createdAt: new Date()
    })

    return res.status(201).json({ success: true, message: "Otp sent successfully" });
});

/**
 * @description OTP verification
 * @route POST /api/singup/otp
 * @acess Public
 * @body { email: string, otp: number }
 */

export const handleSignupOtp = asyncHandler(async (req: Request, res: Response) => {

    let { email, otp } = req.body;
    if (!email || typeof email !== "string") return res.status(403).json({ success: false, message: "Invalid email" });
    if (!otp || isNaN(otp)) return res.status(403).json({ success: false, message: "Invalid OTP" });

    otp = Number(otp);

    const otpDoc = await Otp.findOne({ email })
    if (!otpDoc) return res.status(403).json({ success: false, message: "Invalid email" });

    const isExpired = Date.now() - new Date(otpDoc.createdAt).getTime() > 5 * 60 * 1000;
    if (isExpired){
        await otpDoc.deleteOne();
        return res.status(403).json({ success: false, message: "OTP expired" });
    } 

    if (otpDoc.otp !== otp) return res.status(403).json({ success: false, message: "Incorrect OTP" });


    const user: IUser = await User.create({
        name: otpDoc.name,
        email,
        password: otpDoc.password
    });

    await otpDoc.deleteOne();
    const userObj = user.toObject();
    delete userObj.password;

    if (!user._id) return res.status(403).json()

    const payload: JwtPayload = { userId: user._id.toString() };
    const token: string = generateToken(payload);

    res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        sameSite: "strict"
    })

    return res.status(201).json({ success: true, message: "Registeration successfull", user: userObj })
})

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

    return res.status(200).json({ success: true, message: "Login successful", user: userObj });
});

export const handleCheckAuth = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) return res.status(403).json({ success: false, message: "Unauthorized" });
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "Unauthorized" });

    return res.status(200).json({ success: true, user });
})