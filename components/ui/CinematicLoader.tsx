"use client";

import { useMemo } from "react";

const SQUARE_COUNT = 12;
const SPEED = 0.35;

export function CinematicLoader() {
  const squares = useMemo(
    () =>
      Array.from({ length: SQUARE_COUNT }, (_, i) => {
        const index = i + 1;
        const hue = (index * 360) / SQUARE_COUNT;
        return {
          id: index,
          padding: index * 10,
          offset: index * -10,
          color: `hsl(${260 + hue / 3}, 80%, 60%)`,
          delay: i * 0.1,
        };
      }),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${3 + Math.random() * 4}s`,
        delay: `${Math.random() * 3}s`,
      })),
    []
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "radial-gradient(ellipse at center, #0a0014 0%, #000000 100%)",
        overflow: "hidden",
        zIndex: 9999,
      }}
      role="status"
      aria-label="Loading"
    >
      <style>{`
        @keyframes loader-magic {
          0% { transform: scale(0) rotate(0deg); filter: blur(0px); }
          50% { transform: scale(1) rotate(90deg); filter: blur(0.5px); }
          100% { transform: scale(2) rotate(180deg); filter: blur(1px); }
        }

        @keyframes loader-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        .loader-square {
          animation: loader-magic calc(2s / var(--speed, 1)) ease infinite alternate;
          animation-delay: var(--delay);
          transform-origin: center;
          will-change: transform;
        }
      `}</style>

      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              width: "2px",
              height: "2px",
              backgroundColor: "#a855f7",
              borderRadius: "50%",
              left: star.left,
              top: star.top,
              animation: `loader-glow ${star.duration} ease-in-out infinite`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ position: "relative" }}>
          {squares.map((square) => (
            <div
              key={square.id}
              className="loader-square"
              style={{
                position: "absolute",
                boxSizing: "content-box",
                padding: `${square.padding}px`,
                top: `${square.offset}px`,
                left: `${square.offset}px`,
                border: `1px solid ${square.color}`,
                boxShadow: `0 0 3px ${square.color}, inset 0 0 3px rgba(255, 255, 255, 0.1)`,
                borderRadius: "2px",
                ["--delay" as string]: `${square.delay}s`,
                ["--speed" as string]: SPEED,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
