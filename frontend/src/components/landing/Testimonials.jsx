import { Star } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";

const TESTIMONIALS = [
    {
        quote: "We hired them for a full kitchen remodel and the experience was seamless from the first estimate. The project manager walked us through every line item, the crew showed up at 8am sharp each day, and they protected our floors with drop cloths the whole time. Finished two days early and the cabinets are flawless.",
        name: "Daniel Okafor",
        source: "Google",
        rating: 5,
    },
    {
        quote: "On time, on budget, and the crew cleaned up every single day. Could not ask for a better contractor.",
        name: "Marcus Bell",
        source: "Google",
        rating: 5,
    },
    {
        quote: "After two bad experiences with other builders, this construction company restored my faith. They re-poured our cracked foundation, explained the engineering in plain English, and pulled all the permits themselves. Six months later, zero issues.",
        name: "Sarah Lindqvist",
        source: "Yelp",
        rating: 5,
    },
    {
        quote: "Built our back deck in three days flat and it looks incredible. Highly recommend Clive's 5 Star Craft and Construction company.",
        name: "Priya Nair",
        source: "Google",
        rating: 5,
    },
    {
        quote: "Added a 400 sq ft master suite to our home. What impressed me most was the communication — text updates with photos at the end of every week, and any change order approved in writing before a single dollar was spent. The framing, drywall, and trim work are all top-notch.",
        name: "Greg Halloran",
        source: "Yelp",
        rating: 5,
    },
    {
        quote: "Honest pricing, no surprises, quality work. Exactly what you want from a general contractor.",
        name: "Tom Whitfield",
        source: "Yelp",
        rating: 5,
    },
    {
        quote: "Great finished product and a friendly crew. Knocked off one star only because the start date slipped a week, but they communicated the whole way. Thanks Clive. BEST IN KNYSNA!",
        name: "Angela Ruiz",
        source: "Google",
        rating: 4,
    },
];

const Stars = ({ rating = 5 }) => (
    <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < rating ? "fill-[#C9A227] text-[#C9A227]" : "text-[#C9A227]/35"}`}
            />
        ))}
    </div>
);

export const Testimonials = () => (
    <section id="testimonials" className="bg-[#E9EBEF]/50 px-6 py-28 lg:px-12 lg:py-40" data-testid="testimonials-section">
        <div className="mx-auto max-w-[1400px]">
            <Reveal>
                <Overline>Google &amp; Yelp Reviews</Overline>
                <h2 className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-tight tracking-tight text-[#16233F] sm:text-5xl">
                    Trusted by homeowners <span className="italic text-[#B8912A]">across the Garden Route.</span>
                </h2>
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {TESTIMONIALS.map((t, i) => (
                    <Reveal key={t.name} delay={(i % 3) * 0.1}>
                        <figure
                            className="flex h-full flex-col justify-between rounded-[1.75rem] border border-[#DEE2E8] bg-[#F7F7F5] p-8 transition-transform duration-300 hover:-translate-y-1"
                            data-testid={`testimonial-card-${i + 1}`}
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <Stars rating={t.rating} />
                                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#55606E]">
                                        {t.source}
                                    </span>
                                </div>
                                <blockquote
                                    className="mt-6 font-serif text-xl leading-relaxed text-[#16233F]"
                                    dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
                                />
                            </div>
                            <figcaption className="mt-8">
                                <p
                                    className="text-sm font-semibold text-[#16233F]"
                                    dangerouslySetInnerHTML={{ __html: t.name }}
                                />
                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#55606E]">
                                    {t.source} review
                                </p>
                            </figcaption>
                        </figure>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
