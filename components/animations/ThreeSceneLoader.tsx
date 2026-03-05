"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { getDeviceCapability, isWebGLSupported } from "@/lib/utils";
import type { ComponentType, ReactNode } from "react";

interface ThreeLoaderProps {
  /** Dynamic import function for the Three.js scene component */
  loader: () => Promise<{ default: ComponentType<Record<string, unknown>> }>;
  /** Fallback shown while loading */
  fallback?: ReactNode;
  /** Props forwarded to the scene component */
  sceneProps?: Record<string, unknown>;
}

/**
 * Lazy-loads a Three.js scene with automatic device capability detection.
 * Falls back gracefully if WebGL is not supported.
 *
 * Usage:
 * ```tsx
 * <ThreeSceneLoader
 *   loader={() => import("@/components/three/MyScene")}
 *   sceneProps={{ particleCount: 500 }}
 * />
 * ```
 */
export default function ThreeSceneLoader({
  loader,
  fallback,
  sceneProps = {},
}: ThreeLoaderProps) {
  const [Component, setComponent] = useState<ComponentType<Record<string, unknown>> | null>(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    if (!isWebGLSupported()) {
      setWebglOk(false);
      return;
    }

    const capability = getDeviceCapability();
    const SceneComponent = lazy(loader);
    setComponent(() => (props: Record<string, unknown>) => (
      <SceneComponent {...props} deviceCapability={capability} />
    ));
  }, [loader]);

  if (!webglOk) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-paper-gray border-2 border-ink-black">
        <p className="font-mono text-sm text-ink-black">3D scene unavailable on this device.</p>
      </div>
    );
  }

  if (!Component) {
    return (
      fallback ?? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="canvas-loader" />
        </div>
      )
    );
  }

  return (
    <Suspense
      fallback={
        fallback ?? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="canvas-loader" />
          </div>
        )
      }
    >
      <Component {...sceneProps} />
    </Suspense>
  );
}
