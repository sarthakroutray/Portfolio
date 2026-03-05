import { experiences, type ExperienceItem } from "@/lib/constants";

export default function ResumeSection() {
  return (
    <section id="resume" className="container mx-auto px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="reveal-glass font-ransom text-6xl sm:text-8xl mb-12">EXPERIENCE</h2>
        <div className="space-y-8">
          {experiences.map((experience: ExperienceItem) => (
            <article
              key={experience.title}
              className="fluid-glass reveal-glass bg-paper-gray border-4 border-ink-black p-6 shadow-cutout hover:shadow-cutout-hover transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-3xl uppercase">{experience.title}</h3>
                  <p className="font-mono font-bold">{experience.company_name}</p>
                </div>
                <span className="font-marker text-sharpie-blue text-xl">{experience.date}</span>
              </div>
              <ul className="list-disc ml-6 font-mono space-y-2">
                {experience.points.map((point: string) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
