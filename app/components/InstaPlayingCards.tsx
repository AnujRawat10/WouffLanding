"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type ReelCard = {
  id: string;
  title: string;
  poster: string;
  shortcode: string;
  angle?: number;
  badge?: string;
};

type Props = {
  heading?: string;
  subtitle?: string;
  profileUrl?: string;
  items?: ReelCard[];
};

export default function InstaPlayingCardsLite({
  heading = "Our Social Media",
  subtitle = "Real results from our community.",
  profileUrl = "https://www.instagram.com/thewouff/",
  items = [],
}: Props) {
  const [active, setActive] = useState<ReelCard | null>(null);

  useEffect(() => {
    if (!active) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [active]);

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-center text-[clamp(24px,6vw,34px)] font-semibold text-gray-900">
            <span className="text-gray-900">Our Social</span>{" "}
            <span style={{ color: "#98cbbc" }}>Media</span>
          </h2>

          {subtitle ? (
            <p className="mt-1 text-[clamp(14px,3.8vw,16px)] text-gray-600">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* Playing-card grid */}
        <div className="grid justify-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {items.map((card) => (
            <div key={card.id} className="relative">
              <button
                type="button"
                onClick={() => setActive(card)}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-[28px]"
                aria-label={`Play Instagram reel: ${card.title}`}
              >
                <div
                  className="relative w-[min(92vw,360px)] bg-[#fff8f0] rounded-[26px] ring-1 ring-black/10
                             shadow-[0_28px_60px_-18px_rgba(0,0,0,0.45)] transition
                             group-hover:rotate-0 group-hover:scale-[1.02]"
                  style={{ transform: `rotate(${card.angle ?? 0}deg)` }}
                >
                  {/* layered “card” look */}
                  <div className="absolute inset-0 m-3 rounded-[22px] bg-white/70" />
                  <div className="absolute inset-0 m-7 rounded-[20px] bg-white/70" />

                  {/* Poster */}
                  <div className="relative z-10 mx-5 my-6 rounded-[18px] overflow-hidden aspect-[3/4] bg-white">
                    <Image
                      src={card.poster}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 92vw, 360px"
                      className="object-cover"
                      priority={false}
                    />

                    {/* Diagonal title strip */}
                    <div className="pointer-events-none absolute left-3 right-3 bottom-9 rotate-[-12deg]">
                      <div className="mx-auto w-full rounded-xl bg-white text-gray-900 px-4 py-2 text-sm font-medium shadow ring-1 ring-black/10">
                        {card.title}
                      </div>
                    </div>

                    {/* Play overlay */}
                    <div className="pointer-events-none absolute inset-0 grid place-items-center">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm">
                        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  {card.badge ? (
                    <span className="absolute top-3 left-4 z-20 rounded-lg bg-white px-3 py-1 text-[13px] font-semibold text-gray-900 rotate-[-6deg]">
                      {card.badge}
                    </span>
                  ) : null}

                  {/* tiny corner text */}
                  <span className="absolute bottom-3 right-4 text-gray-600 text-sm rotate-[-8deg]">
                    IG • Reel
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Instagram reel: ${active.title}`}
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-[680px] aspect-[9/16] bg-white rounded-2xl overflow-hidden ring-1 ring-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              key={active.id}
              src={`https://www.instagram.com/reel/${active.shortcode}/embed`}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              loading="lazy"
            />
            <button
              onClick={() => setActive(null)}
              className="absolute top-2 right-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-gray-900 shadow"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M18.3 5.71 12 12.01l-6.29-6.3-1.42 1.42 6.3 6.29-6.3 6.29 1.42 1.42L12 14.85l6.29 6.28 1.42-1.42-6.28-6.29 6.28-6.29z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
