import { useState } from "react";
import { useDispatch } from "react-redux";
import checkSignupVerificationDetails from "./utils/checkSignupVerificationDetails";
import { verifySignup } from "../../services/auth.service";
import { setIsAuthenticated, setUser } from "../../redux/authSlice";

export default function OtpVerification({ isOpen, setIsOpen, email }) {

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();

    async function handleSignupVerification() {
        const check = checkSignupVerificationDetails({ email, otp });
        if (!check.success) return console.log("Invalid:", check.message);

        const data = await verifySignup({otp, email});
        if (data.success) {
            console.log("Signup successfull", data?.user);
            dispatch(setIsAuthenticated(true));
            dispatch(setUser(data.user));
            // setIsAuthenticated
        } else {
            console.log(data.message)
        }
        setOtp("")
        setIsOpen(prev => !prev)
    }

    return (
        <div id="otpModal" className={`modal-overlay ${isOpen ? "active" : ""}`}>
            <div className="otp-modal">
                <h3><i className="ph ph-lock-key"></i> OTP verification</h3>
                <p>We’ve sent a secret doodle code to your email</p>
                <input type="text" id="otpInput" value={otp} onChange={(e) => {const value = e.target.value.replace(/\D/g, "").slice(0, 6);setOtp(value);}} className="otp-input" placeholder="000000" pattern="[0-9]*" maxLength="6" autoComplete="off" />
                <div className="modal-buttons">
                    <button id="verifyOtpBtn" className="modal-btn verify" onClick={() => handleSignupVerification()}><i className="ph-bold ph-check"></i> Verify</button>
                    <button id="closeModalBtn" className="modal-btn" onClick={() => setIsOpen(prev => !prev)}>Cancel</button>
                </div>
                <div id="resendOtpLink" className="resend-link">⟳ Resend code</div>
                <div id="modalError" style={{ fontSize: "11px", fontWeight: "bold", marginTop: "12px", color: "var(--coral)" }}>
                </div>
            </div>
        </div>
    )
}