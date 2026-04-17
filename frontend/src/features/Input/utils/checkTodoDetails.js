export default function checkTodoDetails({ input, priority }) {
    if (!input || !input.trim() || !priority || !priority.trim()) return { success: false, message: "All fields are required" };
    input = input.trim();
    priority = priority.trim();

    const validPriorities = ["low", "medium", "high"]
    if (!validPriorities.includes(priority)) return { success: false, message: "Invalid priority value" }

    return { success: true, payload: {text: input, priority} }
}