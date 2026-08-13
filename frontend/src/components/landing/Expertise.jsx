import { ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { IMAGES } from "@/pages/LandingPage";

const DISCIPLINES = [
    {
        title: "Custom Cabinetry",
        desc: "Kitchens, wardrobes and storage built around the way you live — measured twice, mitred once.",
    },
    {
        title: "Architectural Joinery",
        desc: "Staircases, wall panelling, doors and screens that give a building its character.",
    },
    {
        title: "Handcrafted Furniture",
        desc: "Dining tables, benches and one-off pieces in solid oak, ash and walnut.",
    },
    {
        title: "Spatial Fitting",
        desc: "Complete fit-outs for homes, retail and workspaces — from lining to final finish.",
    },
    {
        title: "Wood Restoration",
        desc: "Heritage timber, period joinery and tired furniture brought carefully back to life.",
    },
];

export const Expertise = () => (
    <section id="expertise" className="px-6 pb-28 lg:px-12 lg:pb-40" data-testid="expertise-section">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                    <Reveal>
                        <Overline>The Disciplines</Overline>
                        <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl">
                            Five crafts. <span className="italic text-[#B07D4A]">One standard.</span>
                        </h2>
                        <p className="mt-6 max-w-sm text-base leading-relaxed text-[#5C564E]">
                            Whether it's a single shelf or a full architectural fit-out, every
                            piece leaves the bench with the same hand-finished standard.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="group mt-10 overflow-hidden rounded-[1.75rem] border border-[#E3D5CA]">
                            <img
                                src={IMAGES.cabinetry}
                                alt="Custom lacquered nightstand with brass detailing by 5 Star"
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
                            className={`group grid grid-cols-[auto_1fr_auto] items-start gap-6 border-t border-[#E3D5CA] py-10 md:gap-10 ${
                                i === DISCIPLINES.length - 1 ? "border-b" : ""
                            }`}
                            data-testid={`expertise-row-${i + 1}`}
                        >
                            <span className="pt-2 font-serif text-xl italic text-[#B07D4A]">
                                0{i + 1}
                            </span>
                            <div>
                                <h3 className="font-serif text-3xl font-medium tracking-tight text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#B07D4A] md:text-4xl">
                                    {d.title}
                                </h3>
                                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#5C564E] md:text-base">
                                    {d.desc}
                                </p>
                            </div>
                            <ArrowUpRight className="mt-2 h-5 w-5 text-[#B07D4A] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
