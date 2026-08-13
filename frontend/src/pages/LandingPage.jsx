import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { MarqueeStrip } from "@/components/landing/MarqueeStrip";
import { Workshop } from "@/components/landing/Workshop";
import { Gallery } from "@/components/landing/Gallery";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Expertise } from "@/components/landing/Expertise";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";
import { StickyCTA } from "@/components/landing/StickyCTA";

export const IMAGES = {
    hero: "/photos/kitchen.jpg",
    workshop1: "/photos/floor-after.png",
    workshop2: "/photos/headset-crop.jpg",
    cabinetry: "/photos/bedside.jpg",
    kitchen: "/photos/kitchen.jpg",
    headboard: "/photos/headset-crop.jpg",
    bedside: "/photos/bedside.jpg",
    floorBefore: "/photos/floor-before.png",
    floorAfter: "/photos/floor-after.png",
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
                <Gallery />
                <BeforeAfter />
                <Expertise />
                <Testimonials />
            </main>
            <Footer />
            <StickyCTA />
        </div>
    );
}
