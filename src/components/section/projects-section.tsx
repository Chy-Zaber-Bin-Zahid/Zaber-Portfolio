"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronUp } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;
const INITIAL_COUNT = 4;

export default function ProjectsSection() {
    const [expanded, setExpanded] = useState(false);
    const projects = DATA.projects;
    const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_COUNT);
    const hasMore = projects.length > INITIAL_COUNT;

    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-8">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <div className="flex items-center w-full">
                        <div
                            className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent"

                        />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                            <span className="text-background text-sm font-medium">My Projects</span>
                        </div>
                        <div
                            className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent"

                        />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Check out my latest work</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                            I&apos;ve worked on a variety of projects, from simple
                            websites to complex web applications. Here are a few of my
                            favorites.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 w-full mx-auto auto-rows-fr">
                    {visibleProjects.map((project, id) => (
                        <BlurFade
                            key={project.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            className="h-full"
                        >
                            <ProjectCard
                                href={project.href}
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                dates={project.dates}
                                tags={project.technologies}
                                image={project.image}
                                video={project.video}
                                scrollableImage={project.scrollableImage}
                                links={project.links}
                            />
                        </BlurFade>
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
        </section>
    );
}
