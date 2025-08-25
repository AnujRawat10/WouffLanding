"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Tag = "new" | "limited" | null;
type Item = {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  tag: Tag;
  image: string;
};

export default function ServicesSection() {
  const items: Item[] = [
    { id: 1, title: "Terracotta Cloud Chair", subtitle: "Copper Frame, Terracotta Velvet", price: "€5,250", tag: "new",     image: "/collections/c1.jpg" },
    { id: 2, title: "Sage Copper Lounge",     subtitle: "Copper Frame, Sage Velvet",      price: "€4,675", tag: "limited", image: "/collections/c2.jpg" },
    { id: 3, title: "Granite Arc Sofa",       subtitle: "Solid Wood, Pebble Weave",       price: "€6,190", tag: null,      image: "/collections/c3.jpg" },
    { id: 4, title: "Verde Modular Chair",    subtitle: "Copper Frame, Premium Velvet",   price: "€4,890", tag: null,      image: "/collections/c4.jpg" },
    { id: 5, title: "Alabaster Accent Seat",  subtitle: "Steel Base, Bouclé",             price: "€3,980", tag: null,      image: "/collections/c5.jpg" },
  ];

  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Drag-to-scroll (desktop), keeps vertical scroll natural
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let grabbing = false;
    let startX = 0;
    let startLeft = 0;

    const down = (e: PointerEvent) => {
      grabbing = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!grabbing) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const up = (e: PointerEvent) => {
      grabbing = false;
      try { el.releasePointerCapture(e.pointerId); } catch {}
      el.style.cursor = "";
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const scrollByAmount = (dir: "prev" | "next") => {
    const el = viewportRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85);
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  const EDGE = 48;

  return (
    <section id="collections" className="py-16 sm:py-20 lg:py-24 bg-white">
      {/* relative so stickers can sit on top without affecting layout */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Decorative stickers (non-interactive) */}
        {/* <Image
          src="/stickers/shinestiker.svg"
          alt=""
          width={220}
          height={220}
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-8 -left-4 sm:-top-10 sm:-left-6 w-24 sm:w-32 md:w-40 lg:w-52 h-auto opacity-80 mix-blend-screen drop-shadow sticker-float z-[1]"
        /> */}
        <Image
          src="/stickers/pawsticker.svg"
          alt=""
          width={200}
          height={200}
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 w-20 sm:w-28 md:w-32 lg:w-40 h-auto opacity-90 drop-shadow rotate-[12deg] sticker-bob z-[1]"
        />

        <header className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Featured <span className="italic font-normal">Collection</span>
          </h2>
          <p className="mt-3 text-gray-600">
            Discover our most beloved pieces, each crafted with meticulous attention to detail and timeless design principles.
          </p>
        </header>

        <div className="relative mt-8 sm:mt-10">
          <div className="absolute -top-12 right-0 z-20 flex gap-2">
            <button
              onClick={() => scrollByAmount("prev")}
              className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollByAmount("next")}
              className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={viewportRef}
            className="
              no-scrollbar overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4
              -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8
              cursor-grab active:cursor-grabbing
            "
            style={{
              WebkitMaskImage: `linear-gradient(to right, transparent 0, black ${EDGE}px, black calc(100% - ${EDGE}px), transparent 100%)`,
              maskImage: `linear-gradient(to right, transparent 0, black ${EDGE}px, black calc(100% - ${EDGE}px), transparent 100%)`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              scrollPaddingInline: "24px",
              contain: "layout paint",
            } as React.CSSProperties}
            aria-roledescription="carousel"
          >
            <div className="flex gap-5 sm:gap-6">
              {items.map((it, idx) => (
                <article
                  key={it.id}
                  className="
                    snap-start shrink-0
                    w-[84vw] sm:w-[58vw] md:w-[48vw] lg:w-[34vw] xl:w-[30vw]
                    relative overflow-hidden rounded-[22px] bg-white ring-1 ring-black/5
                    shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                    transition-transform duration-300 will-change-transform
                    hover:-translate-y-[2px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                  "
                  aria-label={it.title}
                >
                  <div className="relative h-[420px] w-full sm:h-[440px]">
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="object-cover select-none"
                      sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 34vw, (min-width: 768px) 48vw, 84vw"
                    />

                    {it.tag && (
                      <span
                        className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow ${
                          it.tag === "new" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      >
                        {it.tag === "new" ? "New" : "Limited"}
                      </span>
                    )}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                      <h3 className="text-[15px] sm:text-[16px] font-semibold">{it.title}</h3>
                      <p className="mt-0.5 text-[12px] sm:text-[12.5px] opacity-85">{it.subtitle}</p>
                      <div className="mt-3 inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-[13px] font-semibold text-gray-900 ring-1 ring-black/5">
                        {it.price}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
