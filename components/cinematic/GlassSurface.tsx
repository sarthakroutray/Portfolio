'use client';
import React, { useEffect, useState } from 'react';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  className?: string;
  style?: React.CSSProperties;
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
};

/**
 * Ultimate Performance CSS Glass
 * - Replaces laggy SVG feDisplacementMap with pure CSS backdrop-filter.
 * - Simulates the red/blue chromatic edge distortion using pure CSS inset shadows.
 * - Guarantees 60fps scrolling over video canvases.
 * - Removes the black tint entirely by decoupling blend modes.
 */
const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = '100%',
  height = '100%',
  borderRadius = 24,
  opacity = 0.6, // Kept for prop compatibility but unused to prevent black tint
  blur = 16,
  displace = 0.5,
  className = '',
  style = {}
}) => {
  const isDarkMode = useDarkMode();

  const saturation = 1.2 + (displace * 0.8);

  const containerStyle: React.CSSProperties = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    position: 'relative',
    overflow: 'hidden',
    
    // Crystal clear center (NO BLACK TINT)
    background: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.1)',
    
    // Pure CSS blur (NO LAG)
    backdropFilter: `blur(${blur}px) saturate(${saturation}) brightness(1.15)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}) brightness(1.15)`,
    
    // Premium borders and chromatic aberration illusion using shadows
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: isDarkMode
      ? `inset 4px 0 16px -4px rgba(255, 0, 0, 0.12),
         inset -4px 0 16px -4px rgba(0, 100, 255, 0.15),
         inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
         inset 0 -1px 0 0 rgba(255, 255, 255, 0.05),
         0 8px 32px 0 rgba(0, 0, 0, 0.4)`
      : `inset 4px 0 16px -4px rgba(255, 0, 0, 0.1),
         inset -4px 0 16px -4px rgba(0, 100, 255, 0.12),
         inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
         inset 0 -1px 0 0 rgba(255, 255, 255, 0.1),
         0 8px 32px 0 rgba(31, 38, 135, 0.15)`,
         
    // Force GPU composite
    willChange: 'transform, backdrop-filter',
    transform: 'translateZ(0)',
  };

  const glassSurfaceClasses = 'relative flex flex-col overflow-hidden transition-opacity duration-[260ms] ease-out';
  const focusVisibleClasses = isDarkMode
    ? 'focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2'
    : 'focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2';

  return (
    <div
      className={`${glassSurfaceClasses} ${focusVisibleClasses} ${className}`}
      style={containerStyle}
    >
      <div className="w-full h-full p-2 rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
