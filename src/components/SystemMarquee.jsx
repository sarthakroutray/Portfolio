function SystemMarquee() {
  return (
    <div className="w-full border-y-4 border-ink-black py-4 bg-ink-black text-paper-gray font-mono overflow-hidden transform -skew-y-1 origin-left">
      <div className="whitespace-nowrap flex gap-16 animate-marquee">
        <span className="text-2xl font-bold font-ransom tracking-widest">
          SYSTEM_FAILURE /// REBOOTING
        </span>
        <span className="text-2xl font-bold font-mono">compiling_assets...</span>
        <span className="text-2xl font-bold font-ransom tracking-widest">
          SYSTEM_FAILURE /// REBOOTING
        </span>
        <span className="text-2xl font-bold font-mono">compiling_assets...</span>
      </div>
    </div>
  );
}

export default SystemMarquee;
