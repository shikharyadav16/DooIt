import { Router } from "express"
import { handleCreateTodo, handleGetAllTodos, handleUpdateTodo, handleDeleteTodo } from "../controllers/todo.controller";

const router = Router();

router
    .get("/todo", handleGetAllTodos)
    .post("/create", handleCreateTodo)
    .patch("/edit", handleUpdateTodo)
    .delete("/delete", handleDeleteTodo);

export default router;