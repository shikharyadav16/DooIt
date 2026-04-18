import "../../styles/login.css"
import { Link, Navigate } from "react-router-dom"
import { useState } from "react"
import checkLoginDetails from "./utils/checkLoginDetails"
import { login } from "../../services/auth.service"
import { useSelector, useDispatch } from "react-redux"
import { setIsAuthenticated, setUser } from "../../redux/authSlice"

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    async function handleLogin() {
        if (loading) return;
        const response = checkLoginDetails({ email, password })
        if (!response.success) {
            console.log(response)
            return;
        }

        const payload = response.data;
        setLoading(true);
        const data = await login(payload);
        if (data.success) {
            dispatch(setIsAuthenticated(true))
            dispatch(setUser(data.user))
            setEmail("")
            setPassword("")
        } else {
            alert(data.message)
            console.log(data.message)
        }
        setLoading(false)
    }

    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
    if (isAuthenticated) {
        return (
            <Navigate to="/dashboard" replace />
        )
    }

    return (
        <>
            <div className="login-card">
                <div className="form-header">
                    <h2><i className="ph ph-lock-key"></i> log in</h2>
                    <p>access your doodle tasks & progress</p>
                </div>

                <div className="input-group">
                    <label><i className="ph-bold ph-envelope"></i> Email address</label>
                    <input type="email" id="loginEmail" className="doodle-input" placeholder="hello@doodle.com"
                        autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailError" className="error-msg"></div>
                </div>

                <div className="input-group">
                    <label><i className="ph-bold ph-lock-key"></i> Password</label>
                    <input type="password" id="loginPassword" className="doodle-input" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div id="passError" className="error-msg"></div>
                </div>

                <div className="extra-links">
                    <a id="forgotPasswordLink"><i className="ph ph-sparkle"></i> Forgot password?</a>
                </div>

                <button id="loginBtn" className="btn-primary" onClick={(e) => { e.preventDefault(); handleLogin() }}><i className="ph-bold ph-arrow-right"></i>{loading ? "Loading..." : "Log in"}</button>

                <div className="divider">
                    <div className="divider-line"></div>
                    <span>or</span>
                    <div className="divider-line"></div>
                </div>

                <button id="googleLoginBtn" className="google-btn"><i className="ph-bold ph-google-logo"></i> Continue with
                    Google</button>

                <div className="signup-redirect">
                    New to DoodleDo? <Link to="/signup" id="signupLink">Create an account →</Link>
                </div>
            </div>
        </>
    )
}