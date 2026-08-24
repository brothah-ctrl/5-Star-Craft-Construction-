import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { IMAGES } from "@/pages/LandingPage";

const wrapCls =
    "group overflow-hidden rounded-[1.5rem] border border-[#D9A441]/35 shadow-[0_18px_45px_-24px_rgba(22,35,63,0.35)]";
const imgCls = "w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105";

export const WendySpecials = () => (
    <div className="mt-20" data-testid="wendy-specials">
        <Reveal>
            <div className="rounded-[2rem] border border-[#D9A441]/40 bg-[#F7F4ED] p-6 shadow-[0_28px_70px_-36px_rgba(22,35,63,0.35)] md:p-10 lg:p-14">
                <div className="grid items-end gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <p className="font-josefin text-xs font-semibold uppercase tracking-[0.32em] text-[#D9A441]">
                            Wendy House Specials
                        </p>
                        <h3
                            className="mt-4 font-josefin text-3xl font-bold uppercase tracking-[0.06em] text-[#16233F] md:text-4xl"
                            data-testid="wendy-heading"
                        >
                            New Exclusive Specials
                        </h3>
                    </div>
                    <div className="lg:col-span-6">
                        <p className="max-w-xl font-josefin text-base leading-relaxed text-[#16233F]/75 lg:ml-auto">
                            Explore our custom-built Wendy houses, designed for practical living,
                            extra space, offices, studios, guest accommodation, and garden retreats.
                            Each structure is crafted with care and finished to suit your space.
                        </p>
                        <div className="mt-6 lg:text-right">
                            <a
                                href="#quote"
                                data-testid="wendy-cta"
                                className="group inline-flex items-center gap-2 rounded-full bg-[#16233F] px-7 py-3.5 font-josefin text-sm font-semibold text-[#F7F4ED] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-14px_rgba(217,164,65,0.6)]"
                            >
                                View Wendy Houses
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-12">
                    <Reveal delay={0.1} className="md:col-span-7">
                        <div className={wrapCls}>
                            <img
                                src={IMAGES.wendy1}
                                alt="Custom-built elevated Wendy house with timber cladding, windows and entrance stairs"
                                loading="lazy"
                                className={`${imgCls} h-64 md:h-[460px]`}
                                data-testid="wendy-image-main"
                            />
                        </div>
                    </Reveal>
                    <div className="flex flex-col gap-5 md:col-span-5">
                        <Reveal delay={0.18}>
                            <div className={wrapCls}>
                                <img
                                    src={IMAGES.wendy2}
                                    alt="Wendy house timber wall frames under construction on site"
                                    loading="lazy"
                                    className={`${imgCls} h-48 md:h-[220px]`}
                                    data-testid="wendy-image-2"
                                />
                            </div>
                        </Reveal>
                        <Reveal delay={0.26}>
                            <div className={wrapCls}>
                                <img
                                    src={IMAGES.wendy3}
                                    alt="Finished Wendy house in rich stained timber with window and open doorway"
                                    loading="lazy"
                                    className={`${imgCls} h-48 md:h-[220px]`}
                                    data-testid="wendy-image-3"
                                />
                            </div>
                        </Reveal>
                    </div>
                    <Reveal delay={0.34} className="md:col-span-12">
                        <div className={wrapCls}>
                            <img
                                src={IMAGES.wendy4}
                                alt="Handcrafted Wendy house exterior showing detailed timber workmanship"
                                loading="lazy"
                                className={`${imgCls} h-56 md:h-72`}
                                data-testid="wendy-image-4"
                            />
                        </div>
                    </Reveal>
                </div>
            </div>
        </Reveal>
    </div>
);
