import React from 'react';

const TerminalSkills = () => {
  return (
    <div className="fixed bottom-24 right-8 hidden lg:block w-72 z-40">
      <div className="relative group">
        {/* Brutalist Shadow Border */}
        <div className="absolute -top-2 -left-2 w-full h-full border border-primary/30 z-0"></div>
        
        {/* Terminal Window */}
        <div className="relative bg-surface-dark border border-white/20 overflow-hidden flex flex-col p-4 shadow-brutalist shadow-primary/20">
          {/* Terminal Header */}
          <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-primary/80"></div>
            </div>
            <span className="font-mono text-[10px] text-gray-500 uppercase">
              sarthak.sh
            </span>
          </div>

          {/* Terminal Content */}
          <div className="font-mono text-[11px] space-y-1.5">
            <p className="text-primary">&gt; npm install sarthak-skills</p>
            <p className="text-gray-500">Installing packages...</p>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-1 text-white/70">
              <p className="flex items-center">
                <span className="text-primary mr-1">✔</span> React
              </p>
              <p className="flex items-center">
                <span className="text-primary mr-1">✔</span> Node
              </p>
              <p className="flex items-center">
                <span className="text-primary mr-1">✔</span> Python
              </p>
              <p className="flex items-center">
                <span className="text-primary mr-1">✔</span> UI/UX
              </p>
            </div>

            {/* Cursor */}
            <p className="text-primary/50">
              &gt; <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalSkills;
