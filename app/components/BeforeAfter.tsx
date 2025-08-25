"use client";

import Image, { StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import beforeImg from "@/public/beforeafter/before.png";
import afterImg from "@/public/beforeafter/after.png";

type Props = {
  beforeSrc?: StaticImageData | string;
  afterSrc?: StaticImageData | string;
  altBefore?: string;
  altAfter?: string;
  /** initial slider position in % (0–100). Default: 50 */
  initial?: number;
  /** Optional labels shown in the corners */
  labelBefore?: string;
  labelAfter?: string;
  /**
   * Extra classes for sizing/spacing (max-w, aspect, margins).
   * Base classes (relative, overflow-hidden, etc.) are always applied.
   */
  className?: string;
  /** Pass true if you want Next to preload these images */
  priority?: boolean;
};

export default function BeforeAfter({
  beforeSrc = beforeImg,
  afterSrc = afterImg,
  altBefore = "Before",
  altAfter = "After",
  initial = 50,
  labelBefore = "Before",
  labelAfter = "After",
  className = "",
  priority,
}: Props) {
  // Always keep the required base classes; you can add layout classes via `className`
  const containerClass =
    `relative overflow-hidden rounded-2xl shadow-lg w-full ` +
    // default aspect if you don't pass one
    `aspect-[16/10] ` +
    // sane max height so it never goes off-screen
    `max-h-[75vh] ` +
    (className || "");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(() => Math.min(100, Math.max(0, initial)));
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPct(Number(((x / rect.width) * 100).toFixed(2)));
  }, []);

  // Pointer events
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => (dragging.current = false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX]);

  // Keep position on resize
  useEffect(() => {
    const r = new ResizeObserver(() => setPct((p) => p));
    if (containerRef.current) r.observe(containerRef.current);
    return () => r.disconnect();
  }, []);

  const handlePointerDown: React.PointerEventHandler = (e) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPct((p) => Math.max(0, p - 2));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPct((p) => Math.min(100, p + 2));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPct(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPct(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={containerClass}
      aria-label="Before and after comparison"
      // improves mobile dragging without scrolling the page
      style={{ touchAction: "none" }}
    >
      {/* Before (bottom) */}
      <Image
        src={beforeSrc}
        alt={altBefore}
        fill
        priority={priority}
        className="object-cover select-none"
        sizes="100vw"
        draggable={false}
      />

      {/* After (top, clipped by width) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pct}%` }}
        aria-hidden
      >
        <Image
          src={afterSrc}
          alt={altAfter}
          fill
          priority={priority}
          className="object-cover select-none"
          sizes="100vw"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `calc(${pct}% - 1px)`, width: 2 }}
      >
        <div className="h-full bg-white/80 mix-blend-difference" />
      </div>

      {/* Draggable handle */}
      <button
        type="button"
        role="slider"
        aria-label="Comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        className="absolute top-1/2 -translate-y-1/2 z-10 grid place-items-center h-10 w-10 rounded-full bg-white/90 text-gray-800 shadow-lg border border-black/10 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
        style={{ left: `calc(${pct}% - 20px)` }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 12l4-4v8l-4-4zm4 0l4-4v8l-4-4z" fill="currentColor" />
        </svg>
      </button>

      {/* Corner labels */}
      {labelBefore ? (
        <span className="absolute left-2 bottom-2 rounded-md bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur">
          {labelBefore}
        </span>
      ) : null}
      {labelAfter ? (
        <span className="absolute right-2 bottom-2 rounded-md bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur">
          {labelAfter}
        </span>
      ) : null}

      {/* Make the whole area draggable too */}
      <div
        className="absolute inset-0 cursor-col-resize"
        onPointerDown={handlePointerDown}
      />
    </div>
  );
}
