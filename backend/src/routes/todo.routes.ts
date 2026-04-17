import { Router } from "express"
import { handleCreateTodo, handleGetAllTodos, handleUpdateTodo, handleToggleCompleted, handleDeleteTodo, handleDeleteTodos } from "../controllers/todo.controller";
import { handleCheckAuth } from "../controllers/auth.controller";

const router = Router();

router
    .get("/me", handleCheckAuth)
    .get("/todos", handleGetAllTodos)
    .post("/create", handleCreateTodo)
    .patch("/edit", handleUpdateTodo)
    .patch("/todo/:todoId", handleToggleCompleted)
    .delete("/todo/:todoId", handleDeleteTodo)
    .delete("/todo", handleDeleteTodos);

export default router;