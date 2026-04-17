import { useEffect } from "react";
import { checkMe } from "../services/auth.service";
import { setIsAuthenticated, setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthChecker() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            try {
                const data = await checkMe();
                // console.log(data)

                if (data.success) {
                    dispatch(setIsAuthenticated(true));
                    dispatch(setUser(data.user));
                } else {
                    dispatch(setIsAuthenticated(false));
                    navigate("/login");
                }
            } catch (error) {
                dispatch(setIsAuthenticated(false));
                navigate("/login");
            }
        }

        checkAuth();
    }, [dispatch, navigate]);

    return null;
}