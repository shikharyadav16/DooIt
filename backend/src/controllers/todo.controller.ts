import Todo, { ITodo } from "../models/Todo";
import asyncHandler from "../utils/asyncHandler";
import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";

/**
 * @description Get all Todos
 * @route GET /api/todo
 * @access user
 */

export const handleGetAllTodos = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) return res.status(403).json({ success: false, message: "Unauthorized" });

    const todos: ITodo[] = await Todo.find({ createdBy: userId }).lean();
    if (!todos || todos.length === 0) {
        return res.json({ success: true, todos: [] })
    }

    return res.json({ success: true, todos });
});

/**
 * @description Create new Todo
 * @route POST /api/create
 * @access user
 * @body { text: string, priority: "low" | "medium" | "high" , done: boolean }
 */

export const handleCreateTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) return res.status(403).json({ success: false, message: "Unauthorized" });

    const { text, priority, done }: ITodo = req.body;

    const validTypes = ["low", "medium", "high"];

    if (!text || typeof text !== "string") return res.status(401).json({ success: false, message: "Invalid text content" });
    if (!priority || !validTypes.includes(priority)) return res.status(401).json({ success: false, message: "Invalid priority type" });
    if (typeof done !== "boolean") return res.status(401).json({ success: false, message: "Invalid done type" });

    const payload = {
        createdBy: userId,
        text,
        priority,
        done
    }
    const todo: ITodo = await Todo.create(payload);
    return res.status(201).json({ success: true, message: "Created successfully", todo });
});

/**
 * @description Update Todo
 * @route PATCH /api/edit
 * @access user
 * @body { todoId: string, text: string, done: boolean, priority: "low" | "medium" | "high" }
 */

export const handleUpdateTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) return res.status(403).json({ success: false, message: "Unauthorized" });

    const { todoId, text, done, priority } = req.body;
    const validTypes = ["low", "medium", "high"];

    if (!todoId || typeof todoId !== "string") return res.status(401).json({ success: false, message: "Invalid Todo" });4
    if (!priority || !validTypes.includes(priority)) return res.status(401).json({ success: false, message: "Invalid priority type" });
    if (!text || typeof text !== "string") return res.status(401).json({ success: false, message: "Invalid text content" });
    if (typeof done !== "boolean") return res.status(401).json({ success: false, message: "Invalid done type" });

    const todo = await Todo.updateOne({ _id: todoId, createdBy: userId }, { 
        $set: {
            text,
            done,
            priority
        }
    });

    return res.status(201).json({ success: true, message: "Updated successfully", todo });
});

/**
 * @description Delete Todo
 * @route DELETE /api/delete
 * @access user
 * @body { todoId: string }
 */

export const handleDeleteTodo = asyncHandler(async(req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) return res.status(403).json({ success: false, message: "Unauthorized" });

    const { todoId } = req.body;
    if (!todoId || typeof todoId !== "string") return res.status(401).json({ success: false, message: "Invalid Todo" });4

    const todo = await Todo.deleteOne({ createdBy: userId, _id: todoId });
    return res.status(201).json({ success: true, message: "Deleted succesffuly", todo });
})