import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import LandingPage from "@/pages/LandingPage";

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
            <LandingPage />
        </div>
    );
}

export default App;
