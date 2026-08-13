import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { Reveal, Overline } from "@/components/landing/Reveal";
import { IMAGES } from "@/pages/LandingPage";

export const BeforeAfter = () => {
    const ref = useRef(null);
    const dragging = useRef(false);
    const [pos, setPos] = useState(50);

    const update = useCallback((clientX) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
    }, []);

    return (
        <section id="restoration" className="bg-[#EAE6DF]/50 px-6 py-28 lg:px-12 lg:py-40" data-testid="before-after-section">
            <div className="mx-auto max-w-[1400px]">
                <div className="grid items-end gap-8 lg:grid-cols-12">
                    <Reveal className="lg:col-span-7">
                        <Overline>Wood Restoration</Overline>
                        <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl">
                            Drag to see a floor <span className="italic text-[#B07D4A]">brought back to life.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15} className="lg:col-span-5">
                        <p className="max-w-md text-base leading-relaxed text-[#5C564E] lg:ml-auto">
                            The Ebony Floor Revival — worn boards sanded back, stained deep
                            and sealed to a lasting sheen. Slide the handle to compare.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={0.2}>
                    <div
                        ref={ref}
                        data-testid="before-after-slider"
                        className="relative mt-16 h-[340px] cursor-ew-resize touch-none select-none overflow-hidden rounded-[2rem] border border-[#E3D5CA] md:h-[560px]"
                        onPointerDown={(e) => {
                            dragging.current = true;
                            e.currentTarget.setPointerCapture(e.pointerId);
                            update(e.clientX);
                        }}
                        onPointerMove={(e) => dragging.current && update(e.clientX)}
                        onPointerUp={() => (dragging.current = false)}
                        onPointerCancel={() => (dragging.current = false)}
                    >
                        <img
                            src={IMAGES.floorAfter}
                            alt="Floor after restoration — rich even ebony finish"
                            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                            draggable={false}
                        />
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                        >
                            <img
                                src={IMAGES.floorBefore}
                                alt="Floor before restoration — worn and patchy"
                                className="absolute inset-0 h-full w-full object-cover"
                                draggable={false}
                            />
                        </div>

                        <span className="pointer-events-none absolute left-6 top-6 rounded-full border border-white/30 bg-white/75 px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-[#2D241E] backdrop-blur-xl">
                            Before
                        </span>
                        <span className="pointer-events-none absolute right-6 top-6 rounded-full bg-[#2D241E]/85 px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-[#F9F8F6] backdrop-blur-xl">
                            After
                        </span>

                        <div
                            className="pointer-events-none absolute inset-y-0"
                            style={{ left: `${pos}%` }}
                            data-testid="before-after-handle"
                        >
                            <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow-lg" />
                            <div className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[#2D241E]/90 text-[#F9F8F6] shadow-xl backdrop-blur-xl">
                                <MoveHorizontal className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
