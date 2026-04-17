import "../../styles/signup.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import checkSignupDetails from "./utils/checkSignupDetails";
import OtpVerification from "./OtpVerification";
import { signup } from "../../services/auth.service";
import { useSelector } from "react-redux";

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSignup() {
        if (loading) return;
        const response = checkSignupDetails({ name, email, password, confirmPass })
        if (!response.success) {
            return
        }

        const payload = response.data;
        setLoading(true)
        const data = await signup(payload);
        if (data.success) {
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPass("")
            setIsOpen(prev => !prev)
        } else {
            alert("Error:", data.message)
        }
        setLoading(false)
    }

    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
    if (isAuthenticated) return (
        <Navigate to="/dashboard" replace />
    )

    return (
        <>
            <div className="signup-card">
                <div className="form-header">
                    <h2>create account <i className="ph ph-sparkle"></i></h2>
                    <p>doodle your productivity — start here</p>
                </div>

                <div className="input-group">
                    <label><i className="ph-bold ph-user"></i> Full name</label>
                    <input type="text" id="name" className="doodle-input" placeholder="Alex Doodle" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <div id="nameError" className="error-msg"></div>
                </div>

                <div className="input-group">
                    <label><i className="ph-bold ph-envelope"></i> Email address</label>
                    <input type="email" id="email" className="doodle-input" placeholder="hello@doodle.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailError" className="error-msg"></div>
                </div>

                <OtpVerification isOpen={isOpen} setIsOpen={setIsOpen} email={email} />

                <div className="input-group">
                    <label><i className="ph-bold ph-lock-key"></i> Password</label>
                    <input type="password" id="password" className="doodle-input" placeholder="•••••• (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div id="passError" className="error-msg"></div>
                </div>

                <div className="input-group">
                    <label><i className="ph-bold ph-check-circle"></i> Confirm password</label>
                    <input type="password" id="confirmPass" className="doodle-input" placeholder="confirm your magic word" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                    <div id="confirmError" className="error-msg"></div>
                </div>


                <button id="signupBtn" className="btn-primary" onClick={(e) => { e.preventDefault(); handleSignup() }}><i className="ph-bold ph-sparkle"></i> {loading ? "Loading..." : "Sign up"} </button>

                <div className="divider">
                    <div className="divider-line"></div>
                    <span>or</span>
                    <div className="divider-line"></div>
                </div>

                <button id="googleSignupBtn" className="google-btn"><i className="ph-bold ph-google-logo"></i> Continue with
                    Google</button>

                <div className="login-redirect">
                    Already have an account? <Link to="/login" id="mockLoginLink">Log in →</Link>
                </div>
            </div>

            <div id="successToast" className="success-toast"><i className="ph ph-sparkle"></i> Account created! Welcome to DoodleDo <i className="ph ph-sparkle"></i></div>
        </>
    )
}