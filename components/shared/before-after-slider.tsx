"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { SiteImage as SiteImageData } from "@/data/images";
import { SiteImage } from "@/components/shared/site-image";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  before: SiteImageData;
  after: SiteImageData;
  /** Accessible name for the slider, for example the room or project. */
  label: string;
  className?: string;
  sizes?: string;
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export function BeforeAfterSlider({
  before,
  after,
  label,
  className,
  sizes,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function moveTo(clientX: number) {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragging.current) moveTo(event.clientX);
  }

  function stopDragging() {
    dragging.current = false;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 5;
    const next: Record<string, number> = {
      ArrowLeft: position - step,
      ArrowDown: position - step,
      ArrowRight: position + step,
      ArrowUp: position + step,
      Home: 0,
      End: 100,
    };
    if (event.key in next) {
      event.preventDefault();
      setPosition(clamp(next[event.key]));
    }
  }

  return (
    <div
      ref={frameRef}
      className={cn(
        "relative aspect-[16/10] cursor-ew-resize touch-pan-y overflow-hidden rounded-xl select-none",
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <SiteImage
        image={before}
        className="absolute inset-0"
        sizes={sizes}
        pendingLabel="Before photo"
        placement="start"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <SiteImage
          image={after}
          className="absolute inset-0"
          sizes={sizes}
          pendingLabel="After photo"
          placement="end"
        />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
        Before
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(15,23,42,0.35)]"
        style={{ left: `${position}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Before and after comparison: ${label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)} percent showing the before view`}
        onKeyDown={handleKeyDown}
        className="absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-lg ring-4 ring-white/40 outline-none focus-visible:ring-brand/60"
        style={{ left: `${position}%` }}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        <ChevronRight className="size-4" aria-hidden="true" />
      </div>
    </div>
  );
}
