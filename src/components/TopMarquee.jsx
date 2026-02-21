function TopMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-b-4 border-ink-black py-3 bg-paper-gray">
      <div className="whitespace-nowrap animate-marquee flex gap-12 items-center font-bold">
        <span className="text-ink-black text-2xl font-mono uppercase tracking-tighter">
          <span className="bg-black text-white px-2">WARNING:</span> Heavy
          construction ahead /// Breaking patterns ///
        </span>
        <span className="text-sharpie-blue text-2xl font-marker uppercase tracking-widest">
          CODING IS PUNK ROCK
        </span>
        <span className="text-ink-black text-2xl font-mono uppercase tracking-tighter">
          <span className="bg-black text-white px-2">WARNING:</span> Heavy
          construction ahead /// Breaking patterns ///
        </span>
        <span className="text-sharpie-blue text-2xl font-marker uppercase tracking-widest">
          CODING IS PUNK ROCK
        </span>
      </div>
    </div>
  );
}

export default TopMarquee;
