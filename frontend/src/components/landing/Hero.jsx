import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Overline } from "@/components/landing/Reveal";

const EASE = [0.16, 1, 0.3, 1];
const LINES = ["Custom craftsmanship,", "handcrafted timber work,", "tailored to every space."];
const SLICES = Array.from({ length: 12 }, (_, i) => i);

export const Hero = () => {
    const wrapRef = useRef(null);
    const sliceRefs = useRef([]);
    const lightRef = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const badgeRX = useSpring(my, { stiffness: 110, damping: 14 });
    const badgeRY = useSpring(mx, { stiffness: 110, damping: 14 });

    const onMove = (e) => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const r = wrap.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const leanX = (x / r.width - 0.5) * 5;
        const leanY = (y / r.height - 0.5) * 5;
        wrap.style.transform = `perspective(1200px) rotateX(${-leanY}deg) rotateY(${leanX}deg)`;
        mx.set(leanX * 1.8);
        my.set(-leanY * 1.8);
        const w = r.width / SLICES.length;
        sliceRefs.current.forEach((el, i) => {
            if (!el) return;
            const dx = Math.abs(x - (i + 0.5) * w);
            const t = Math.exp(-((dx / (r.width * 0.09)) ** 2));
            el.style.transform = `translateY(${-t * 22}px)`;
            el.style.backgroundColor = `rgba(247,247,245,${0.05 + t * 0.11})`;
        });
        if (lightRef.current) {
            lightRef.current.style.opacity = "1";
            lightRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
    };
    const onLeave = () => {
        if (wrapRef.current) wrapRef.current.style.transform = "perspective(1200px)";
        mx.set(0);
        my.set(0);
        sliceRefs.current.forEach((el) => {
            if (!el) return;
            el.style.transform = "translateY(0px)";
            el.style.backgroundColor = "rgba(247,247,245,0.05)";
        });
        if (lightRef.current) lightRef.current.style.opacity = "0";
    };

    return (
        <section
            className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#16233F] px-6 pt-28"
            data-testid="hero-section"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
        >
            <div
                ref={wrapRef}
                className="pointer-events-none absolute inset-0 flex will-change-transform"
                style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
                data-testid="hero-slices"
            >
                {SLICES.map((i) => (
                    <div
                        key={i}
                        ref={(el) => (sliceRefs.current[i] = el)}
                        className="hero-slice h-full flex-1 border-x border-white/[0.04]"
                        style={{ backgroundColor: "rgba(247,247,245,0.05)" }}
                    />
                ))}
            </div>

            <div
                ref={lightRef}
                className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] rounded-full opacity-0 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle, rgba(217,164,65,0.14) 0%, rgba(217,164,65,0.05) 40%, transparent 70%)" }}
                data-testid="hero-light"
            />

            <div className="pointer-events-none absolute inset-0 bg-[#16233F]/30" />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
                    className="relative mx-auto mb-10 w-fit"
                    style={{ perspective: 800 }}
                >
                    <div className="absolute inset-0 -m-6 rounded-full bg-[#D9A441]/25 blur-2xl" />
                    <motion.img
                        src="/photos/badge.png"
                        alt="5 Star Craft & Construction award-winning badge — Garden Route"
                        style={{ rotateX: badgeRX, rotateY: badgeRY, transformPerspective: 800 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative h-28 w-28 rounded-full shadow-[0_20px_60px_-15px_rgba(217,164,65,0.45)] md:h-36 md:w-36"
                        data-testid="hero-badge"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Overline light>Carpentry &amp; Construction · Knysna · Garden Route</Overline>
                </motion.div>

                <h1 className="mt-8 font-serif text-5xl font-medium leading-[1.04] tracking-tight text-[#F7F7F5] sm:text-6xl lg:text-7xl" data-testid="hero-headline">
                    {LINES.map((line, i) => (
                        <span key={line} className="block overflow-hidden pb-1">
                            <motion.span
                                className={`block ${i === 1 ? "italic text-[#D9A441]" : ""}`}
                                initial={{ y: "115%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 1.15, delay: 0.4 + i * 0.15, ease: EASE }}
                            >
                                {line}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
                >
                    <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[#F7F7F5]/70 sm:text-lg">
                        Creating beautiful spaces, built around you. Custom kitchens, built-in
                        cupboards, custom furniture, wooden flooring, tiling, painting and
                        renovations across Knysna and the Garden Route.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="#quote"
                            data-testid="hero-consultation-cta"
                            className="group flex items-center gap-2 rounded-full bg-[#D9A441] px-8 py-4 text-sm font-semibold text-[#16233F] transition-transform duration-300 hover:-translate-y-1"
                        >
                            Request a Consultation
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                        <a
                            href="#work"
                            data-testid="hero-portfolio-cta"
                            className="rounded-full border border-[#F7F7F5]/35 px-8 py-4 text-sm font-medium text-[#F7F7F5] transition-colors duration-300 hover:border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#16233F]"
                        >
                            Explore the Portfolio
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    className="mt-14 hidden items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#F7F7F5]/50 lg:flex"
                >
                    <motion.span
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="h-4 w-4" />
                    </motion.span>
                    Scroll to explore the craft
                </motion.div>
            </div>
        </section>
    );
};
