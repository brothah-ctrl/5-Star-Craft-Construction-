import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { IMAGES } from "@/pages/LandingPage";

const PROJECT_SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

export const Gallery = () => {
    const [active, setActive] = useState(null);

    const PROJECTS = [
        { src: IMAGES.kitchen, title: "The Constantia Kitchen", tag: "Custom Cabinetry" },
        { src: IMAGES.wardrobe, title: "LED-lit Fitted Wardrobe", tag: "Custom Cabinetry" },
        { src: IMAGES.bedside, title: "Brass & Lacquer Nightstand", tag: "Handcrafted Furniture" },
        { src: IMAGES.headboard, title: "Pale Oak Headboard Wall", tag: "Architectural Joinery" },
        { src: IMAGES.floorAfter, title: "Ebony Floor Revival", tag: "Wood Restoration" },
        { src: IMAGES.tiles, title: "Porcelain Floor Fitting", tag: "Spatial Fitting" },
    ].map((p, i) => ({ ...p, span: PROJECT_SPANS[i % PROJECT_SPANS.length] }));

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setActive(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section id="portfolio" className="px-6 pb-28 lg:px-12 lg:pb-40" data-testid="gallery-section">
            <div className="mx-auto max-w-[1400px]">
                <div className="grid items-end gap-8 lg:grid-cols-12">
                    <Reveal className="lg:col-span-7">
                        <Overline>The Portfolio</Overline>
                        <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl">
                            Work that <span className="italic text-[#B07D4A]">speaks for itself.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15} className="lg:col-span-5">
                        <p className="max-w-md text-base leading-relaxed text-[#5C564E] lg:ml-auto">
                            A selection of recent commissions — photographed on site, exactly
                            as they were handed over. Click any piece to look closer.
                        </p>
                    </Reveal>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-12">
                    {PROJECTS.map((p, i) => (
                        <Reveal key={p.title} delay={(i % 2) * 0.1} className={p.span}>
                            <button
                                onClick={() => setActive(p)}
                                data-testid={`gallery-item-${i + 1}`}
                                className="group relative block w-full overflow-hidden rounded-[2rem] border border-[#E3D5CA] text-left"
                            >
                                <img
                                    src={p.src}
                                    alt={p.title}
                                    className="h-[300px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-[420px]"
                                />
                                <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full border border-white/30 bg-white/70 px-5 py-2.5 backdrop-blur-xl">
                                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#2D241E]">{p.tag}</span>
                                </div>
                                <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#2D241E]/85 text-[#F9F8F6] opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:opacity-100">
                                    <ArrowUpRight className="h-4 w-4" />
                                </div>
                                <p className="absolute bottom-[4.5rem] left-7 font-serif text-xl text-white opacity-0 drop-shadow-lg transition-all duration-300 group-hover:opacity-100">
                                    {p.title}
                                </p>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1A1A1A]/90 p-6 backdrop-blur-md"
                        onClick={() => setActive(null)}
                        data-testid="gallery-lightbox"
                    >
                        <button
                            onClick={() => setActive(null)}
                            data-testid="lightbox-close-button"
                            aria-label="Close"
                            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <motion.figure
                            initial={{ opacity: 0, scale: 0.94, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={active.src}
                                alt={active.title}
                                className="max-h-[75vh] w-auto rounded-[1.5rem] object-contain"
                                data-testid="lightbox-image"
                            />
                            <figcaption className="mt-6 flex items-baseline justify-between gap-6">
                                <span className="font-serif text-2xl text-[#F9F8F6]">{active.title}</span>
                                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4A373]">{active.tag}</span>
                            </figcaption>
                        </motion.figure>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
