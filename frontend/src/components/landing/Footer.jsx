import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { WHATSAPP_URL, PHONE_URL, PHONE_DISPLAY } from "@/pages/LandingPage";

export const Footer = () => (
    <footer id="contact" className="rounded-t-[2.5rem] bg-[#2D241E] px-6 py-24 text-[#F9F8F6] lg:px-12 lg:py-32" data-testid="footer-section">
        <div className="mx-auto max-w-[1400px]">
            <Reveal>
                <Overline light>Start a Project</Overline>
                <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
                    Let's shape your space <span className="italic text-[#D4A373]">in timber.</span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#F9F8F6]/70">
                    Speak directly with Clive — founder and master carpenter — about your
                    project, your space, and what's possible in wood.
                </p>
            </Reveal>

            <Reveal delay={0.15}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="footer-whatsapp-cta"
                        className="flex items-center gap-2 rounded-full bg-[#F9F8F6] px-8 py-4 text-sm font-medium text-[#2D241E] transition-transform duration-300 hover:-translate-y-1"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Start on WhatsApp
                    </a>
                    <a
                        href={PHONE_URL}
                        data-testid="footer-call-cta"
                        className="flex items-center gap-2 rounded-full border border-[#F9F8F6]/30 px-8 py-4 text-sm font-medium text-[#F9F8F6] transition-colors duration-300 hover:border-[#F9F8F6]"
                    >
                        <Phone className="h-4 w-4" />
                        Call {PHONE_DISPLAY}
                    </a>
                </div>
            </Reveal>

            <Reveal delay={0.25}>
                <div className="mt-20 grid gap-10 border-t border-[#F9F8F6]/15 pt-10 sm:grid-cols-3">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4A373]">Contact</p>
                        <p className="mt-3 text-sm text-[#F9F8F6]/80">Clive — Founder &amp; Master Carpenter</p>
                        <a href={PHONE_URL} className="mt-1 block text-sm text-[#F9F8F6]/80 underline-offset-4 hover:underline" data-testid="footer-phone-link">
                            {PHONE_DISPLAY}
                        </a>
                    </div>
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4A373]">Studio</p>
                        <p className="mt-3 text-sm text-[#F9F8F6]/80">
                            Bespoke carpentry &amp; construction for homeowners and architects.
                        </p>
                    </div>
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4A373]">Disciplines</p>
                        <p className="mt-3 text-sm text-[#F9F8F6]/80">
                            Cabinetry · Joinery · Furniture · Fitting · Restoration
                        </p>
                    </div>
                </div>
            </Reveal>

            <div className="mt-16 flex items-center justify-between text-xs text-[#F9F8F6]/50">
                <p>© 2026 5 Star — Crafts &amp; Construction. All rights reserved.</p>
                <a
                    href="#top"
                    data-testid="footer-back-to-top"
                    className="flex items-center gap-2 transition-colors duration-300 hover:text-[#F9F8F6]"
                >
                    Back to top <ArrowUp className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    </footer>
);
