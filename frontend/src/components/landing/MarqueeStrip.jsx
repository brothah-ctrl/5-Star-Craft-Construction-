import Marquee from "react-fast-marquee";

const ITEMS = [
    "Custom Cabinetry",
    "Architectural Joinery",
    "Handcrafted Furniture",
    "Spatial Fitting",
    "Wood Restoration",
];

const StarGlyph = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#B07D4A" aria-hidden="true">
        <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
    </svg>
);

export const MarqueeStrip = () => (
    <section className="overflow-hidden border-y border-[#E3D5CA] bg-[#EAE6DF]/60 py-7" data-testid="marquee-section">
        <Marquee speed={38} gradient={false} pauseOnHover>
            {ITEMS.map((item) => (
                <span
                    key={item}
                    className="mx-10 flex items-center gap-10 font-serif text-2xl text-[#2D241E] md:text-3xl"
                >
                    {item}
                    <StarGlyph />
                </span>
            ))}
        </Marquee>
    </section>
);
