import { useEffect, useState } from "react";
import { checkMe } from "../services/auth.service";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function AuthChecker({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const data = await checkMe();

                if (data.success) {
                    dispatch(setIsAuthenticated(true));
                    dispatch(setUser(data.user));
                } else {
                    navigate("/login");
                    
                }
            } catch {
                navigate("/login");
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [dispatch, navigate]);

    if (loading) return <div>Loading...</div>;

    return children;
}