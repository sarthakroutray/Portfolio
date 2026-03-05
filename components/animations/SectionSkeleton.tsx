export default function SectionSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <div className={`${height} w-full animate-pulse`}>
      <div className="container mx-auto px-6 py-12">
        <div className="h-12 w-48 bg-ink-black/10 rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-ink-black/10 rounded border-2 border-ink-black/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
