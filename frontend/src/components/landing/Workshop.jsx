import { ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { IMAGES } from "@/pages/LandingPage";

export const Workshop = () => (
    <section id="work" className="px-6 py-28 lg:px-12 lg:py-40" data-testid="workshop-section">
        <div className="mx-auto max-w-[1400px]">
            <div className="grid items-end gap-8 lg:grid-cols-12">
                <Reveal className="lg:col-span-7">
                    <Overline>From the Workshop</Overline>
                    <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl">
                        Inside the studio, <span className="italic text-[#B07D4A]">this month.</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.15} className="lg:col-span-5">
                    <p className="max-w-md text-base leading-relaxed text-[#5C564E] lg:ml-auto">
                        Every commission passes through our benches by hand — from first
                        sketch to final oil. A look at what's currently taking shape.
                    </p>
                </Reveal>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-12">
                <Reveal className="md:col-span-8">
                    <div className="group relative overflow-hidden rounded-[2rem] border border-[#E3D5CA]">
                        <img
                            src={IMAGES.workshop2}
                            alt="Carpenter cutting timber in the 5 Star workshop"
                            className="h-[380px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-[560px]"
                            data-testid="workshop-hero-image"
                        />
                        <div className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-white/70 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-[#2D241E] backdrop-blur-xl">
                            In progress · Joinery bench No. 2
                        </div>
                    </div>
                </Reveal>

                <div className="flex flex-col gap-6 md:col-span-4">
                    <Reveal delay={0.1}>
                        <div className="group overflow-hidden rounded-[2rem] border border-[#E3D5CA]">
                            <img
                                src={IMAGES.workshop1}
                                alt="Handcrafted wooden table detail"
                                className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                data-testid="workshop-detail-image"
                            />
                        </div>
                    </Reveal>
                    <Reveal delay={0.2} className="flex-1">
                        <div className="flex h-full flex-col justify-between rounded-[2rem] bg-[#EAE6DF] p-8">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.25em] text-[#B07D4A]">
                                    Latest update · July 2026
                                </p>
                                <h3 className="mt-4 font-serif text-2xl font-medium leading-snug text-[#2D241E]">
                                    Full-height oak panelling, book-matched by hand
                                </h3>
                                <p className="mt-4 text-sm leading-relaxed text-[#5C564E]">
                                    Week six on the Riverside Residence. Veneers are laid,
                                    shadow gaps aligned, and the first coat of hard-wax oil
                                    is curing overnight.
                                </p>
                            </div>
                            <a
                                href="#expertise"
                                data-testid="workshop-more-link"
                                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#2D241E]"
                            >
                                See what we craft
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    </section>
);
