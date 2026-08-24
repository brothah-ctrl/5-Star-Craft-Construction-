import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@/App.css";
import LandingPage from "@/pages/LandingPage";
import AuthCallback from "@/pages/AuthCallback";
import AdminPage from "@/pages/AdminPage";

function AppRouter() {
    const location = useLocation();
    if (location.hash?.includes("session_id=")) {
        return <AuthCallback />;
    }
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    );
}

function App() {
    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.09, anchors: true });
        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </div>
    );
}

export default App;
