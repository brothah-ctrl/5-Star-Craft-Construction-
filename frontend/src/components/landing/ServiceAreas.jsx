import { MapPin, Star, ArrowUpRight, MessageCircle } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { SITE, WHATSAPP_URL } from "@/pages/LandingPage";

const AREAS = [
    "Knysna",
    "Plettenberg Bay",
    "George",
    "Wilderness",
    "Sedgefield",
    "Mossel Bay",
    "Greater Western Cape on request",
];

const Stars = () => (
    <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#C9A227] text-[#C9A227]" />
        ))}
    </div>
);

export const ServiceAreas = () => (
    <section id="areas" className="bg-[#16233F] px-6 py-28 text-[#F7F7F5] lg:px-12 lg:py-40" data-testid="areas-section">
        <div className="mx-auto grid max-w-[1400px] items-start gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
                <Reveal>
                    <Overline light>Service Areas</Overline>
                    <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
                        Rooted on the Garden Route, <span className="italic text-[#C9A227]">serving the Western Cape.</span>
                    </h2>
                    <p className="mt-6 max-w-lg text-base leading-relaxed text-[#F7F7F5]/70">
                        From Knysna to Plettenberg Bay, George and beyond — our team comes to
                        you. Same seven trades, same hand-finished standard, wherever on the
                        Garden Route your project sits.
                    </p>
                </Reveal>
                <Reveal delay={0.15}>
                    <ul className="mt-10 flex flex-wrap gap-3" data-testid="areas-list">
                        {AREAS.map((area) => (
                            <li
                                key={area}
                                data-testid={`area-chip-${area.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                className="flex items-center gap-2 rounded-full border border-[#F7F7F5]/20 px-5 py-2.5 text-sm text-[#F7F7F5]/85 transition-colors duration-300 hover:border-[#C9A227] hover:text-[#C9A227]"
                            >
                                <MapPin className="h-3.5 w-3.5 text-[#C9A227]" />
                                {area}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>

            <Reveal delay={0.2} className="lg:col-span-5">
                <div className="rounded-[2rem] border border-[#F7F7F5]/15 bg-[#F7F7F5]/5 p-8 backdrop-blur-sm md:p-10" data-testid="google-business-card">
                    <Stars />
                    <h3 className="mt-5 font-serif text-3xl font-medium tracking-tight">
                        Find us on Google
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#F7F7F5]/70">
                        Look up 5 Star — Crafts &amp; Construction on our Google Business
                        Profile: read reviews from Garden Route homeowners, see our latest
                        work, or leave a review of your own.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href={SITE.googleBusinessUrl}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="google-listing-button"
                            className="group flex items-center gap-2 rounded-full bg-[#C9A227] px-7 py-3.5 text-sm font-semibold text-[#16233F] transition-transform duration-300 hover:-translate-y-1"
                        >
                            View our Google listing
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="areas-whatsapp-button"
                            className="flex items-center gap-2 rounded-full border border-[#F7F7F5]/25 px-7 py-3.5 text-sm font-medium text-[#F7F7F5] transition-colors duration-300 hover:border-[#F7F7F5]"
                        >
                            <MessageCircle className="h-4 w-4" /> Ask Clive first
                        </a>
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);
