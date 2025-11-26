import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const Geometry = ({ position, rotation, scale, color, children }) => {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Basic rotation
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;

            // Mouse interaction: rotate faster when hovered
            if (hovered) {
                meshRef.current.rotation.x += delta * 0.5;
                meshRef.current.rotation.y += delta * 0.5;
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh
                ref={meshRef}
                position={position}
                rotation={rotation}
                scale={hovered ? scale * 1.2 : scale}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {children}
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.1}
                    transmission={0.9}
                    thickness={1.5}
                    chromaticAberration={0.05}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </Float>
    );
};

const Rig = () => {
    const { camera, mouse } = useThree();
    useFrame(() => {
        camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });
    return null;
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ThreeGalaxy Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className="w-full h-full bg-gradient-to-b from-primary to-tertiary" />;
        }

        return this.props.children;
    }
}

const Background = ({ isDark }) => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

            {/* Interactive Shapes */}
            <Geometry
                position={[-3, 2, -5]}
                rotation={[0, 0, 0]}
                scale={1.5}
                color="#a855f7" // Purple
            >
                <torusGeometry args={[1, 0.4, 16, 32]} />
            </Geometry>

            <Geometry
                position={[4, -1, -8]}
                rotation={[1, 1, 0]}
                scale={2}
                color="#3b82f6" // Blue
            >
                <icosahedronGeometry args={[1, 0]} />
            </Geometry>

            <Geometry
                position={[-2, -3, -4]}
                rotation={[0.5, 0, 0]}
                scale={1.2}
                color="#ec4899" // Pink
            >
                <octahedronGeometry args={[1, 0]} />
            </Geometry>

            <Geometry
                position={[3, 3, -6]}
                rotation={[0, 0, 0]}
                scale={1}
                color="#10b981" // Emerald
            >
                <boxGeometry args={[1, 1, 1]} />
            </Geometry>

            <Geometry
                position={[-4, -2, -7]}
                rotation={[0, 0, 0]}
                scale={1.3}
                color="#f59e0b" // Amber
            >
                <sphereGeometry args={[0.8, 32, 32]} />
            </Geometry>

            {/* Floating Particles */}
            <Sparkles
                count={200}
                scale={12}
                size={4}
                speed={0.4}
                opacity={0.5}
                color="#ffffff"
            />

            {/* Distant Stars */}
            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

            <Environment preset="city" />
            <Rig />
        </>
    );
};

export default function GlassmorphicBackground({ isDark = true }) {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1] bg-gradient-to-b from-primary to-[#100d25]">
            <ErrorBoundary>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
                    dpr={[1, 1.5]} // Cap DPR for performance
                >
                    <Background isDark={isDark} />
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}
