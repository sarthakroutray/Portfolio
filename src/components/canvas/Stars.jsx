import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = ({ numStars = 5000, mouseX = 0, mouseY = 0, isMobile = false, ...props }) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(numStars), { radius: 1.2 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10 + mouseY * 0.5;
      ref.current.rotation.y -= delta / 15 + mouseX * 0.5;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} ref={ref}>
      <Points positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={isMobile ? 0.008 : 0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      {!isMobile && <Planets />}
    </group>
  );
};

const Planet = ({ size, color, speed, orbitRadius, orbitSpeed }) => {
  const ref = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.5;
      ref.current.rotation.y += delta * speed;
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * orbitSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh 
        ref={ref} 
        position={[orbitRadius, 0, 0]}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial 
          color={color}
          wireframe={true}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
      <mesh position={[orbitRadius, 0, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[size * 1.5, size * 2.2, 32]} />
        <meshBasicMaterial 
          color={color}
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

const Planets = () => {
  return (
    <group>
      <Planet 
        size={0.15} 
        color="#a67c52" 
        speed={0.3}
        orbitRadius={1.5}
        orbitSpeed={0.15}
      />
      <Planet 
        size={0.12} 
        color="#8b9dc3" 
        speed={0.2}
        orbitRadius={2.2}
        orbitSpeed={0.1}
      />
      <Planet 
        size={0.11} 
        color="#9b7653" 
        speed={0.4}
        orbitRadius={1}
        orbitSpeed={0.2}
      />
      <Planet 
        size={0.1} 
        color="#7a9bb8" 
        speed={0.25}
        orbitRadius={2.8}
        orbitSpeed={0.08}
      />
    </group>
  );
};

const StarsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [canvasError, setCanvasError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        
        setMousePosition({
          x: x - 0.5,
          y: y - 0.5,
        });
      }
    };

    const handleTouchMove = (event) => {
      if (containerRef.current && event.touches.length > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        const touch = event.touches[0];
        const x = (touch.clientX - rect.left) / rect.width;
        const y = (touch.clientY - rect.top) / rect.height;
        
        setMousePosition({
          x: x - 0.5,
          y: y - 0.5,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchmove", handleTouchMove);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className='w-full h-full' 
      style={{ 
        pointerEvents: 'none',
        background: isMobile 
          ? 'linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #0d0d1f 100%)'
          : 'linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #0d0d1f 100%)'
      }}
    >
      {!canvasError ? (
        <Canvas 
          camera={{ position: [0, 0, 1] }}
          gl={{ 
            powerPreference: isMobile ? "low-power" : "high-performance",
            antialias: false,
            alpha: true,
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true,
            dpr: isMobile ? 1 : window.devicePixelRatio,
          }}
          onError={() => setCanvasError(true)}
        >
          <Suspense fallback={null}>
            <Stars 
              numStars={isMobile ? 800 : 3000}
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
              isMobile={isMobile}
            />
          </Suspense>

          <Preload all />
        </Canvas>
      ) : (
        <div 
          className='w-full h-full' 
          style={{
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #0d0d1f 100%)'
          }}
        />
      )}
    </div>
  );
};

export default StarsCanvas;