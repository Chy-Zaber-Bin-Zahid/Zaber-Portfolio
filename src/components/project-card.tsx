/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";

function AutoScrollImage({ src, alt, isHovered }: { src: string; alt: string; isHovered: boolean }) {
  const [imageError, setImageError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const stop = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };

    stop();

    if (isHovered) {
      // Pick up from wherever the return animation left off, so re-entering
      // the card never snaps the image.
      let scrollPos = scrollContainer.scrollTop;
      const scrollSpeed = 0.8;

      const animate = () => {
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        if (maxScroll <= 0) return;
        scrollPos += scrollSpeed;
        if (scrollPos >= maxScroll) {
          scrollPos = 0;
        }
        scrollContainer.scrollTop = scrollPos;
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Ease back to the top instead of snapping there.
      const from = scrollContainer.scrollTop;
      if (from <= 0) return;

      const duration = Math.min(700, Math.max(250, from / 1.5));
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      let startTime: number | undefined;

      const animate = (now: number) => {
        if (startTime === undefined) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        scrollContainer.scrollTop = from * (1 - easeOutCubic(progress));
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          animationRef.current = undefined;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return stop;
  }, [isHovered]);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <div
      ref={scrollRef}
      className="overflow-hidden h-48"
    >
      <img
        src={src}
        alt={alt}
        className="w-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  scrollableImage?: boolean;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  scrollableImage,
  links,
  className,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-muted transition-all duration-200",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative shrink-0 group">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover"
            />
          ) : image ? (
            scrollableImage ? (
              <AutoScrollImage src={image} alt={title} isHovered={isHovered} />
            ) : (
              <ProjectImage src={image} alt={title} />
            )
          ) : (
            <div className="w-full h-48 bg-muted" />
          )}
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
