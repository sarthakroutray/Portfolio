export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-paper">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-ink-black border-t-sharpie-blue rounded-full animate-spin" />
        <p className="font-mono text-lg text-ink-black animate-pulse">Loading portfolio...</p>
      </div>
    </div>
  );
}
