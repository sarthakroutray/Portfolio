import { motion } from "framer-motion";

const TerminalMockup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-8 right-8 w-[420px] bg-black/80 backdrop-blur-md border border-neon-green/30 rounded-lg overflow-hidden shadow-2xl shadow-neon-green/20 hidden lg:block"
    >
      {/* Terminal Header */}
      <div className="bg-black/60 px-4 py-2 flex items-center justify-between border-b border-neon-green/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-white/60 text-xs ml-2">SARTHAK_CLI</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-neon-green">›</span>
          <span className="text-white/80">npm install sarthak-skills</span>
        </div>
        
        <div className="text-white/60 text-xs mb-3">
          Installing packages...
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neon-green">✓</span>
            <span className="text-white/70">React</span>
            <span className="text-neon-green ml-auto">✓</span>
            <span className="text-white/70">Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neon-green">✓</span>
            <span className="text-white/70">Python</span>
            <span className="text-neon-green ml-auto">✓</span>
            <span className="text-white/70">UI/UX</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50">~</span>
            <span className="text-white/50">...</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="text-white/50">
            <span className="text-white/70">LOCATION:</span> 20.0130° N
          </div>
        </div>
        <div className="text-xs text-white/50">
          <span className="text-white/70">STATUS:</span> OPEN TO WORK
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalMockup;
