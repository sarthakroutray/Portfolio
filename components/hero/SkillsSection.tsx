"use client";

import { skillGroups } from "@/lib/constants";
import { normalize } from "@/lib/utils";

interface SkillsSectionProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}

export default function SkillsSection({ selectedTag, setSelectedTag }: SkillsSectionProps) {
  return (
    <section id="skills" className="container mx-auto px-4 sm:px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h2 className="reveal-glass font-ransom text-5xl sm:text-8xl">SKILLS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <div key={group.title} className="fluid-glass reveal-glass floating-glass bg-paper-gray border-4 border-ink-black p-4 shadow-cutout">
              <h3 className="font-display text-2xl sm:text-3xl uppercase mb-4">{group.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {group.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedTag(item)}
                    className={`bg-white border-2 border-ink-black p-3 text-left font-mono text-xs sm:text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:-translate-y-1 hover:-translate-x-1 transition-all ${
                      selectedTag !== "all" && normalize(selectedTag) === normalize(item)
                        ? "bg-sharpie-blue text-white"
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
