import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { WHATSAPP_URL } from "@/pages/LandingPage";

const links = [
    { label: "Work", href: "#work" },
    { label: "Expertise", href: "#expertise" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

export const Nav = () => (
    <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-40 px-4 sm:px-6"
    >
        <nav
            className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-[#E3D5CA] bg-[#F9F8F6]/80 py-3 pl-5 pr-3 backdrop-blur-xl"
            data-testid="main-nav"
        >
            <a href="#top" className="flex items-center gap-3" data-testid="nav-brand">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2D241E]">
                    <Star className="h-4 w-4 fill-[#D4A373] text-[#D4A373]" />
                </span>
                <span className="leading-tight">
                    <span className="block font-serif text-lg font-semibold tracking-tight text-[#1A1A1A]">
                        5 Star
                    </span>
                    <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5C564E]">
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
                        className="text-sm text-[#5C564E] transition-colors duration-300 hover:text-[#1A1A1A]"
                    >
                        {l.label}
                    </a>
                ))}
            </div>

            <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                data-testid="nav-quote-button"
                className="rounded-full bg-[#2D241E] px-5 py-2.5 text-sm text-[#F9F8F6] transition-transform duration-300 hover:-translate-y-0.5"
            >
                Get a Quote
            </a>
        </nav>
    </motion.header>
);
