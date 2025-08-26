"use client";

import Image from "next/image";
import { PawPrint, ChevronRight } from "lucide-react";

type Props = {
  eyebrow?: string;
  heading?: string;
  /** kept in the type for compatibility, but not used anymore */
  highlight?: string;
  subcopy?: string;
  heroImage: string;
  heroAlt?: string;
  badgeImage: string;
  badgeAlt?: string;
  panelBg?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export default function ContactHero({
  eyebrow = "Wouff pet solutions",
  heading = "Your reliable partner for pet wellness",
  // highlight is intentionally unused to remove special styling
  subcopy = "In our products, we prioritize the health and happiness of your beloved pets. We are dedicated to providing love.",
  heroImage,
  heroAlt = "Happy pet and human",
  badgeImage,
  badgeAlt = "Cute pet",
  panelBg = "#cfe8f6",
  primaryHref = "#contact",
  secondaryHref = "#services",
}: Props) {
  return (
    <section id="contact" className="bg-[#f4f4f4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <span className="inline-block h-2 w-2 rounded-full bg-[#ff5a3c]" />
              <span>{eyebrow}</span>
            </div>

            {/* Plain heading, no highlight */}
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900">
              {heading}
            </h1>

            <p className="mt-5 max-w-xl text-gray-600">{subcopy}</p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={primaryHref}
                className="group inline-flex items-center rounded-full bg-gray-900 text-white pl-5 pr-2 py-2.5 text-sm font-semibold shadow hover:shadow-md transition"
              >
                Contact us
                <span className="ml-3 grid h-9 w-9 place-items-center rounded-full bg-[#f4a3ff] text-gray-900 shadow-inner">
                  <PawPrint className="h-5 w-5" />
                </span>
              </a>

              <a
                href={secondaryHref}
                className="inline-flex items-center text-gray-900 font-medium hover:opacity-80 transition"
              >
                See all services
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            {/* allow the badge to float outside without clipping */}
            <div
              className="relative rounded-[32px] p-3 sm:p-4"
              style={{ backgroundColor: panelBg }}
            >
              {/* Big image */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] rounded-[28px] overflow-hidden">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 58vw, 92vw"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-6 left-6 sm:-top-7 sm:left-7 z-20">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-[20px] border-[6px] border-white shadow-xl overflow-hidden bg-white">
                  <Image
                    src={badgeImage}
                    alt={badgeAlt}
                    fill
                    className="object-cover"
                    sizes="112px"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /RIGHT */}
        </div>
      </div>
    </section>
  );
}
