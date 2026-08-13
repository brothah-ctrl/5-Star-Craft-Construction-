import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { MarqueeStrip } from "@/components/landing/MarqueeStrip";
import { Workshop } from "@/components/landing/Workshop";
import { Expertise } from "@/components/landing/Expertise";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";
import { StickyCTA } from "@/components/landing/StickyCTA";

export const IMAGES = {
    hero: "https://images.unsplash.com/photo-1715760374522-a609a0c2f65e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjB0aW1iZXIlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODY2NDYzMzZ8MA&ixlib=rb-4.1.0&q=85",
    workshop1: "https://images.unsplash.com/photo-1590880795696-20c7dfadacde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxjYXJwZW50cnklMjB3b3Jrc2hvcCUyMGRldGFpbHxlbnwwfHx8fDE3ODY2NDYzMzZ8MA&ixlib=rb-4.1.0&q=85",
    workshop2: "https://images.unsplash.com/photo-1659930087003-2d64e33181f7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxjYXJwZW50cnklMjB3b3Jrc2hvcCUyMGRldGFpbHxlbnwwfHx8fDE3ODY2NDYzMzZ8MA&ixlib=rb-4.1.0&q=85",
    cabinetry: "https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwyfHxjdXN0b20lMjBjYWJpbmV0cnklMjBtb2Rlcm58ZW58MHx8fHwxNzg2NjQ2MzQ5fDA&ixlib=rb-4.1.0&q=85",
};

export const WHATSAPP_URL = "https://wa.me/27840900658";
export const PHONE_URL = "tel:+27840900658";
export const PHONE_DISPLAY = "+27 84 090 0658";

export default function LandingPage() {
    return (
        <div id="top" className="noise font-sans" data-testid="landing-page">
            <Nav />
            <main>
                <Hero />
                <MarqueeStrip />
                <Workshop />
                <Expertise />
                <Testimonials />
            </main>
            <Footer />
            <StickyCTA />
        </div>
    );
}
