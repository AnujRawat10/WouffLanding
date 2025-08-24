"use client";

import { useEffect, useState } from "react";
import { X, Gamepad2, ExternalLink } from "lucide-react";

export default function GameLauncher({
  label = "play",
  src = "https://tap-game-for-wouff.vercel.app/",
}: {
  label?: string;
  src?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-3 py-2 text-[15px] leading-none font-medium hover:opacity-70 transition-opacity lowercase inline-flex items-center gap-2"
      >
        <Gamepad2 className="h-4 w-4" />
        {label}
      </button>

      {!open ? null : (
        <div className="fixed inset-0 z-[999]">
          {/* dim/blur background - click outside to close */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* modal shell */}
          <div
            className="relative z-[1000] flex items-center justify-center p-2 sm:p-4"
            style={{
              paddingTop: "max(env(safe-area-inset-top),0px)",
              paddingBottom: "max(env(safe-area-inset-bottom),0px)",
            }}
          >
            {/* responsive frame (full-ish on mobile, centered on desktop) */}
            <div
              className="relative overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
              style={{
                // desktop: big centered box; mobile: almost fullscreen
                width: "min(96vw, 1100px)",
                height: "min(92svh, 820px)",
              }}
            >
              {/* top bar */}
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-2 bg-black/30 text-white">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  <span className="text-sm">Tap Game</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    New tab
                  </a>
                  <button
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-900 hover:bg-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* game */}
              <iframe
                src={src}
                title="Tap Game"
                className="h-full w-full border-0"
                loading="eager"
                onLoad={() => setLoaded(true)}
                allow="fullscreen; clipboard-write; gamepad; pointer-lock; accelerometer; gyroscope"
                referrerPolicy="no-referrer"
              />

              {/* tiny loader (only until iframe paints) */}
              {!loaded && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="rounded-full bg-white/90 px-4 py-2 text-sm text-gray-900 shadow">
                    Loading…
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 underline"
                    >
                      open in new tab
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
