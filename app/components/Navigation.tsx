"use client";

import { useState } from "react";
import GameLauncher from "@/app/components/GameLauncher";
import Image from "next/image";

interface NavigationProps {
  currentBgColor: string; // expected hex like "#e0ce8a"
}

export default function Navigation({ currentBgColor }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determine if the background is light or dark to adjust text color
  const isLightBackground = (color: string) => {
    // supports "#rrggbb" only (fallback to light if unknown)
    const match = color.replace("#", "").match(/^[0-9a-fA-F]{6}$/) ? color.replace("#", "") : null;
    if (!match) return true;
    const r = parseInt(match.slice(0, 2), 16);
    const g = parseInt(match.slice(2, 4), 16);
    const b = parseInt(match.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  const textColor = isLightBackground(currentBgColor) ? "text-gray-800" : "text-white";
  const hoverColor = isLightBackground(currentBgColor) ? "hover:text-gray-600" : "hover:text-gray-200";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-1000 backdrop-blur-md bg-white/10 border-b border-white/20"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/brand/wouff_black_logo.png"
              alt="Wouff"
              width={180}
              height={28}
              priority
              className={`h-7 w-auto md:h-8 ${!isLightBackground(currentBgColor) ? "invert" : ""}`}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#collections"
                className={`${textColor} ${hoverColor} transition-colors px-3 py-2 text-sm font-medium lowercase`}
              >
                collections
              </a>
              <a
                href="#testimonials"
                className={`${textColor} ${hoverColor} transition-colors px-3 py-2 text-sm font-medium lowercase`}
              >
                testimonials
              </a>
              <a
                href="#contact"
                className={`${textColor} ${hoverColor} transition-colors px-3 py-2 text-sm font-medium lowercase`}
              >
                contact
              </a>

              {/* Game launcher */}
              <div className={textColor}>
                <GameLauncher label="play" src="https://tap-game-for-wouff.vercel.app/" />
              </div>
            </div>
          </div>

          {/* Shop Now Button */}
          <div className="hidden md:block">
            <button
              type="button"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 lowercase transform hover:scale-105 bg-white/15 border border-white/20 hover:bg-white/25 backdrop-blur-sm ${
                isLightBackground(currentBgColor)
                  ? "text-gray-800 hover:text-gray-700"
                  : "text-white hover:text-gray-100"
              }`}
            >
              shop now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
  onClick={() => setIsMenuOpen((prev) => !prev)}
  className={`inline-flex items-center justify-center p-2 rounded-md ${textColor} ${hoverColor}`}
>
  {isMenuOpen ? (
    // X icon
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    // Hamburger icon
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )}
</button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          id="primary-mobile-menu"
          className="md:hidden backdrop-blur-md bg-white/10 border-b border-white/20"
          role="menu"
          aria-label="Mobile"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#services"
              className={`${textColor} ${hoverColor} block px-3 py-2 text-base font-medium lowercase`}
              role="menuitem"
            >
              services
            </a>
            <a
              href="#about"
              className={`${textColor} ${hoverColor} block px-3 py-2 text-base font-medium lowercase`}
              role="menuitem"
            >
              about
            </a>

            {/* Game launcher (mobile) */}
            <div className="px-3 py-2">
              <div className={textColor}>
                <GameLauncher label="play" src="https://tap-game-for-wouff.vercel.app/" />
              </div>
            </div>

            <a
              href="#contact"
              className={`${textColor} ${hoverColor} block px-3 py-2 text-base font-medium lowercase`}
              role="menuitem"
            >
              contact
            </a>
            <button
              type="button"
              className={`w-full mt-4 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 lowercase bg-white/15 border border-white/20 hover:bg-white/25 backdrop-blur-sm ${
                isLightBackground(currentBgColor)
                  ? "text-gray-800 hover:text-gray-700"
                  : "text-white hover:text-gray-100"
              }`}
            >
              shop now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
