import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AuthCallback() {
    const navigate = useNavigate();
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (hasProcessed.current) return;
        hasProcessed.current = true;
        const sessionId = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("session_id");
        (async () => {
            try {
                const res = await fetch(`${API}/auth/session`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ session_id: sessionId }),
                });
                if (!res.ok) throw new Error("session exchange failed");
                const user = await res.json();
                window.history.replaceState(null, "", window.location.pathname);
                navigate("/admin", { state: { user } });
            } catch {
                navigate("/admin");
            }
        })();
    }, [navigate]);

    return null;
}
