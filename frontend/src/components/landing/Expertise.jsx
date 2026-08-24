import { ArrowUpRight, ChefHat, Layers, DoorOpen, Table, LayoutGrid, Library, Hammer, Square, Paintbrush, Home } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { IMAGES } from "@/pages/LandingPage";

const DISCIPLINES = [
    { icon: ChefHat, title: "Kitchen Units", desc: "Custom kitchens in Knysna — designed, built and fitted around the way you cook and live." },
    { icon: Layers, title: "Built-in Cabinets", desc: "Built-in cupboards and storage that fit your walls to the millimetre." },
    { icon: DoorOpen, title: "Wardrobes", desc: "Fitted wardrobes with shelving, lighting and finishes matched to your room." },
    { icon: Table, title: "Coffee Tables", desc: "Bespoke coffee tables and furniture, handcrafted in solid timber." },
    { icon: LayoutGrid, title: "Wooden Flooring", desc: "Wooden floors installed, sanded and sealed for a rich, lasting finish." },
    { icon: Library, title: "Shelving", desc: "Floating shelves, bookcases and display shelving shaped to any space." },
    { icon: Hammer, title: "General Carpentry", desc: "General carpentry work — repairs, fitments and finishing touches, no job too small." },
    { icon: Square, title: "Tiling", desc: "Tiling services for floors, walls, kitchens and bathrooms — level and lasting." },
    { icon: Paintbrush, title: "Painting", desc: "Interior and exterior painting with careful prep and crisp, clean lines." },
    { icon: Home, title: "Interiors & Renovations", desc: "Custom interior spaces and home renovations in Knysna, managed start to finish." },
];

export const Expertise = () => (
    <section id="expertise" className="px-6 pb-28 lg:px-12 lg:pb-40" data-testid="expertise-section">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                    <Reveal>
                        <Overline>Our Services</Overline>
                        <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-[#16233F] sm:text-5xl">
                            Creating beautiful spaces, <span className="italic text-[#B8912A]">built around you.</span>
                        </h2>
                        <p className="mt-6 max-w-sm text-base leading-relaxed text-[#55606E]">
                            From custom kitchens and built-in cupboards to wooden flooring,
                            tiling and full renovations — one team, one hand-finished standard.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="group mt-10 overflow-hidden rounded-[1.75rem] border border-[#DEE2E8] bg-[#F7F4ED] p-4">
                            <img
                                src={IMAGES.cabinetry}
                                alt="Custom built-in cabinet with brass detailing by 5 Star Craft & Construction, Knysna"
                                loading="lazy"
                                className="h-80 w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
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
