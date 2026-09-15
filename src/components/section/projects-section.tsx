import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;
const INITIAL_COUNT = 4;

const linkIcons = {
  globe: Icons.globe,
  github: Icons.github,
} as const;

export type ProjectLinkIcon = keyof typeof linkIcons;

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  srcSet?: string;
}

export interface ProjectItem {
  title: string;
  href?: string;
  /** First sentence of the description, always visible. */
  summary: string;
  /** Rest of the description as pre-rendered HTML (may be empty). */
  detailsHtml: string;
  dates: string;
  tags: readonly string[];
  /** Optional screenshot, shown inside the details panel. */
  image?: ProjectImage | null;
  links?: readonly {
    icon: ProjectLinkIcon;
    type: string;
    href: string;
  }[];
}

interface ProjectsSectionProps {
  projects: readonly ProjectItem[];
}

/**
 * Screenshot in a fixed-height frame. Long, full-page captures scroll slowly
 * while hovered and ease back to the top afterwards.
 */
function Screenshot({ image, alt }: { image: ProjectImage; alt: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const frameId = useRef<number | undefined>(undefined);
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const stop = () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      frameId.current = undefined;
    };
    stop();

    if (hovered) {
      let position = frame.scrollTop;
      const step = () => {
        const max = frame.scrollHeight - frame.clientHeight;
        if (max <= 0) return;
        position = position + 0.8 >= max ? 0 : position + 0.8;
        frame.scrollTop = position;
        frameId.current = requestAnimationFrame(step);
      };
      frameId.current = requestAnimationFrame(step);
    } else {
      const from = frame.scrollTop;
      if (from > 0) {
        const duration = Math.min(700, Math.max(250, from / 1.5));
        let start: number | undefined;
        const step = (now: number) => {
          start ??= now;
          const t = Math.min((now - start) / duration, 1);
          frame.scrollTop = from * (1 - (1 - (1 - t) ** 3));
          if (t < 1) frameId.current = requestAnimationFrame(step);
        };
        frameId.current = requestAnimationFrame(step);
      }
    }
    return stop;
  }, [hovered]);

  if (failed) return null;

  return (
    <div
      ref={frameRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mt-4 h-56 overflow-hidden rounded-lg border border-border bg-muted sm:h-72"
    >
      <img
        src={image.src}
        srcSet={image.srcSet}
        alt={alt}
        width={image.width || undefined}
        height={image.height || undefined}
        loading="lazy"
        decoding="async"
        className="h-auto w-full"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function ProjectRow({
  project,
  open,
  onToggle,
  delay,
}: {
  project: ProjectItem;
  open: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const panelId = useId();
  // Only fetch the screenshot once someone actually opens the details.
  const [hasOpened, setHasOpened] = useState(open);
  useEffect(() => {
    if (open) setHasOpened(true);
  }, [open]);

  const hasDetails = Boolean(project.detailsHtml || project.image);

  return (
    <li
      className="animate-blur-fade overflow-hidden rounded-xl border border-border bg-card ring-2 ring-border/20 transition-colors hover:bg-muted/20"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="p-4 sm:p-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="font-semibold leading-tight">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/title inline-flex items-center gap-1 underline-offset-4 hover:underline"
                >
                  {project.title}
                  <ArrowUpRight
                    className="size-3.5 text-muted-foreground opacity-0 -translate-x-1 transition-all duration-200 group-hover/title:translate-x-0 group-hover/title:opacity-100"
                    aria-hidden
                  />
                </a>
              ) : (
                project.title
              )}
            </h3>
            <span className="text-xs tabular-nums text-muted-foreground">
              {project.dates}
            </span>
          </div>

          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          {project.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex h-6 items-center rounded-md border border-border px-2 text-[11px] font-medium text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {project.links?.map((link) => {
              const Icon = linkIcons[link.icon];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Icon className="size-3.5" aria-hidden />
                  {link.type}
                </a>
              );
            })}
            {hasDetails && (
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={panelId}
                className="ml-auto inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {open ? "Hide details" : "Details"}
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    open && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {hasDetails && (
        <div
          id={panelId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border px-4 pb-5 pt-4 sm:px-5">
              {project.detailsHtml && (
                <div
                  className="prose max-w-full text-pretty font-sans text-sm leading-relaxed text-muted-foreground dark:prose-invert [&_p]:my-0"
                  dangerouslySetInnerHTML={{ __html: project.detailsHtml }}
                />
              )}
              {project.image && hasOpened && (
                <Screenshot image={project.image} alt={`${project.title} screenshot`} />
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="flex w-full items-center">
          <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="z-10 rounded-xl border bg-primary px-4 py-1">
            <span className="text-sm font-medium text-background">My Projects</span>
          </div>
          <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Check out my latest work
          </h2>
          <p className="text-balance text-center text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
            I&apos;ve worked on a variety of projects, from simple websites to
            complex web applications. Here are a few of my favorites.
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {visibleProjects.map((project, index) => (
          <ProjectRow
            key={project.title}
            project={project}
            open={openTitle === project.title}
            onToggle={() =>
              setOpenTitle((current) => (current === project.title ? null : project.title))
            }
            delay={0.04 + BLUR_FADE_DELAY * 12 + Math.min(index, INITIAL_COUNT) * 0.05}
          />
        ))}
      </ul>

      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border bg-card/90 px-5 py-2 text-sm font-medium text-foreground shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl transition-colors hover:bg-muted"
          >
            {showAll ? (
              <>
                Show less
                <ChevronUp className="size-4" />
              </>
            ) : (
              <>
                See more ({projects.length - INITIAL_COUNT})
                <ChevronDown className="size-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
