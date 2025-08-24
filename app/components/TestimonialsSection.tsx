"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  rating: number;
  avatarUrl?: string;
};

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = useMemo(
    () => [
      { id: 1, quote: "I was impressed with the pet boarding facility. My dog was so happy and well-cared for during our vacation. The staff sent daily updates and photos!", name: "Jasmine Lee", rating: 5 },
      { id: 2, quote: "The grooming service was excellent. My cat looked amazing and the staff was so gentle and patient. Will definitely be coming back!", name: "Patricia Rodriguez", rating: 5 },
      { id: 3, quote: "Professional training program transformed my puppy's behavior. The trainers are knowledgeable and caring. Highly recommend!", name: "Chris Martinez", rating: 5 },
      { id: 4, quote: "Amazing retail selection and helpful staff. Found everything I needed for my new kitten. Great quality products at fair prices.", name: "David Wilson", rating: 5 },
      { id: 5, quote: "The transport service was a lifesaver when my dog needed emergency vet care. Quick, safe, and professional service.", name: "Jane Smith", rating: 5 },
    ],
    [],
  );

  // Theme
  const SECTION_BG = "#e0ce8a";
  const QUOTE_TINT = "#d4b253";

  // Refs & state
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [isHover, setIsHover] = useState(false);

  // Center the active card by translating the track
  const centerActive = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const slides = Array.from(track.querySelectorAll<HTMLDivElement>(".t-slide"));
    const slide = slides[active];
    if (!slide) return;

    const x = slide.offsetLeft + slide.offsetWidth / 2 - viewport.clientWidth / 2;
    track.style.transform = `translateX(${-x}px)`;
  };

  useEffect(() => {
    centerActive(); // on mount and whenever index changes
    // also recenter on resize/orientation changes
    const ro = new ResizeObserver(() => centerActive());
    viewportRef.current && ro.observe(viewportRef.current);
    window.addEventListener("resize", centerActive);
    window.addEventListener("orientationchange", centerActive);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", centerActive);
      window.removeEventListener("orientationchange", centerActive);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Buttons & keyboard
  const goPrev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setActive((i) => (i + 1) % testimonials.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-advance (pause on hover)
  useEffect(() => {
    if (isHover) return;
    const id = setInterval(() => goNext(), 4000);
    return () => clearInterval(id);
  }, [isHover, active]); // restart timer after manual navigation

  return (
    <section 
    id='testimonials'
    className="relative py-16 md:py-20 lg:py-24" style={{ backgroundColor: SECTION_BG }} aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — scaled down to fit in one screen with cards */}
        <div className="mb-10 md:mb-12 max-w-3xl">
          <h2 className="lowercase font-semibold tracking-tight text-gray-900 leading-[1.05]
                         text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px]">
            trusted by humans, loved by pets
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-900/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
        </div>

        {/* Viewport (no scrollbar) */}
        <div
          ref={viewportRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform transition-transform duration-500 ease-out"
            style={{ transform: "translateX(0px)" }}
            aria-roledescription="carousel"
            aria-live="polite"
          >
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <div
                  key={t.id}
                  className={[
                    "t-slide shrink-0",
                    // widths: shows a peek of side cards but keeps everything within one screen
                    "w-[86vw] sm:w-[65vw] md:w-[48vw] lg:w-[38vw] xl:w-[34vw]",
                    "transition-all duration-500",
                    isActive ? "opacity-100 scale-[1.0]" : "opacity-45 scale-[0.97]",
                  ].join(" ")}
                >
                  <article className="rounded-3xl bg-[rgba(255,255,255,0.9)] p-6 sm:p-7 md:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                    {/* Stars */}
                    <div className="mb-4 flex">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} className="mr-1 h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="mb-6 leading-snug"
                      style={{ color: QUOTE_TINT, fontSize: "clamp(18px, 2.6vw, 28px)", fontWeight: 600 }}
                    >
                      “{t.quote}”
                    </blockquote>

                    {/* Author */}
                    <div className="mt-6 flex items-center">
                      <div className="mr-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow">
                        {t.avatarUrl ? (
                          <img src={t.avatarUrl} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                        ) : (
                          <User className="h-6 w-6 text-gray-600" />
                        )}
                      </div>
                      <div className="text-gray-900">
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-gray-600">Pet Parent</p>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Nav arrows — bottom-left like the ref */}
          <div className="absolute -bottom-2 left-2 z-10 flex gap-4">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] text-gray-900 shadow hover:bg-white transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] text-gray-900 shadow hover:bg-white transition"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
