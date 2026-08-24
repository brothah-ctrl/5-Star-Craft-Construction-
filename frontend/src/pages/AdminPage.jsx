import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { LogIn, LogOut, ArrowLeft, Inbox } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminPage() {
    const location = useLocation();
    const [auth, setAuth] = useState(location.state?.user ? true : null);
    const [user, setUser] = useState(location.state?.user || null);
    const [enquiries, setEnquiries] = useState([]);
    const [forbidden, setForbidden] = useState(false);

    useEffect(() => {
        if (location.state?.user) return;
        if (window.location.hash?.includes("session_id=")) return;
        (async () => {
            try {
                const res = await fetch(`${API}/auth/me`, { credentials: "include" });
                if (!res.ok) throw new Error();
                setUser(await res.json());
                setAuth(true);
            } catch {
                setAuth(false);
            }
        })();
    }, [location.state]);

    useEffect(() => {
        if (!auth) return;
        (async () => {
            const res = await fetch(`${API}/admin/enquiries`, { credentials: "include" });
            if (res.status === 403) {
                setForbidden(true);
                return;
            }
            if (res.ok) setEnquiries(await res.json());
        })();
    }, [auth]);

    const logout = async () => {
        await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });
        setAuth(false);
        setUser(null);
        setEnquiries([]);
    };

    const signIn = () => {
        // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
        const redirectUrl = window.location.origin + "/admin";
        window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
    };

    return (
        <div className="min-h-screen bg-[#F7F7F5] font-sans text-[#16233F]" data-testid="admin-page">
            <header className="border-b border-[#DEE2E8] bg-[#F7F7F5]/90 px-6 py-4 backdrop-blur-xl lg:px-12">
                <div className="mx-auto flex max-w-[1200px] items-center justify-between">
                    <Link to="/" className="flex items-center gap-3" data-testid="admin-home-link">
                        <img src="/photos/logo-circle.png" alt="5 Star Crafts and Construction logo" className="h-9 w-9 rounded-full object-cover" />
                        <span className="font-serif text-lg font-semibold">Enquiries</span>
                    </Link>
                    {auth && user && (
                        <div className="flex items-center gap-4">
                            <span className="hidden text-sm text-[#55606E] sm:block">{user.email}</span>
                            <button
                                onClick={logout}
                                data-testid="admin-logout-button"
                                className="flex items-center gap-2 rounded-full border border-[#DEE2E8] px-4 py-2 text-sm transition-colors duration-300 hover:border-[#16233F]"
                            >
                                <LogOut className="h-3.5 w-3.5" /> Sign out
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="mx-auto max-w-[1200px] px-6 py-16 lg:px-12">
                {auth === null && (
                    <p className="text-sm text-[#55606E]" data-testid="admin-loading">Checking your session…</p>
                )}

                {auth === false && (
                    <div className="mx-auto max-w-md rounded-[2rem] border border-[#DEE2E8] bg-white/60 p-10 text-center" data-testid="admin-signin-card">
                        <img src="/photos/logo-circle.png" alt="5 Star Crafts and Construction logo" className="mx-auto h-14 w-14 rounded-full object-cover" />
                        <h1 className="mt-6 font-serif text-3xl font-medium">Owner sign-in</h1>
                        <p className="mt-3 text-sm leading-relaxed text-[#55606E]">
                            Sign in with the approved Google account to view project enquiries
                            sent through the website.
                        </p>
                        <button
                            onClick={signIn}
                            data-testid="admin-signin-button"
                            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#16233F] px-8 py-4 text-sm font-medium text-[#F7F7F5] transition-transform duration-300 hover:-translate-y-0.5"
                        >
                            <LogIn className="h-4 w-4" /> Sign in with Google
                        </button>
                        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm text-[#55606E] hover:text-[#16233F]" data-testid="admin-back-link">
                            <ArrowLeft className="h-3.5 w-3.5" /> Back to the site
                        </Link>
                    </div>
                )}

                {auth === true && forbidden && (
                    <div className="mx-auto max-w-md rounded-[2rem] border border-[#DEE2E8] bg-white/60 p-10 text-center" data-testid="admin-forbidden">
                        <h1 className="font-serif text-2xl font-medium">Not an approved admin</h1>
                        <p className="mt-3 text-sm text-[#55606E]">
                            {user?.email} is signed in, but it isn't on the approved list for
                            viewing enquiries.
                        </p>
                    </div>
                )}

                {auth === true && !forbidden && (
                    <div data-testid="admin-enquiries">
                        <h1 className="font-serif text-4xl font-medium tracking-tight">
                            Project enquiries
                        </h1>
                        <p className="mt-2 text-sm text-[#55606E]">
                            {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"} received — newest first.
                        </p>
                        {enquiries.length === 0 ? (
                            <div className="mt-12 flex flex-col items-center rounded-[2rem] border border-dashed border-[#DEE2E8] p-16 text-center" data-testid="admin-empty">
                                <Inbox className="h-8 w-8 text-[#C9A227]" />
                                <p className="mt-4 text-sm text-[#55606E]">No enquiries yet — they'll appear here as they arrive.</p>
                            </div>
                        ) : (
                            <ul className="mt-10 space-y-5">
                                {enquiries.map((e) => (
                                    <li key={e.id} className="rounded-[1.5rem] border border-[#DEE2E8] bg-white/60 p-7" data-testid={`enquiry-row-${e.id}`}>
                                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                                            <p className="font-serif text-xl font-medium">{e.name}</p>
                                            <p className="text-xs uppercase tracking-[0.2em] text-[#B8912A]">{e.service}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-[#55606E]">
                                            {e.phone}{e.email ? ` · ${e.email}` : ""}
                                            {e.created_at ? ` · ${new Date(e.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}` : ""}
                                        </p>
                                        <p className="mt-3 text-sm leading-relaxed text-[#16233F]/85">{e.message}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
