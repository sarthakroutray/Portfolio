export default function ProjectsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-ink-black border-t-sharpie-blue rounded-full animate-spin" />
        <p className="font-mono text-sm animate-pulse">Loading projects...</p>
      </div>
    </div>
  );
}
