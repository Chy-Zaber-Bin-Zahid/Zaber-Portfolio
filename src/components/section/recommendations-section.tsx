/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { DATA } from "@/data/resume";
import { Quote, ChevronDown, ChevronUp } from "lucide-react";

const PREVIEW_CHARS = 280;

function RecommendationCard({
  recommendation,
}: {
  recommendation: (typeof DATA.recommendations)[number];
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = recommendation.message.length > PREVIEW_CHARS;
  const displayText =
    expanded || !isLong
      ? recommendation.message
      : recommendation.message.slice(0, PREVIEW_CHARS).trimEnd() + "…";

  return (
    <div className="relative border bg-card rounded-xl p-6 ring-2 ring-border/20 shadow-sm flex flex-col gap-4">
      <Quote className="absolute top-4 right-4 size-6 text-muted-foreground/30" />
      <div className="flex items-start gap-3">
        {recommendation.avatarUrl ? (
          <img
            src={recommendation.avatarUrl}
            alt={recommendation.name}
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

export default function RecommendationsSection() {
  return (
    <section id="recommendations">
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
              Recommendations from mentors, clients, and colleagues I&apos;ve
              had the pleasure of working with.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[800px] mx-auto w-full">
          {DATA.recommendations.map((rec) => (
            <RecommendationCard key={rec.name} recommendation={rec} />
          ))}
        </div>
      </div>
    </section>
  );
}
