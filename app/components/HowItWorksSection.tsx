"use client";

import Image from "next/image";
import { CalendarCheck, Scissors, Smile } from "lucide-react";

type Badge = {
  src: string;
  alt: string;
  /** "top-right" | "bottom-left" */
  pos: "top-right" | "bottom-left";
};

type Props = {
  title?: string;
  subtitle?: string;
  /** MP4/WEBM path in /public */
  videoSrc: string;
  /** Fallback poster image (shows before play/autoplay) */
  poster?: string;
  /** Two small decorative images like your mock */
  badges?: Badge[];
};

export default function HowItWorksSection({
  title = "How We Works ?",
  subtitle = "Watch our groomers work their magic!",
  videoSrc,
  poster,
  badges = [
    { src: "/howitworks/badge-1.jpg", alt: "Grooming products", pos: "top-right" },
    { src: "/howitworks/badge-2.jpg", alt: "Happy pet close-up", pos: "bottom-left" },
  ],
}: Props) {
  return (
    <section className="relative bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* Media card */}
        <div className="relative mx-auto mt-8 sm:mt-10 w-full">
          <div className="relative mx-auto overflow-hidden rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] shadow-xl ring-1 ring-black/5">
            {/* Keep 16:9 on desktop, slightly taller on mobile for presence */}
            <div className="aspect-[16/10] sm:aspect-[16/9]">
              <video
                className="h-full w-full object-cover"
                src={videoSrc}
                poster={poster}
                // iOS & Chrome autoplay requirements
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              />
            </div>

            {/* Badges */}
            {badges.map((b, i) => {
              const isTR = b.pos === "top-right";
              const base =
                "absolute z-10 overflow-hidden rounded-2xl shadow-xl ring-4 ring-white/70 bg-white";
              const posCls = isTR
                ? "right-3 top-3 sm:right-4 sm:top-4"
                : "left-3 -bottom-8 sm:left-4 sm:-bottom-10";
              const sizeCls = "h-16 w-16 sm:h-20 sm:w-20";
              return (
                <div key={i} className={`${base} ${posCls}`}>
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={160}
                    height={160}
                    className={`${sizeCls} object-cover`}
                    priority={i === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 simple steps */}
        <ol className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
          <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                <CalendarCheck className="h-5 w-5 text-emerald-700" />
              </span>
              <p className="font-semibold text-gray-900">Book</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Pick a slot that works for you—home pickup or in-store.
            </p>
          </li>

          <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100">
                <Scissors className="h-5 w-5 text-sky-700" />
              </span>
              <p className="font-semibold text-gray-900">Groom</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Gentle bath, blow-dry, trim, and a little spa love.
            </p>
          </li>

          <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
                <Smile className="h-5 w-5 text-amber-700" />
              </span>
              <p className="font-semibold text-gray-900">Smile</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Fresh, fluffy, happy—share the glam shot with the fam!
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
