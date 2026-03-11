export default function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="fluid-glass floating-glass reveal-glass max-w-5xl bg-paper-gray border-4 border-ink-black p-6 sm:p-10 shadow-cutout mx-auto transform rotate-[0.5deg] hover:rotate-0 transition-transform duration-300">
        <p className="font-mono text-sm uppercase tracking-[0.25em] mb-3">Introduction</p>
        <h2 className="font-display text-4xl sm:text-6xl uppercase mb-6">Overview</h2>
        <p className="font-mono text-base sm:text-lg leading-relaxed">
          I am an engineering-focused full-stack developer specializing in React, Node.js,
          TypeScript, and AI/ML system integration. I work mostly on product features where
          frontend UX, backend services, and model outputs need to behave as one system.
          <br />
          I care about API clarity, predictable releases, and architecture choices that hold up
          when products move from demos to real usage.
        </p>
      </div>
    </section>
  );
}
