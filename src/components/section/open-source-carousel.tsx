import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  GitMerge,
  GitPullRequestArrow,
  GitPullRequestClosed,
  Star,
} from "lucide-react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface OpenSourceItem {
  project: string;
  repo: string;
  repoUrl: string;
  stars: number;
  prNumber: number;
  prUrl: string;
  title: string;
  branch: string;
  status: "merged" | "open" | "closed";
  date: string;
  mergedBy: string | null;
  additions: number;
  deletions: number;
  /** Pre-rendered HTML (Markdown compiled at build time in Astro). */
  descriptionHtml: string;
  technologies: readonly string[];
}

interface Props {
  items: readonly OpenSourceItem[];
  /** Pixels per second while auto-scrolling. */
  speed?: number;
}

const STATUS = {
  merged: {
    label: "Merged",
    Icon: GitMerge,
    className:
      "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-300",
  },
  open: {
    label: "Open",
    Icon: GitPullRequestArrow,
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  },
  closed: {
    label: "Closed",
    Icon: GitPullRequestClosed,
    className: "border-border bg-muted text-muted-foreground",
  },
} as const;

const DRAG_THRESHOLD = 6;

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n);
}

function ContributionCard({ item }: { item: OpenSourceItem }) {
  const status = STATUS[item.status];
  const dateLabel =
    item.status === "merged" ? "Merged" : item.status === "open" ? "Opened" : "Closed";

  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 ring-2 ring-border/20 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 flex-none items-center justify-center rounded-full border bg-background text-foreground ring-2 ring-border">
            <Icons.github className="size-5" />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              className="truncate font-semibold leading-tight underline-offset-4 hover:underline"
            >
              {item.repo}
            </a>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="truncate">{item.project}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex flex-none items-center gap-1">
                <Star className="size-3" aria-hidden />
                {formatStars(item.stars)}
              </span>
            </span>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex flex-none items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
            status.className
          )}
        >
          <status.Icon className="size-3.5" aria-hidden />
          {status.label}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={item.prUrl}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          className="flex items-start gap-2 font-medium leading-snug underline-offset-4 hover:underline"
        >
          <span>{item.title}</span>
          <ArrowUpRight
            className="mt-0.5 size-4 flex-none text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden
          />
        </a>
        <div
          className="prose max-w-full text-pretty font-sans text-sm leading-relaxed text-muted-foreground dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
        />
      </div>

      <dl className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <dt className="sr-only">Pull request</dt>
          <dd className="font-mono tabular-nums">#{item.prNumber}</dd>
        </div>
        <div className="flex items-center gap-1">
          <dt className="sr-only">Target branch</dt>
          <dd className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] text-foreground/90">
            {item.branch}
          </dd>
        </div>
        <div className="flex items-center gap-1">
          <dt className="sr-only">Diff</dt>
          <dd className="font-mono tabular-nums">
            <span className="text-emerald-600 dark:text-emerald-400">+{item.additions}</span>{" "}
            <span className="text-red-600 dark:text-red-400">−{item.deletions}</span>
          </dd>
        </div>
        <div className="flex items-center gap-1">
          <dt>{dateLabel}</dt>
          <dd>
            {item.date}
            {item.mergedBy ? ` by ${item.mergedBy}` : ""}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-1">
        {item.technologies.map((tag) => (
          <span
            key={tag}
            className="inline-flex h-6 w-fit items-center rounded-md border border-border px-2 text-[11px] font-medium text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

/**
 * Infinite, auto-scrolling card carousel. The item list is rendered twice and
 * moved with a sub-pixel `transform` from a requestAnimationFrame loop, so the
 * motion is smooth at any speed. Pauses while hovered, focused, or dragged;
 * supports mouse/touch drag with inertia, and eased arrow buttons.
 */
export default function OpenSourceCarousel({ items, speed = 30 }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const tweenTargetRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const dragRef = useRef<{
    startX: number;
    startOffset: number;
    moved: boolean;
    lastX: number;
    lastTime: number;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Width of one copy of the list (half the track) so the offset can wrap.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let last = performance.now();
    const autoplay = !reducedMotionRef.current;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const loop = loopWidthRef.current;
      let offset = offsetRef.current;
      const target = tweenTargetRef.current;

      if (target !== null) {
        // Exponential ease toward the arrow-button target.
        offset += (target - offset) * Math.min(1, dt * 9);
        if (Math.abs(target - offset) < 0.5) {
          offset = target;
          tweenTargetRef.current = null;
        }
      } else if (dragRef.current) {
        // Position is driven by the pointer handlers.
      } else if (Math.abs(velocityRef.current) > 4) {
        // Inertia after a drag release.
        offset += velocityRef.current * dt;
        velocityRef.current *= Math.pow(0.05, dt);
      } else {
        velocityRef.current = 0;
        if (autoplay && !pausedRef.current) offset += speed * dt;
      }

      if (loop > 0) {
        if (offset >= loop) {
          offset -= loop;
          if (tweenTargetRef.current !== null) tweenTargetRef.current -= loop;
        } else if (offset < 0) {
          offset += loop;
          if (tweenTargetRef.current !== null) tweenTargetRef.current += loop;
        }
      }

      offsetRef.current = offset;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    tweenTargetRef.current = null;
    velocityRef.current = 0;
    dragRef.current = {
      startX: e.clientX,
      startOffset: offsetRef.current,
      moved: false,
      lastX: e.clientX,
      lastTime: performance.now(),
    };
    viewport.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const delta = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) > DRAG_THRESHOLD) drag.moved = true;
    if (!drag.moved) return;

    const now = performance.now();
    const dt = now - drag.lastTime;
    if (dt > 0) {
      // px per second, negative delta moves the track forward.
      velocityRef.current = (-(e.clientX - drag.lastX) / dt) * 1000;
    }
    drag.lastX = e.clientX;
    drag.lastTime = now;
    offsetRef.current = drag.startOffset - delta;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport) return;
    if (drag.moved) {
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
      // Drop stale velocity if the pointer rested before release.
      if (performance.now() - drag.lastTime > 80) velocityRef.current = 0;
      velocityRef.current = Math.max(-2400, Math.min(2400, velocityRef.current));
    } else {
      velocityRef.current = 0;
    }
    dragRef.current = null;
    if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollByCard = (direction: -1 | 1) => {
    const card = trackRef.current?.querySelector<HTMLElement>("[data-card]");
    const gap = 16;
    const amount = (card?.offsetWidth ?? 320) + gap;
    velocityRef.current = 0;
    const from = tweenTargetRef.current ?? offsetRef.current;
    tweenTargetRef.current = from + direction * amount;
  };

  const doubled = [...items, ...items];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={viewportRef}
        role="region"
        aria-label="Open source contributions"
        className="cursor-grab select-none overflow-hidden py-1 active:cursor-grabbing"
        style={{
          touchAction: "pan-y",
          maskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div ref={trackRef} className="flex w-max gap-4 will-change-transform">
          {doubled.map((item, i) => (
            <div
              key={`${item.prUrl}-${i}`}
              data-card
              aria-hidden={i >= items.length}
              className="w-[min(85vw,360px)] shrink-0"
            >
              <ContributionCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Previous contribution"
        className="absolute left-0 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-card/90 text-foreground shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl transition-colors hover:bg-muted md:-translate-x-1/3"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Next contribution"
        className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full border bg-card/90 text-foreground shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl transition-colors hover:bg-muted md:translate-x-1/3"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
