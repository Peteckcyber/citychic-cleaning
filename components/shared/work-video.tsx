"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Pause, Play } from "lucide-react";

import type { WorkVideo as WorkVideoData } from "@/data/images";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "playing" | "buffering" | "paused";

/**
 * Autoplaying, muted, looping job video.
 * - Starts downloading only when it comes near the viewport, then streams as it buffers.
 * - Shows the poster blurred with a spinner until playback starts, and again whenever it
 *   stalls to buffer, then sharpens once frames are flowing.
 * - Pauses when scrolled out of view, and never autoplays for reduced-motion users.
 */
export function WorkVideo({ video, className }: { video: WorkVideoData; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [inView, setInView] = useState(false);
  const [loadRequested, setLoadRequested] = useState(false);
  const userPaused = useRef(false);

  // Watch visibility: start loading a little before the video scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setLoadRequested(true);
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play while visible, pause when off screen, unless the viewer paused it themselves.
  useEffect(() => {
    const el = ref.current;
    if (!el || !loadRequested) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (inView && !reducedMotion && !userPaused.current) {
      el.play().catch(() => setStatus("paused"));
    } else if (!inView) {
      el.pause();
    }
  }, [inView, loadRequested]);

  function togglePlayback() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => setStatus("paused"));
    } else {
      userPaused.current = true;
      el.pause();
    }
  }

  const blurred = status !== "playing" && status !== "paused";
  const showSpinner = status === "loading" || status === "buffering";

  return (
    <div className={cn("relative isolate overflow-hidden bg-ink", className)}>
      {/* Blurred poster underneath: visible while loading or buffering. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={video.poster}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full scale-110 object-cover blur-xl transition-opacity duration-700",
          blurred ? "opacity-100" : "opacity-0",
        )}
      />

      <video
        ref={ref}
        src={loadRequested ? video.src : undefined}
        poster={video.poster}
        width={video.width}
        height={video.height}
        muted
        loop
        playsInline
        preload={loadRequested ? "auto" : "none"}
        aria-label={video.label}
        onLoadStart={() => setStatus("loading")}
        // Ready but not playing (reduced motion, or autoplay refused): drop the spinner.
        onCanPlay={(event) => {
          if (event.currentTarget.paused) setStatus("paused");
        }}
        onWaiting={() => setStatus("buffering")}
        onStalled={() => setStatus((s) => (s === "playing" ? "buffering" : s))}
        onPlaying={() => setStatus("playing")}
        onPause={() => setStatus("paused")}
        className={cn(
          "relative size-full object-cover transition-[filter,opacity] duration-700",
          blurred ? "opacity-0 blur-md" : "opacity-100 blur-0",
        )}
      />

      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center" role="status">
          <span className="flex size-14 items-center justify-center rounded-full bg-ink/40 text-white backdrop-blur-sm">
            <LoaderCircle className="size-7 animate-spin" aria-hidden="true" />
          </span>
          <span className="sr-only">
            {status === "buffering" ? "Video buffering" : "Video loading"}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={status === "paused" ? "Play video" : "Pause video"}
        className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-full bg-ink/50 text-white backdrop-blur-sm transition-colors hover:bg-ink/70 focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:outline-none"
      >
        {status === "paused" ? (
          <Play className="size-4" aria-hidden="true" />
        ) : (
          <Pause className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
