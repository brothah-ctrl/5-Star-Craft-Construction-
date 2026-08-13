import { useState } from "react";
import { MessageCircle, Phone, Send, CheckCircle2 } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { IMAGES, WHATSAPP_URL, PHONE_URL, PHONE_DISPLAY } from "@/pages/LandingPage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SERVICES = [
    "Custom Cabinetry",
    "Architectural Joinery",
    "Handcrafted Furniture",
    "Spatial Fitting",
    "Wood Restoration",
    "Something else",
];

const inputCls =
    "w-full rounded-xl border border-[#E3D5CA] bg-[#F9F8F6] px-4 py-3.5 text-sm text-[#1A1A1A] outline-none transition-colors duration-300 placeholder:text-[#5C564E]/60 focus:border-[#B07D4A]";
const labelCls = "mb-2 block text-[11px] uppercase tracking-[0.22em] text-[#5C564E]";

export const QuoteForm = () => {
    const [form, setForm] = useState({ name: "", phone: "", email: "", service: SERVICES[0], message: "" });
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(false);

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        setError(false);
        try {
            const res = await fetch(`${API}/enquiries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("send failed");
            setStatus("sent");
        } catch {
            setStatus("idle");
            setError(true);
        }
    };

    return (
        <section id="quote" className="px-6 py-28 lg:px-12 lg:py-40" data-testid="quote-section">
            <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <Reveal>
                        <Overline>Request a Quote</Overline>
                        <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl">
                            Tell us about <span className="italic text-[#B07D4A]">your project.</span>
                        </h2>
                        <p className="mt-6 max-w-md text-base leading-relaxed text-[#5C564E]">
                            A few lines is all it takes — every enquiry lands straight in
                            Clive's inbox and gets a personal reply, usually within one
                            working day.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-[#E3D5CA]">
                            <img
                                src={IMAGES.hinge}
                                alt="Clive fitting a hinge on site"
                                className="kenburns h-56 w-full object-cover"
                                data-testid="quote-image"
                            />
                            <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/75 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#2D241E] backdrop-blur-xl">
                                On the bench now
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.25}>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noreferrer"
                                data-testid="quote-whatsapp-button"
                                className="flex items-center gap-2 rounded-full bg-[#2D241E] px-7 py-3.5 text-sm font-medium text-[#F9F8F6] transition-transform duration-300 hover:-translate-y-1"
                            >
                                <MessageCircle className="h-4 w-4" /> WhatsApp Clive
                            </a>
                            <a
                                href={PHONE_URL}
                                data-testid="quote-call-button"
                                className="flex items-center gap-2 rounded-full border border-[#2D241E]/25 px-7 py-3.5 text-sm font-medium text-[#2D241E] transition-colors duration-300 hover:border-[#2D241E]"
                            >
                                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
                            </a>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.1} className="lg:col-span-7">
                    <div className="rounded-[2rem] border border-[#E3D5CA] bg-white/50 p-8 md:p-12">
                        {status === "sent" ? (
                            <div className="flex h-full flex-col items-start justify-center py-10" data-testid="quote-success">
                                <CheckCircle2 className="h-10 w-10 text-[#B07D4A]" />
                                <h3 className="mt-6 font-serif text-3xl font-medium text-[#1A1A1A]">
                                    Enquiry sent.
                                </h3>
                                <p className="mt-4 max-w-sm text-base leading-relaxed text-[#5C564E]">
                                    Thank you, {form.name.split(" ")[0]} — your project brief is
                                    on its way to Clive. Expect a personal reply within one
                                    working day.
                                </p>
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="quote-success-whatsapp"
                                    className="mt-8 flex items-center gap-2 rounded-full border border-[#2D241E]/25 px-7 py-3.5 text-sm font-medium text-[#2D241E] transition-colors duration-300 hover:border-[#2D241E]"
                                >
                                    <MessageCircle className="h-4 w-4" /> Prefer to chat now?
                                </a>
                            </div>
                        ) : (
                            <form onSubmit={submit} data-testid="quote-form">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className={labelCls} htmlFor="q-name">Your name</label>
                                        <input id="q-name" required minLength={2} value={form.name} onChange={set("name")}
                                            placeholder="e.g. Thandi Weber" className={inputCls} data-testid="quote-name-input" />
                                    </div>
                                    <div>
                                        <label className={labelCls} htmlFor="q-phone">Phone</label>
                                        <input id="q-phone" required minLength={6} value={form.phone} onChange={set("phone")}
                                            placeholder="+27 ..." className={inputCls} data-testid="quote-phone-input" />
                                    </div>
                                </div>
                                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className={labelCls} htmlFor="q-email">Email (optional)</label>
                                        <input id="q-email" type="email" value={form.email} onChange={set("email")}
                                            placeholder="you@example.com" className={inputCls} data-testid="quote-email-input" />
                                    </div>
                                    <div>
                                        <label className={labelCls} htmlFor="q-service">What do you need?</label>
                                        <select id="q-service" value={form.service} onChange={set("service")}
                                            className={inputCls} data-testid="quote-service-select">
                                            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label className={labelCls} htmlFor="q-message">About the project</label>
                                    <textarea id="q-message" required minLength={5} rows={4} value={form.message} onChange={set("message")}
                                        placeholder="A kitchen in Constantia, roughly 12 cabinets, oak finish..."
                                        className={`${inputCls} resize-none`} data-testid="quote-message-input" />
                                </div>
                                {error && (
                                    <p className="mt-4 text-sm text-red-700" data-testid="quote-error">
                                        Something went wrong sending your enquiry — please try again or WhatsApp Clive directly.
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    data-testid="quote-submit-button"
                                    className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#2D241E] px-8 py-4 text-sm font-medium text-[#F9F8F6] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                                >
                                    {status === "sending" ? "Sending..." : "Send Enquiry"}
                                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </button>
                            </form>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
