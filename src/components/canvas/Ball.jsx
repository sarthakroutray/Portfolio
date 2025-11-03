import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const StaticBall = ({ icon }) => {
  return (
    <div className='w-full h-full bg-gradient-to-br from-purple-900 to-purple-700 rounded-full flex items-center justify-center shadow-lg'>
      <img 
        src={icon} 
        alt='skill' 
        className='w-1/2 h-1/2 object-contain opacity-90'
      />
    </div>
  );
};

const BallCanvas = ({ icon }) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleCanvasError = () => {
    setShowFallback(true);
  };

  if (isMobile) {
    return <StaticBall icon={icon} />;
  }

  if (showFallback) {
    return (
      <div className='w-full h-full bg-gray-800 rounded-full flex items-center justify-center'>
        <img 
          src={icon} 
          alt='skill' 
          className='w-10 h-10 object-contain opacity-80'
        />
      </div>
    );
  }

  return (
    <Canvas
      key={icon}
      frameloop='demand'
      dpr={1}
      gl={{ 
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        alpha: true,
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;