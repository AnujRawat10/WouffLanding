"use client";

import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand / left */}
          <div className="md:col-span-5">
            {/* White logo */}
            <a href="/" className="inline-block" aria-label="The Wouff — Home">
              <Image
                src="/brand/wouff-white.png" // put file in /public/brand/
                alt="The Wouff"
                width={520}
                height={100}
                priority
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain"
                sizes="(min-width: 1024px) 520px, (min-width: 640px) 360px, 240px"
              />
            </a>

            <p className="mt-6 text-gray-300 leading-relaxed mb-6 max-w-md">
              Your trusted partner in pet care. We provide comprehensive products
              delivered with love for your furry family members.
            </p>

            <div className="flex gap-4">
              <a
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                href="#"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                href="#"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                aria-label="Twitter"
                className="grid h-10 w-10 place-items-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                href="#"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* CTA tiles right */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              {/* Get in touch */}
              <div
                className="relative overflow-hidden rounded-[28px] p-6 sm:p-8 ring-1 ring-white/10"
                style={{ backgroundColor: "#e7b7c3" }} // soft pink
              >
                <div className="flex h-full min-h-[340px] sm:min-h-[380px] flex-col justify-between">
                  <div className="max-w-[26ch] pr-24 sm:pr-32">
                    <h3 className="text-white/95 text-[34px] leading-none sm:text-[38px] font-semibold lowercase">
                      get in <br /> touch
                    </h3>
                    <p className="mt-3 text-white/90 text-sm leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur pulvinar magna nec orci ultricies vulputate.
                    </p>
                  </div>

                  <div className="mt-5">
                    <a
                      href="#contact"
                      className="inline-flex items-center rounded-full border border-white/70 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
                    >
                      Contact us
                    </a>
                  </div>
                </div>

                {/* Cat image: anchored bottom-right */}
                <div className="pointer-events-none absolute right-4 bottom-4 sm:right-6 sm:bottom-6 h-28 w-28 sm:h-40 sm:w-40 rounded-[22px] overflow-hidden">
                  <Image
                    src="/footer/cat.png" // place file in /public/footer/
                    alt="cat waving"
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 160px, 112px"
                    priority
                  />
                </div>
              </div>

              {/* Join the pack */}
              <div
                className="rounded-[28px] p-6 sm:p-8 ring-1 ring-white/10"
                style={{ backgroundColor: "#a8d3e1" }} // light blue
              >
                <div className="flex h-full min-h-[340px] sm:min-h-[380px] flex-col justify-between">
                  <div className="max-w-[28ch]">
                    <h3 className="text-white/95 text-[34px] leading-none sm:text-[38px] font-semibold lowercase">
                      join the <br /> pack
                    </h3>
                    <p className="mt-3 text-white/90 text-sm leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur pulvinar magna nec ultricies vulputate.
                    </p>
                  </div>

                  {/* Email pill with right circular button */}
                  <form
                    className="mt-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // TODO: hook your subscribe logic
                    }}
                  >
                    <label htmlFor="pack-email" className="sr-only">
                      Email address
                    </label>

                    <div className="relative">
                      {/* pill */}
                      <div className="flex items-center rounded-full bg-white/95 p-1.5 pr-20 ring-1 ring-black/10">
                        <input
                          id="pack-email"
                          type="email"
                          required
                          placeholder="Enter your email…"
                          className="w-full bg-transparent px-4 py-2 text-sm text-gray-900 placeholder-gray-500 outline-none"
                        />
                      </div>

                      {/* circular button */}
                      <button
                        type="submit"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-[#56a6bf] text-white text-[11px] font-semibold leading-tight hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-white/70"
                        aria-label="Join the pack"
                      >
                        Join
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & bottom bar */}
        <div className="mt-10 border-top border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap justify-center gap-x-6 text-sm text-gray-300">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/404" className="hover:text-white transition-colors">
                404
              </a>
              <a href="/password" className="hover:text-white transition-colors">
                Password
              </a>
            </div>

            <div className="text-center md:text-right text-sm text-gray-300">
              <p>© 2025 Company name. All rights reserved.</p>
              <p className="text-xs">
                Created by <span className="text-white">Anuj</span> • Powered by{" "}
                <span className="text-white">DDC</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
