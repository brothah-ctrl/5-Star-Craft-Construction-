import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Overline } from "@/components/landing/Reveal";
import { IMAGES, WHATSAPP_URL } from "@/pages/LandingPage";

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
                        <Overline>Bespoke Carpentry &amp; Architectural Woodwork</Overline>
                    </motion.div>

                    <h1 className="mt-8 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-[#1A1A1A] sm:text-6xl lg:text-7xl" data-testid="hero-headline">
                        {LINES.map((line, i) => (
                            <span key={line} className="block overflow-hidden pb-1">
                                <motion.span
                                    className={`block ${i === 1 ? "italic text-[#B07D4A]" : ""}`}
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
                        <p className="mt-8 max-w-md text-base leading-relaxed text-[#5C564E] sm:text-lg">
                            A bespoke carpentry studio for homeowners and architects who value
                            honest materials, precise joinery, and timber work made to last
                            generations.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noreferrer"
                                data-testid="hero-consultation-cta"
                                className="group flex items-center gap-2 rounded-full bg-[#2D241E] px-8 py-4 text-sm font-medium text-[#F9F8F6] transition-transform duration-300 hover:-translate-y-1"
                            >
                                Request a Consultation
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                            <a
                                href="#work"
                                data-testid="hero-portfolio-cta"
                                className="rounded-full border border-[#2D241E]/25 px-8 py-4 text-sm font-medium text-[#2D241E] transition-colors duration-300 hover:border-[#2D241E] hover:bg-[#2D241E] hover:text-[#F9F8F6]"
                            >
                                Explore the Portfolio
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                        className="mt-16 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#5C564E] lg:flex"
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
                        <div className="overflow-hidden rounded-b-[2rem] rounded-t-[12rem] border border-[#E3D5CA]">
                            <motion.img
                                src={IMAGES.hero}
                                alt="Bespoke timber interior with pale oak panelling"
                                style={{ y: imgY }}
                                className="aspect-[3/4] w-full scale-110 object-cover"
                                data-testid="hero-image"
                            />
                        </div>
                        <div className="absolute -bottom-5 left-6 rounded-full border border-[#E3D5CA] bg-[#F9F8F6]/85 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-[#5C564E] backdrop-blur-xl">
                            Pale oak · Private residence
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
