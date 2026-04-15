import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITodo extends Document {
    createdBy: Types.ObjectId,
    text: string,
    priority: "low" | "high" | "medium",
    done: boolean,
    createdAt: Date,
    updatedAt: Date
}

const todoSchema: Schema<ITodo> = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId
    },
    text: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["low", "high", "medium"],
        default: "medium"
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Todo = mongoose.model<ITodo>("todo", todoSchema);

export default Todo;