"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type ProjectItem } from "@/lib/constants";
import { normalize } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onTagClick: (tag: string) => void;
}

function ProjectCard({ project, index, isExpanded, onToggle, onTagClick }: ProjectCardProps) {
  const shortDescription =
    project.description.length > 155 ? `${project.description.slice(0, 155)}...` : project.description;

  return (
    <div className={`relative group reveal-glass overflow-hidden sm:overflow-visible ${index % 2 === 1 ? "mt-8 md:mt-0" : ""}`}>
      <div className="absolute -top-2 -left-2 sm:-top-6 sm:-left-6 w-full h-full border-4 border-ink-black bg-transparent z-0" />
      <div className="hidden sm:block absolute -top-8 left-1/4 w-32 h-10 tape z-20 transform -rotate-2" />
      <article className="project-glass-card floating-glass fluid-glass relative z-10 bg-paper-gray border-4 border-ink-black p-3 shadow-cutout transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
        <div className="bg-white border-2 border-ink-black p-4 h-full flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
            <h3 className="text-2xl sm:text-3xl font-display uppercase break-words">{project.name}</h3>
            <span className="text-3xl sm:text-4xl leading-none font-ransom text-sharpie-blue shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mb-4 border-2 border-dashed border-ink-black bg-paper-gray/70 p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-wide">Repository Project</span>
              <span className="font-mono text-xs uppercase bg-ink-black text-white px-2 py-1">
                {project.tags.length} tags
              </span>
            </div>
          </div>

          <p className="text-ink-black font-mono text-sm leading-tight mb-4">
            {isExpanded ? project.description : shortDescription}
          </p>

          <p className="text-ink-black font-mono text-xs border-l-4 border-sharpie-blue pl-3 mb-4">
            {project.techHighlights}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <button
                key={`${project.name}-${tag.name}`}
                onClick={() => onTagClick(tag.name)}
                className="text-[11px] px-2 py-1 border border-ink-black font-mono uppercase hover:bg-ink-black hover:text-white"
              >
                #{tag.name}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-5 border-t-2 border-dashed border-ink-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onToggle}
              className="font-bold font-mono text-xs bg-paper-gray border border-ink-black px-2 py-1 uppercase hover:bg-ink-black hover:text-white"
            >
              {isExpanded ? "Less" : "More"}
            </button>
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noreferrer"
              className="text-ink-black hover:text-sharpie-blue font-bold font-mono uppercase border-b-2 border-transparent hover:border-sharpie-blue"
            >
              {project.ctaLabel} -&gt;
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

interface ProjectsSectionProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}

export default function ProjectsSection({ selectedTag, setSelectedTag }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const projectFilterTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t.name)));
    return ["all", ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTag === "all") return projects;
    const normalizedSelected = normalize(selectedTag);
    return projects.filter((project) =>
      project.tags.some((tag) => {
        const normalizedTag = normalize(tag.name);
        return normalizedTag.includes(normalizedSelected) || normalizedSelected.includes(normalizedTag);
      })
    );
  }, [selectedTag]);

  const toggleProjectExpansion = (name: string) => {
    setExpandedProjects((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-glass-card"));

    if (cards.length === 0 || prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            delay: index * 0.05,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none", once: true, invalidateOnRefresh: true },
          }
        );
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section ref={sectionRef} id="projects" className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative overflow-x-clip">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 pb-4 border-b-4 border-dashed border-ink-black gap-4">
        <h2 className="text-5xl sm:text-7xl md:text-9xl font-ransom text-ink-black tracking-tighter leading-none mix-blend-overlay opacity-80">
          THE<br />WORK
        </h2>
        <div className="fluid-glass floating-glass reveal-glass relative w-full sm:w-auto bg-white p-4 border-2 border-ink-black sm:rotate-2 shadow-[4px_4px_0px_0px_#0022cc]">
          <span className="absolute -top-3 -right-3 w-8 h-8 bg-sharpie-blue rounded-full" />
          <p className="font-marker text-sharpie-blue text-xl">&ldquo;Stuff I actually built&rdquo;</p>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3 items-center" role="group" aria-label="Project filter tags">
        {projectFilterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 border-2 border-ink-black font-mono text-xs uppercase transition-colors ${
              selectedTag === tag ? "bg-ink-black text-white" : "bg-paper-gray hover:bg-sharpie-blue hover:text-white"
            }`}
            aria-pressed={selectedTag === tag}
          >
            {tag}
          </button>
        ))}
        <button
          onClick={() => setSelectedTag("all")}
          className="px-4 py-2 border-2 border-ink-black bg-white font-mono text-xs uppercase hover:bg-ink-black hover:text-white mt-2 sm:mt-0"
        >
          Reset Project Filter
        </button>
        <span className="font-mono text-sm sm:ml-2 w-full sm:w-auto">
          showing {filteredProjects.length}/{projects.length}
        </span>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="bg-white border-4 border-ink-black p-8 font-mono text-lg">
          No project matches this filter. Try another tag.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              isExpanded={!!expandedProjects[project.name]}
              onToggle={() => toggleProjectExpansion(project.name)}
              onTagClick={setSelectedTag}
            />
          ))}
        </div>
      )}
    </section>
  );
}
