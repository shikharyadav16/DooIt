import { useEffect } from "react";
import { getAllTodos } from "../../services/todo.service";
import { setTodos } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";

export default function useGetTodos() {
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;

        const fetchTodos = async () => {
            try {
                const data = await getAllTodos();
                if (!isMounted) return;
                dispatch(setTodos(data?.success ? data.todos : []));
            } catch (err) {
                if (!isMounted) return;

                const errorMessage =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch todos";

                console.log("Error:", errorMessage);
                dispatch(setTodos([]));
            }
        };

        fetchTodos();

        return () => {
            isMounted = false;
        };
    }, [dispatch]);
}