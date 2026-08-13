import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X } from "lucide-react";

const links = [
    { label: "Work", href: "#work" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Expertise", href: "#expertise" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

export const Nav = () => {
    const [open, setOpen] = useState(false);
    return (
    <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-40 px-4 sm:px-6"
    >
        <nav
            className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-[#DEE2E8] bg-[#F7F7F5]/80 py-3 pl-5 pr-3 backdrop-blur-xl"
            data-testid="main-nav"
        >
            <a href="#top" className="flex items-center gap-3" data-testid="nav-brand">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16233F]">
                    <Star className="h-4 w-4 fill-[#C9A227] text-[#C9A227]" />
                </span>
                <span className="leading-tight">
                    <span className="block font-serif text-lg font-semibold tracking-tight text-[#16233F]">
                        5 Star
                    </span>
                    <span className="block text-[9px] uppercase tracking-[0.3em] text-[#55606E]">
                        Crafts &amp; Construction
                    </span>
                </span>
            </a>

            <div className="hidden items-center gap-9 md:flex">
                {links.map((l) => (
                    <a
                        key={l.href}
                        href={l.href}
                        data-testid={`nav-link-${l.label.toLowerCase()}`}
                        className="text-sm text-[#55606E] transition-colors duration-300 hover:text-[#16233F]"
                    >
                        {l.label}
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <a
                    href="#quote"
                    data-testid="nav-quote-button"
                    className="rounded-full bg-[#16233F] px-5 py-2.5 text-sm text-[#F7F7F5] transition-transform duration-300 hover:-translate-y-0.5"
                >
                    Get a Quote
                </a>
                <button
                    onClick={() => setOpen(!open)}
                    data-testid="nav-mobile-toggle"
                    aria-label="Toggle menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DEE2E8] text-[#16233F] md:hidden"
                >
                    {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
            </div>
        </nav>
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="mx-auto mt-2 max-w-[1400px] rounded-3xl border border-[#DEE2E8] bg-[#F7F7F5]/95 p-3 backdrop-blur-xl md:hidden"
                    data-testid="nav-mobile-menu"
                >
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                            className="block rounded-2xl px-5 py-3.5 text-base text-[#55606E] transition-colors duration-300 hover:bg-[#E9EBEF] hover:text-[#16233F]"
                        >
                            {l.label}
                        </a>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    </motion.header>
    );
};
