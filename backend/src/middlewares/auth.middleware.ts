import { verifyToken } from "../utils/jwt";
import asyncHandler from "../utils/asyncHandler";
import type { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    userId?: string
}

const authMiddleware = asyncHandler(async(req: AuthRequest, res: Response, next: NextFunction) => {

    const authToken = req.cookies?.token;
    if (!authToken) return res.status(403).json({ success: false, message: "Unauthorized" });

    const decoded = verifyToken(authToken);
    req.userId = decoded.userId

    next();
});

export default authMiddleware;