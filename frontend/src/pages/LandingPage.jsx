import { useEffect, useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { MarqueeStrip } from "@/components/landing/MarqueeStrip";
import { Workshop } from "@/components/landing/Workshop";
import { Gallery } from "@/components/landing/Gallery";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Expertise } from "@/components/landing/Expertise";
import { Testimonials } from "@/components/landing/Testimonials";
import { ServiceAreas } from "@/components/landing/ServiceAreas";
import { QuoteForm } from "@/components/landing/QuoteForm";
import { Footer } from "@/components/landing/Footer";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { OwnerLoginFab } from "@/components/landing/OwnerLoginFab";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const IMAGES = {
    hero: "/photos/kitchen.jpg",
    workshop1: "/photos/wardrobe-progress.jpg",
    workshop2: "/photos/headset-crop.jpg",
    cabinetry: "/photos/bedside.jpg",
    kitchen: "/photos/kitchen.jpg",
    headboard: "/photos/headset-crop.jpg",
    bedside: "/photos/bedside.jpg",
    floorBefore: "/photos/floor-before.png",
    floorAfter: "/photos/floor-after.png",
    wardrobe: "/photos/wardrobe.jpg",
    wardrobeProgress: "/photos/wardrobe-progress.jpg",
    tiles: "/photos/tiles.jpg",
    floorTiles: "/photos/floor-tiles.jpg",
    hinge: "/photos/hinge.jpg",
    wendy1: "/photos/wendy-1.jpg",
    wendy2: "/photos/wendy-2.jpg",
    wendy3: "/photos/wendy-3.jpg",
    wendy4: "/photos/wendy-4.jpg",
};

export const WHATSAPP_URL = "https://wa.me/27840900658";
export const PHONE_URL = "tel:+27840900658";
export const PHONE_DISPLAY = "+27 84 090 0658";
export const SITE = {
    googleBusinessUrl:
        "https://www.google.com/search?q=5+Star+Crafts+%26+Construction+Knysna+Western+Cape",
};

export default function LandingPage() {
    const [, setRemote] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const [imgs, settings] = await Promise.all([
                    fetch(`${API}/images`).then((r) => (r.ok ? r.json() : {})),
                    fetch(`${API}/settings`).then((r) => (r.ok ? r.json() : {})),
                ]);
                Object.assign(IMAGES, imgs);
                if (settings.google_business_url) SITE.googleBusinessUrl = settings.google_business_url;
                setRemote(1);
            } catch {
                /* defaults remain */
            }
        })();
    }, []);

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
                <ServiceAreas />
                <QuoteForm />
            </main>
            <Footer />
            <StickyCTA />
            <OwnerLoginFab />
        </div>
    );
}
