import { Star } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";

const TESTIMONIALS = [
    {
        quote: "The oak staircase they built is now the centrepiece of our home. Every guest asks who made it.",
        name: "Sarah M.",
        role: "Homeowner · Claremont",
    },
    {
        quote: "Precision joinery delivered on programme and on budget. A rare combination in bespoke work.",
        name: "Daniel K.",
        role: "Principal Architect · Studio North",
    },
    {
        quote: "They restored my grandmother's yellowwood table with such care it brought my mother to tears.",
        name: "Naledi P.",
        role: "Restoration Client",
    },
    {
        quote: "From first sketch to final fit, the communication was flawless. The cabinetry is simply perfect.",
        name: "James &amp; Anita R.",
        role: "Homeowners · Constantia",
    },
    {
        quote: "I specify 5 Star on every residential project I can. Their detailing lifts the whole architecture.",
        name: "Thandi W.",
        role: "Architect · TW Atelier",
    },
    {
        quote: "Our retail fit-out was handed over ahead of schedule, and the finish quality is exceptional.",
        name: "Marcus L.",
        role: "Retail Director",
    },
];

const Stars = () => (
    <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[#D4A373] text-[#D4A373]" />
        ))}
    </div>
);

export const Testimonials = () => (
    <section id="testimonials" className="bg-[#EAE6DF]/50 px-6 py-28 lg:px-12 lg:py-40" data-testid="testimonials-section">
        <div className="mx-auto max-w-[1400px]">
            <Reveal>
                <Overline>Client &amp; Architect Voices</Overline>
                <h2 className="mt-6 max-w-2xl font-serif text-4xl font-medium leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl">
                    Trusted with homes, <span className="italic text-[#B07D4A]">specified by architects.</span>
                </h2>
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {TESTIMONIALS.map((t, i) => (
                    <Reveal key={t.name} delay={(i % 3) * 0.1}>
                        <figure
                            className="flex h-full flex-col justify-between rounded-[1.75rem] border border-[#E3D5CA] bg-[#F9F8F6] p-8 transition-transform duration-300 hover:-translate-y-1"
                            data-testid={`testimonial-card-${i + 1}`}
                        >
                            <div>
                                <Stars />
                                <blockquote
                                    className="mt-6 font-serif text-xl leading-relaxed text-[#2D241E]"
                                    dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
                                />
                            </div>
                            <figcaption className="mt-8">
                                <p
                                    className="text-sm font-semibold text-[#1A1A1A]"
                                    dangerouslySetInnerHTML={{ __html: t.name }}
                                />
                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#5C564E]">
                                    {t.role}
                                </p>
                            </figcaption>
                        </figure>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
