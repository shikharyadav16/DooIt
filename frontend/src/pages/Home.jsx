import "../styles/home.css"
import Header from "../features/header/Header"
import Bottom from "../features/Footer/Bottom"
import Input from "../features/Input/Input"
import Toolbar from "../features/toolbar/Toolbaar"
import TodoList from "../features/todos/TodoList"
import StatContainer from "../features/stats/StatContainer"
import { useEffect } from "react";
import useGetTodos from "../features/hooks/useGetTodos";
import { useSelector } from "react-redux";
import { useState } from "react"
import InfoCard from "../features/components/InfoCard"

export default function Home() {

    useGetTodos();
    const todos = useSelector(state => state.todoReducer.todos);

    const [filter, setFilter] = useState("all");

    return (
        <>           
            <Header  />
            <StatContainer />
            <Input  />
            <Toolbar filter={filter} setFilter={setFilter} />
            <TodoList todos={todos} filter={filter}  />
            <Bottom />
        </>
    )
}   