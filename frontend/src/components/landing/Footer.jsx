import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { WHATSAPP_URL, PHONE_URL, PHONE_DISPLAY } from "@/pages/LandingPage";

export const Footer = () => (
    <footer id="contact" className="rounded-t-[2.5rem] bg-[#16233F] px-6 py-24 text-[#F7F7F5] lg:px-12 lg:py-32" data-testid="footer-section">
        <div className="mx-auto max-w-[1400px]">
            <Reveal>
                <Overline light>Start a Project</Overline>
                <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
                    Let's shape your space <span className="italic text-[#C9A227]">in timber.</span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#F7F7F5]/70">
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
                        className="flex items-center gap-2 rounded-full bg-[#F7F7F5] px-8 py-4 text-sm font-medium text-[#16233F] transition-transform duration-300 hover:-translate-y-1"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Start on WhatsApp
                    </a>
                    <a
                        href={PHONE_URL}
                        data-testid="footer-call-cta"
                        className="flex items-center gap-2 rounded-full border border-[#F7F7F5]/30 px-8 py-4 text-sm font-medium text-[#F7F7F5] transition-colors duration-300 hover:border-[#F7F7F5]"
                    >
                        <Phone className="h-4 w-4" />
                        Call {PHONE_DISPLAY}
                    </a>
                </div>
            </Reveal>

            <Reveal delay={0.25}>
                <div className="mt-20 grid gap-10 border-t border-[#F7F7F5]/15 pt-10 sm:grid-cols-3">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9A227]">Contact</p>
                        <p className="mt-3 text-sm text-[#F7F7F5]/80">Clive — Founder &amp; Master Carpenter</p>
                        <a href={PHONE_URL} className="mt-1 block text-sm text-[#F7F7F5]/80 underline-offset-4 hover:underline" data-testid="footer-phone-link">
                            {PHONE_DISPLAY}
                        </a>
                    </div>
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9A227]">Studio</p>
                        <p className="mt-3 text-sm text-[#F7F7F5]/80">
                            Bespoke carpentry &amp; construction for homeowners and architects.
                        </p>
                    </div>
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9A227]">Disciplines</p>
                        <p className="mt-3 text-sm text-[#F7F7F5]/80">
                            Joinery · Renovations · Tiling · Plumbing · Roofing · Woodwork · Decks
                        </p>
                    </div>
                </div>
            </Reveal>

            <div className="mt-16 flex items-center justify-between text-xs text-[#F7F7F5]/50">
                <p>© 2026 5 Star — Crafts &amp; Construction. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <a
                        href="/admin"
                        data-testid="footer-admin-link"
                        className="transition-colors duration-300 hover:text-[#F7F7F5]"
                    >
                        Owner sign-in
                    </a>
                    <a
                        href="#top"
                        data-testid="footer-back-to-top"
                        className="flex items-center gap-2 transition-colors duration-300 hover:text-[#F7F7F5]"
                    >
                        Back to top <ArrowUp className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
);
