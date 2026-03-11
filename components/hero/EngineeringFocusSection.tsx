"use client";

import { engineeringFocuses } from "@/lib/constants";
import { normalize } from "@/lib/utils";
import { useState } from "react";

export default function EngineeringFocusSection() {
  const [selectedFocus, setSelectedFocus] = useState("");

  return (
    <section id="engineering-focus" className="container mx-auto px-4 sm:px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="reveal-glass font-ransom text-5xl sm:text-8xl mb-8">ENGINEERING FOCUS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {engineeringFocuses.map((focus) => (
            <button
              key={focus}
              onClick={() => setSelectedFocus(focus)}
              className={`fluid-glass reveal-glass bg-white border-2 border-ink-black p-5 text-left font-mono text-base sm:text-lg font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:-translate-y-1 hover:-translate-x-1 transition-all ${
                selectedFocus && normalize(selectedFocus) === normalize(focus)
                  ? "bg-sharpie-blue text-white"
                  : ""
              }`}
            >
              {focus}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
