import mongoose from "mongoose";

export default async function connectToDb(): Promise<void> {
    try {
        const url = process.env.MONGO_URI;
        if (!url) {
            throw new Error("MONGO_URI is not defined in .env");
        }
        await mongoose.connect(url)
        console.log("Database connected")

    } catch (err: any) {
        console.error("Database connection Error:", err.message);
        process.exit(1)
    }
}