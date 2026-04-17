import { useState } from "react";
import { deleteComplete } from "../../services/todo.service";
import { useDispatch } from "react-redux";
import { removeCompleted } from "../../redux/todoSlice";

export default function Bottom() {

    const dispatch = useDispatch()
    const[loading, setLoading] = useState(false)

    async function deleteCompleted() {
        if (loading) return;
        setLoading(true);
        const data = await deleteComplete();
        if (data.success) {
            dispatch(removeCompleted())
        }
        setLoading(false)
    }

    return (
        <div className="bottom-strip">
            <span className="tasks-left" id="tasksLeft"></span>
            <button className="clear-btn" id="clearDone" onClick={deleteCompleted}>
                <i className="ph-bold ph-broom"></i>
                Clear Completed
            </button>
        </div>
    )
}   