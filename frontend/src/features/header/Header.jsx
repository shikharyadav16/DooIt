import { useEffect, useState } from "react";

export default function Header() {

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("mode") === "dark"
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("mode", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <header style={{ maxWidth: "680px" }}>
            <div className="brand">
                <div className="brand-icon"><i className="ph-bold ph-pencil-line"></i></div>
                <div>
                    <div className="brand-title">Doo<span>It</span></div>
                    <div className="brand-sub">Welcome back, Champ</div>
                </div>
            </div>
            <div className="toggle-area">
                <div className="toggle-icons">
                    <span id="t-label" style={{ fontSize: "11px", fontWeight: "800", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".8px" }}>Light</span>
                </div>
                <button className="t-track" id="themeBtn" aria-label="Toggle theme" onClick={() => setDarkMode(prev => !prev)}></button>
                <span className="t-emoji" id="modeEmoji"><i className="ph-bold ph-sun"></i></span>
            </div>
        </header>
    )
}