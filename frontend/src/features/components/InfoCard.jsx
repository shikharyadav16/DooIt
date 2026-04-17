import { useEffect, useState } from "react";
import "../../styles/infoCard.css";

function InfoCard({ type = "info", title, message }) {

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsOpen(false); 
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, title, type]);

    const getIcon = () => {
        switch (type) {
            case "success":
                return <i className="ph-bold ph-check-circle"></i>;
            case "error":
                return <i className="ph-bold ph-warning-circle"></i>;
            case "warning":
                return <i className="ph-bold ph-alert"></i>;
            case "info":
                return <i className="ph-bold ph-info"></i>;
            default:
                return <i className="ph-bold ph-chat-text"></i>;
        }
    };

    if (!isOpen) return null; 

    return (
        <div id="messageContainer">
            <div className={`msg-card ${type}`}>
                <div className="msg-card-inner">

                    <div className="msg-icon">{getIcon()}</div>

                    <div className="msg-content">
                        <div className="msg-title">{title}</div>
                        <div className="msg-text">{message}</div>
                    </div>

                    <button 
                        className="msg-close"
                        onClick={() => setIsOpen(false)} 
                    >
                        <i className="ph-bold ph-x"></i>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default InfoCard;