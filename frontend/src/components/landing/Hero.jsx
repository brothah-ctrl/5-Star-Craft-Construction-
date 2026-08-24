import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Overline } from "@/components/landing/Reveal";
import { IMAGES } from "@/pages/LandingPage";

const EASE = [0.16, 1, 0.3, 1];
const LINES = ["Custom craftsmanship,", "bespoke timber work,", "tailored to every space."];

export const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

    return (
        <section ref={ref} className="px-6 pb-16 pt-36 sm:pt-44 lg:px-12 lg:pb-24" data-testid="hero-section">
            <div className="mx-auto grid max-w-[1400px] items-end gap-14 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Overline>Carpentry &amp; Construction · Knysna · Garden Route</Overline>
                    </motion.div>

                    <h1 className="mt-8 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-[#16233F] sm:text-6xl lg:text-7xl" data-testid="hero-headline">
                        {LINES.map((line, i) => (
                            <span key={line} className="block overflow-hidden pb-1">
                                <motion.span
                                    className={`block ${i === 1 ? "italic text-[#B8912A]" : ""}`}
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
                        <p className="mt-8 max-w-md text-base leading-relaxed text-[#55606E] sm:text-lg">
                            Creating beautiful spaces, built around you. Custom kitchens,
                            built-in cupboards, bespoke furniture, wooden flooring, tiling,
                            painting and renovations across Knysna and the Garden Route.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <a
                                href="#quote"
                                data-testid="hero-consultation-cta"
                                className="group flex items-center gap-2 rounded-full bg-[#16233F] px-8 py-4 text-sm font-medium text-[#F7F7F5] transition-transform duration-300 hover:-translate-y-1"
                            >
                                Request a Consultation
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                            <a
                                href="#work"
                                data-testid="hero-portfolio-cta"
                                className="rounded-full border border-[#16233F]/25 px-8 py-4 text-sm font-medium text-[#16233F] transition-colors duration-300 hover:border-[#16233F] hover:bg-[#16233F] hover:text-[#F7F7F5]"
                            >
                                Explore the Portfolio
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                        className="mt-16 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#55606E] lg:flex"
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

                <div className="lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.85, ease: EASE }}
                        className="relative"
                    >
                        <div className="overflow-hidden rounded-b-[2rem] rounded-t-[12rem] border border-[#DEE2E8]">
                            <motion.img
                                src={IMAGES.hero}
                                alt="Custom kitchen units installed by 5 Star Craft & Construction — carpentry services in Knysna"
                                style={{ y: imgY }}
                                fetchPriority="high"
                                className="aspect-[3/4] w-full scale-110 object-cover object-[62%_center]"
                                data-testid="hero-image"
                            />
                        </div>
                        <div className="absolute -bottom-5 left-6 rounded-full border border-[#DEE2E8] bg-[#F7F7F5]/85 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-[#55606E] backdrop-blur-xl">
                            Constantia kitchen · Handover day
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
