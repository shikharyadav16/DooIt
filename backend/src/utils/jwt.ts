import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not found!");
}

export interface JwtPayload {
    userId: string
}

export const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d"
    });
};

export const verifyToken = (token: string): JwtPayload => {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded || typeof decoded !== "object") throw new Error("Unuthorized!")
    return decoded as JwtPayload;
};