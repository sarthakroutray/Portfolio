function ProjectsSection({
  projects,
  filteredProjects,
  projectFilterTags,
  selectedTag,
  setSelectedTag,
  expandedProjects,
  toggleProjectExpansion,
}) {
  return (
    <section id="projects" className="container mx-auto px-6 py-24 bg-dark-paper relative">
      <div className="flex flex-col md:flex-row items-end justify-between mb-8 pb-4 border-b-4 border-dashed border-ink-black gap-4">
        <h2 className="text-7xl sm:text-9xl font-ransom text-ink-black tracking-tighter leading-none mix-blend-overlay opacity-80">
          THE
          <br />
          WORK
        </h2>
        <div className="relative bg-white p-4 border-2 border-ink-black transform rotate-2 shadow-[4px_4px_0px_0px_#0022cc]">
          <span className="absolute -top-3 -right-3 w-8 h-8 bg-sharpie-blue rounded-full" />
          <p className="font-marker text-sharpie-blue text-xl">"Stuff I actually built"</p>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3 items-center">
        {projectFilterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 border-2 border-ink-black font-mono text-xs uppercase transition-colors ${
              selectedTag === tag
                ? "bg-ink-black text-white"
                : "bg-paper-gray hover:bg-sharpie-blue hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
        <button
          onClick={() => setSelectedTag("all")}
          className="px-4 py-2 border-2 border-ink-black bg-white font-mono text-xs uppercase hover:bg-ink-black hover:text-white ml-2"
        >
          Reset Project Filter
        </button>
        <span className="font-mono text-sm ml-2">
          showing {filteredProjects.length}/{projects.length}
        </span>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="bg-white border-4 border-ink-black p-8 font-mono text-lg">
          No project matches this filter. Try another tag.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {filteredProjects.map((project, index) => {
            const isExpanded = !!expandedProjects[project.name];
            const shortDescription =
              project.description.length > 155
                ? `${project.description.slice(0, 155)}...`
                : project.description;

            return (
              <div
                key={project.name}
                className={`relative group ${index % 2 === 1 ? "mt-12 md:mt-0" : ""}`}
              >
                <div className="absolute -top-6 -left-6 w-full h-full border-4 border-ink-black bg-transparent z-0" />
                <div className="absolute -top-8 left-1/4 w-32 h-10 tape z-20 transform -rotate-2" />
                <article className="relative z-10 bg-paper-gray border-4 border-ink-black p-3 shadow-cutout transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                  <div className="bg-white border-2 border-ink-black p-4 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4 gap-3">
                      <h3 className="text-3xl font-display uppercase">{project.name}</h3>
                      <span className="text-4xl leading-none font-ransom text-sharpie-blue">
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
                          onClick={() => setSelectedTag(tag.name)}
                          className="text-[11px] px-2 py-1 border border-ink-black font-mono uppercase hover:bg-ink-black hover:text-white"
                        >
                          #{tag.name}
                        </button>
                      ))}
                    </div>

                    <div className="mt-auto pt-5 border-t-2 border-dashed border-ink-black flex justify-between items-center gap-4">
                      <button
                        onClick={() => toggleProjectExpansion(project.name)}
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
          })}
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
