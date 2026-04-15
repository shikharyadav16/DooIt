import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password?: string
}

const userSchema: Schema<IUser> = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unqiue: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>("users", userSchema);

export default User;