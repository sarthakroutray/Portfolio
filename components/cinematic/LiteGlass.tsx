'use client';
import React from 'react';

interface LiteGlassProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  borderRadius?: number;
  tint?: string; // Kept for compatibility but ignored to keep it neutral
}

/**
 * Performance-optimised glass surface.
 * Uses a single CSS backdrop-filter + layered box-shadow instead of
 * the expensive SVG displacement-map path, so it composes in one GPU pass
 * regardless of how many instances are on screen.
 */
const LiteGlass: React.FC<LiteGlassProps> = ({
  children,
  className = '',
  style = {},
  borderRadius = 24,
}) => {
  const containerStyle: React.CSSProperties = {
    borderRadius: `${borderRadius}px`,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: `
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
      inset 0 0 20px rgba(255, 255, 255, 0.02),
      0 8px 32px 0 rgba(0, 0, 0, 0.3)
    `,
    willChange: 'transform',
    ...style,
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={containerStyle}
    >
      {/* Subtle top-edge shine */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${borderRadius}px`,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, rgba(255,255,255,0.02) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default LiteGlass;
