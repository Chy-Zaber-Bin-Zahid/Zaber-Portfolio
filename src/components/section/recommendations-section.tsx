import { useState } from "react";
import {
  Quote,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PREVIEW_CHARS = 280;

export interface Recommendation {
  name: string;
  avatarUrl: string;
  title: string;
  relationship: string;
  date: string;
  message: string;
}

interface RecommendationsSectionProps {
  recommendations: readonly Recommendation[];
}

function RecommendationCard({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = recommendation.message.length > PREVIEW_CHARS;
  const displayText =
    expanded || !isLong
      ? recommendation.message
      : recommendation.message.slice(0, PREVIEW_CHARS).trimEnd() + "…";

  return (
    <div className="relative border bg-card rounded-xl p-6 ring-2 ring-border/20 shadow-sm flex flex-col gap-4 h-full">
      <Quote className="absolute top-4 right-4 size-6 text-muted-foreground/30" />
      <div className="flex items-start gap-3">
        {recommendation.avatarUrl ? (
          <img
            src={recommendation.avatarUrl}
            alt={recommendation.name}
            loading="lazy"
            className="size-12 rounded-full border ring-2 ring-border object-cover flex-none"
          />
        ) : (
          <div className="size-12 rounded-full border ring-2 ring-border bg-muted flex-none flex items-center justify-center text-sm font-semibold text-muted-foreground">
            {recommendation.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
        <div className="flex flex-col gap-1 min-w-0 flex-1 pr-6">
          <h3 className="font-semibold leading-tight">{recommendation.name}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {recommendation.title}
          </p>
          <p className="text-xs text-muted-foreground/80 mt-1">
            {recommendation.date} · {recommendation.relationship}
          </p>
        </div>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
        {displayText}
      </div>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="self-start inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline cursor-pointer"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="size-3" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="size-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  const [index, setIndex] = useState(0);
  const total = recommendations.length;

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">
              Recommendations
            </span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            What people say about me
          </h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
            Recommendations from mentors, clients, and colleagues I&apos;ve had
            the pleasure of working with.
          </p>
        </div>
      </div>

      <div className="relative w-full mx-auto">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {recommendations.map((rec) => (
              <div key={rec.name} className="w-full shrink-0 px-1">
                <RecommendationCard recommendation={rec} />
              </div>
            ))}
          </div>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous recommendation"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/3 size-10 rounded-full border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5 flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer z-10"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next recommendation"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-1/3 size-10 rounded-full border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5 flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer z-10"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-2">
          {recommendations.map((rec, i) => (
            <button
              key={rec.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to recommendation ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === index
                  ? "w-6 bg-foreground"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
