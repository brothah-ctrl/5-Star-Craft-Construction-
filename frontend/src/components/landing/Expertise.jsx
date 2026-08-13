import { ArrowUpRight, Hammer, Home, Paintbrush, Wrench, HardHat, Layers, Umbrella } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { IMAGES } from "@/pages/LandingPage";

const DISCIPLINES = [
    { icon: Hammer, title: "Joinery", desc: "Staircases, panelling, doors, wardrobes and bespoke fitments — measured twice, mitred once." },
    { icon: Home, title: "Home Renovations", desc: "Full-room and whole-home transformations, managed from strip-out to final coat." },
    { icon: Paintbrush, title: "Painting & Tiling", desc: "Crisp lines, level tiles and durable finishes for walls, floors and splashbacks." },
    { icon: Wrench, title: "Plumbing", desc: "Repairs, reroutes and full installations for kitchens and bathrooms." },
    { icon: HardHat, title: "Roofing & Fencing", desc: "Weather-tight roofing, timely repairs and secure, sharp-looking boundaries." },
    { icon: Layers, title: "Woodwork & Countertops", desc: "Kitchens, counters and cabinetry in solid timber and stone-look finishes." },
    { icon: Umbrella, title: "Deck Repairs & Shadeports", desc: "Decks revived board by board, and shade structures built for harsh sun." },
];

export const Expertise = () => (
    <section id="expertise" className="px-6 pb-28 lg:px-12 lg:pb-40" data-testid="expertise-section">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                    <Reveal>
                        <Overline>The Disciplines</Overline>
                        <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-[#16233F] sm:text-5xl">
                            Seven trades. <span className="italic text-[#B8912A]">One standard.</span>
                        </h2>
                        <p className="mt-6 max-w-sm text-base leading-relaxed text-[#55606E]">
                            From a single repair to a full-home renovation, every job leaves
                            site with the same hand-finished standard.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="group mt-10 overflow-hidden rounded-[1.75rem] border border-[#DEE2E8]">
                            <img
                                src={IMAGES.cabinetry}
                                alt="Custom lacquered nightstand with brass detailing by 5 Star"
                                loading="lazy"
                                className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                data-testid="expertise-image"
                            />
                        </div>
                    </Reveal>
                </div>
            </div>

            <div className="lg:col-span-8">
                {DISCIPLINES.map((d, i) => (
                    <Reveal key={d.title} delay={i * 0.06}>
                        <div
                            className={`group grid grid-cols-[auto_1fr_auto] items-start gap-6 border-t border-[#DEE2E8] py-10 md:gap-10 ${
                                i === DISCIPLINES.length - 1 ? "border-b" : ""
                            }`}
                            data-testid={`expertise-row-${i + 1}`}
                        >
                            <span className="pt-2 font-serif text-xl italic text-[#B8912A]">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <div className="flex items-center gap-4">
                                    <d.icon className="h-6 w-6 shrink-0 text-[#B8912A]" />
                                    <h3 className="font-serif text-3xl font-medium tracking-tight text-[#16233F] transition-colors duration-300 group-hover:text-[#B8912A] md:text-4xl">
                                        {d.title}
                                    </h3>
                                </div>
                                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#55606E] md:text-base">
                                    {d.desc}
                                </p>
                            </div>
                            <ArrowUpRight className="mt-2 h-5 w-5 text-[#B8912A] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
