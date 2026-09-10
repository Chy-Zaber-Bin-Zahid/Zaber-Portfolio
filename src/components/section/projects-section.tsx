import { useState } from "react";
import { ProjectCard, type ProjectCardProps } from "@/components/project-card";
import { ChevronDown, ChevronUp } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;
const INITIAL_COUNT = 4;

export type ProjectItem = Omit<ProjectCardProps, "className">;

interface ProjectsSectionProps {
  projects: readonly ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">
              My Projects
            </span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Check out my latest work
          </h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
            I&apos;ve worked on a variety of projects, from simple websites to
            complex web applications. Here are a few of my favorites.
          </p>
        </div>
      </div>
      {/* Masonry via CSS multi-column: each card keeps its natural height and
          columns pack tightly. Cards flow top-to-bottom per column. */}
      <div className="w-full columns-1 gap-3 sm:columns-2">
        {visibleProjects.map((project, id) => (
          <div
            key={project.title}
            className="mb-3 break-inside-avoid animate-blur-fade"
            style={{
              animationDelay: `${0.04 + BLUR_FADE_DELAY * 12 + id * 0.05}s`,
            }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border bg-card/90 backdrop-blur-3xl px-5 py-2 text-sm font-medium text-foreground shadow-[0_0_10px_3px] shadow-primary/5 hover:bg-muted transition-colors cursor-pointer"
          >
            {expanded ? (
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
