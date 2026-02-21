function StickyNote({ stickyNotes, noteIndex, setNoteIndex }) {
  return (
    <div className="hidden md:block fixed bottom-24 right-6 lg:bottom-12 lg:right-32 z-40 group">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 tape z-50" />
      <div className="bg-yellow-300 w-44 h-44 p-4 shadow-[5px_5px_10px_rgba(0,0,0,0.5)] transform rotate-3 group-hover:rotate-0 transition-transform duration-300 flex flex-col justify-between border border-ink-black">
        <p className="font-marker text-sm text-sharpie-blue leading-snug">{stickyNotes[noteIndex].text}</p>
        <div className="text-right">
          <span className="font-mono text-[10px] text-ink-black border-t border-black pt-1 block">
            {stickyNotes[noteIndex].footer}
          </span>
          <button
            onClick={() => setNoteIndex((prev) => (prev + 1) % stickyNotes.length)}
            className="mt-2 px-2 py-1 bg-white border border-ink-black font-mono text-[10px] uppercase hover:bg-ink-black hover:text-white"
          >
            Next Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default StickyNote;
