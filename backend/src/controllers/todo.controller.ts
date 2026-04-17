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

    const todos: ITodo[] = await Todo.find({ createdBy: userId }).sort({ createdAt: -1 }).lean();
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

    const { text, priority, done = false }: ITodo = req.body;

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

    const { todoId, text } = req.body;

    if (!todoId || typeof todoId !== "string") return res.status(401).json({ success: false, message: "Invalid Todo" });
    if (!text || typeof text !== "string") return res.status(401).json({ success: false, message: "Invalid text content" });

    const todo = await Todo.updateOne({ _id: todoId, createdBy: userId }, {
        $set: {
            text,
        }
    });

    return res.status(201).json({ success: true, message: "Updated successfully", todo });
});

/**
 * @description Toggle the completion status of Todo
 * @route PATCH /todo/:todoId
 * @access User
 */

export const handleToggleCompleted = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { todoId } = req.params;
    if (!todoId || typeof todoId !== "string") return res.status(403).json({ success: false, message: "Invalid Todo ID" });

    const todo = await Todo.findById(todoId);
    if (!todo) return res.status(404).json({ success: false, message: "Invalid Todo ID" })
    todo.done = !todo.done;
    await todo.save(); return res.status(201).json({ success: true, message: "Toggle successfull", todo: todo || [] });
})

/**
 * @description Delete Todo
 * @route DELETE /api/todo/:todoId
 * @access user
 */

export const handleDeleteTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) return res.status(403).json({ success: false, message: "Unauthorized" });

    const todoId = req.params.todoId
    if (!todoId || typeof todoId !== "string") return res.status(401).json({ success: false, message: "Invalid Todo" }); 4

    const todo = await Todo.deleteOne({ createdBy: userId, _id: todoId });
    return res.status(201).json({ success: true, message: "Deleted succesffuly", todo });
});

/**
 * @description Delete Multiple Todo
 * @route DELETE /api/todo
 * @access user
 * @body {text?:string, done?:boolean} 
 */

export const handleDeleteTodos = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    const { done } = req.query;
    if (typeof done === "undefined") { return res.status(400).json({ success: false, message: "Please provide 'done' query param" });}

    const parsedDone = done === "true";

    await Todo.deleteMany({ createdBy: userId, done: parsedDone });

    return res.status(200).json({
        success: true,
        message: `Deleted ${parsedDone ? "completed" : "active"} todos`
    });
});