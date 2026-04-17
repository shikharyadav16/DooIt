import { useEffect, useState } from "react";
import EmptyList from "./EmptyList";
import Todo from "./Todo"
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleComplete } from "../../services/todo.service";
import { removeTodo, updateTodo, toggleCompletion } from "../../redux/todoSlice";

export default function TodoList({ todos, filter }) {
    const dispatch = useDispatch();

    const filteredTodos = (() => {
        switch (filter) {
            case "active":
                return todos.filter(t => !t.done);
            case "done":
                return todos.filter(t => t.done);
            default:
                return todos;
        }
    })();

    const [editingTodoId, setEditingTodoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingText, setEditingText] = useState("")

    async function handleDeleteTodo(id) {
        if (loading) return;
        if (!id) return;
        setLoading(true)

        const data = await deleteTodo({ _id: id });
        if (data.success) {
            dispatch(removeTodo(id))
            setCard({ type: "success", title: "Delete", message: data.message })
        } else {
            setCard({ type: "warning", title: "Delete", message: data.message })
        }
        setLoading(false)
    }

    async function handleToggleCompleted(id) {
        if (loading) return;
        if (!id) return;
        setLoading(true)
        const data = await toggleComplete({ _id: id });
        if (data.success) {
            dispatch(toggleCompletion(id))
        } else {
            setCard({ type: "warning", title: "Toggle", message: data.message })
        }
        setLoading(false)
    }

    async function handleSaveEdit() {
        if (loading) return;
        if (!editingText || editingText.length === 0 || editingText.length > 120) return;
        if (!editingTodoId) return;
        setLoading(true);
        const payload = { text: editingText, todoId: editingTodoId };
        const data = await editTodo(payload);
        if (data.success) {
            dispatch(updateTodo({ id: editingTodoId, text: editingText }));
            setEditingTodoId(null)
            setEditingText("")
        }
        setLoading(false)
    }

    return (
        <div className="todo-list" id="tList">
            {!filteredTodos || filteredTodos.length === 0 ?
                <EmptyList />
                :
                filteredTodos.map((todo) => {
                    return <Todo
                        key={todo._id}
                        todo={todo}
                        editing={editingTodoId === todo._id}
                        setEditingTodoId={setEditingTodoId}
                        deleteTodo={handleDeleteTodo}
                        toggleCompleted={handleToggleCompleted}
                        saveEdit={handleSaveEdit}
                        setEditingText={setEditingText}
                    />
                })
            }
        </div>
    )
}