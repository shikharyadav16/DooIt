import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos = [action.payload, ...state.todos]
        },
        setTodos: (state, action) => {
            state.todos = action.payload
        },
        updateTodo: (state, action) => {
            state.todos.map(todo => {
                if (todo._id === action.payload.id) {
                    todo.text = action.payload.text
                }
            });
        },
        toggleCompletion: (state, action) => {
            state.todos.map(todo => {
                if (todo._id === action.payload) {
                    todo.done = !todo.done
                }
            })
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(t => t._id !== action.payload);
        },
        removeCompleted: (state) => {
            state.todos = state.todos.filter(t => t.done === false)
        }
    }
})

export const { addTodo, setTodos, removeTodo, updateTodo, toggleCompletion, removeCompleted} = todoSlice.actions;
export default todoSlice.reducer