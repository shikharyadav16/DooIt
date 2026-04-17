import api from "./api";

/**
 * @typedef {Object} Todo
 * @property {string} _id
 * @property {string} text
 * @property {"low" | "medium" | "high"} priority
 * @property {boolean} done
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @description Get all todos
 * @route GET /api/todos
 * @returns {Promise<{success: boolean, data?: {todos: Todo[]}, error?: any}>}
 */

async function getAllTodos() {
    try {
        const response = await api.get("/todos");
        return response.data

    } catch (err) {
        return { success: false, message: err?.response?.message || err?.message }
    }
}

/**
 * @description Creation of todo
 * @route POST /api/create
 * @param {Object} payload - Todo
 * @param {string} payload.text - Text content in todo
 * @param {string} payload.priority - Priority of the todo
 * @param {string} payload.done - Completion status of todo
 * @returns {Promise<{success: boolean, data?: {todo: Todo}, error?: any}>}
 */

async function createTodo(payload) {
    try {
        const response = await api.post("/create", payload)
        return response.data;

    } catch (err) {
        console.log("Todo creation Error:", err);
        return { success: false, message: err?.response?.message || err?.message }
    }
}

/**
 * @description Deletion of todo
 * @route DELETE /api/delete/:_id
 * @param {Object} payload - Todo
 * @param {string} payload._id - Unique identifier of Todo
 * @returns {Promise<{success: boolean, data?: {todo: Todo}, error?: any}>}
 */

async function deleteTodo(payload) {
    try {
        const response = await api.delete(`/todo/${payload._id}`);
        return response.data

    } catch (err) {
        console.log("Todo deletion Error:", err);
        return { success: false, message: err?.message || err?.response?.message }
    }
}

/**
 * @description Creation of todo
 * @route PATCH /api/edit
 * @param {Object} payload - Todo
 * @param {string} payload._id - Unqiue identifier of todo
 * @param {string} payload.text - Text content in todo
 * @param {string} payload.priority - Priority of the todo
 * @param {string} payload.done - Completion status of todo
 * @returns {Promise<{success: boolean, data?: {todo: Todo}, error?: any}>}
 */

async function editTodo(payload) {
    try {
        const response = await api.patch("/edit", payload);
        return response.data

    } catch (err) {
        console.log("Todo updation Error:", err);
        return { success: false, message: err?.response.message || err?.message }
    }
}

/**
 * @description Creation of todo
 * @route PATCH /api/todo/:id
 * @param {Object} payload - Todo
 * @param {string} payload._id - Unqiue identifier of todo
 * @returns {Promise<{success: boolean, data?: {todo: Todo, message: string}, error?: any}>}
 */

async function toggleComplete(payload) {
    try {
        const response = await api.patch(`/todo/${payload._id}`)
        return response?.data;

    } catch (err) {
        console.log('Todo toggle Error:', err);
        return { success: false, message: err?.response?.message || err?.message }
    }
}

async function deleteComplete() {
    try {
        const response = await api.delete("/todo?done=true");
        return response?.data;

    } catch (err) {
        console.log('Todo toggle Error:', err);
        return { success: false, message: err?.response?.message || err?.message }
    }
}

export { createTodo, deleteTodo, editTodo, getAllTodos, toggleComplete, deleteComplete };