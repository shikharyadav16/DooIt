import StatBox from "./StatBox";
import { useSelector } from "react-redux";

export default function StatContainer() {

    const totalTask = useSelector(state => state.todoReducer.todos).length;
    const pendingTask = useSelector(state => state.todoReducer.todos).filter(todo => todo.done === false).length
    const completedTask = useSelector(state => state.todoReducer.todos).filter(todo => todo.done === true).length

    return (
        <div className="stats-row">
            <StatBox sId={"sAll"} value={totalTask}  phClass={"ph-note-pencil"} text={"Total Tasks"} parentId={"sAll-parent"} />
            <StatBox sId={"sPending"} value={pendingTask} phClass={"ph-hourglass-medium"} text={"Remaining"} parentId={"sPending-parent"} />
            <StatBox sId={"sDone"} value={completedTask} phClass={"ph-seal-check"} text={"Crushed It!"} parentId={"sDone-parent"} />
        </div>
    )
}   