import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, Eye, EyeOff } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const OwnerLoginFab = () => {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ password }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(typeof data.detail === "string" ? data.detail : "Sign-in failed");
            }
            navigate("/admin", { state: { user: data } });
        } catch (err) {
            setError(err.message);
            setBusy(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                data-testid="owner-login-fab"
                aria-label="Owner sign-in"
                className="fixed bottom-5 left-5 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-[#16233F]/10 bg-[#F7F7F5]/60 text-[#16233F]/30 backdrop-blur-sm transition-all duration-300 hover:border-[#16233F]/30 hover:text-[#16233F]"
            >
                <Lock className="h-3.5 w-3.5" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[80] flex items-center justify-center bg-[#16233F]/60 p-6 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                        data-testid="owner-login-modal"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97, y: 8 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-sm rounded-[1.75rem] border border-[#DEE2E8] bg-[#F7F7F5] p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setOpen(false)}
                                data-testid="owner-modal-close"
                                aria-label="Close"
                                className="absolute right-5 top-5 text-[#55606E] transition-colors hover:text-[#16233F]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <img src="/photos/logo-circle.png" alt="5 Star Crafts and Construction logo" className="h-12 w-12 rounded-full object-cover" />
                            <h2 className="mt-5 font-serif text-2xl font-medium text-[#16233F]">Owner sign-in</h2>
                            <p className="mt-1 text-sm text-[#55606E]">Authorised access only.</p>
                            <form onSubmit={submit} className="mt-6">
                                <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-[#55606E]" htmlFor="owner-password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="owner-password"
                                        type={show ? "text" : "password"}
                                        required
                                        autoFocus
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-xl border border-[#DEE2E8] bg-white px-4 py-3.5 pr-12 text-base text-[#16233F] outline-none transition-colors focus:border-[#B8912A]"
                                        data-testid="owner-password-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        aria-label={show ? "Hide password" : "Show password"}
                                        data-testid="owner-password-toggle"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#55606E]"
                                    >
                                        {show ? <EyeOff className="h-4.5 w-4.5" size={18} /> : <Eye className="h-4.5 w-4.5" size={18} />}
                                    </button>
                                </div>
                                {error && (
                                    <p className="mt-3 text-sm text-red-700" data-testid="owner-login-error">{error}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={busy}
                                    data-testid="owner-login-submit"
                                    className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#16233F] text-sm font-medium text-[#F7F7F5] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                                >
                                    {busy ? "Signing in…" : "Sign in"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
