import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
    otp: number,
    name: string,
    password: string,
    email: string,
    createdAt: Date
}

const otpSchema: Schema<IOtp> = new Schema({
    otp: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
});

const Otp = mongoose.model<IOtp>("otp", otpSchema);

export default Otp;