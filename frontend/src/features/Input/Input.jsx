import { useState } from "react";
import { createTodo } from "../../services/todo.service";
import checkTodoDetails from "./utils/checkTodoDetails";
import { addTodo } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";

export default function Input() {

    const dispatch = useDispatch()

    const [input, setInput] = useState("");
    const [priority, setPriority] = useState("low");
    const [loading, setLoading] = useState(false)

    const priorities = [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" }
    ];

    async function handleCreateTodo() {
        if (loading) return;
        const response = checkTodoDetails({input, priority});
        if (!response.success) return console.log(response.message);

        setLoading(true);
        const data = await createTodo(response.payload);
        if (data.success) {
            dispatch(addTodo(data.todo))
            setInput("")
            setPriority("low")
        } 
        setLoading(false)
    }

    return (
        <div className="input-card">
            <div className="input-card-label">
                <i className="ph-bold ph-sparkle"></i>
                What needs to get done?
            </div>
            <div className="input-row">
                <input className="todo-input" value={input} onChange={(e) => setInput(e.target.value)} id="tInput" type="text" placeholder="Type your task here…" maxLength="140" autoComplete="off" />
                <select className="priority-sel" value={priority} onChange={(e) => setPriority(e.target.value)} id="pSel">
                    {priorities.map(p => {
                        return <option key={p.value} value={p.value}>{p.label}</option>
                    })}
                </select>
                <button className="add-btn" id="addBtn" onClick={(e) => { e.preventDefault(); handleCreateTodo() }}>
                    {loading ? <i className="ph ph-spinner-gap"></i> : <i className="ph-bold ph-plus-circle"></i>}
                    <span>{loading ? "Creating" : "Add Task"}</span>
                </button>
            </div>
        </div>
    )
}