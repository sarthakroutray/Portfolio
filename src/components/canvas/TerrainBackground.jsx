import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TerrainBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.035); // Heavy dark fog for depth

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 5, 12);
    camera.rotation.x = -0.4;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Terrain Geometry
    const geometry = new THREE.PlaneGeometry(80, 80, 60, 60);

    // Material
    const material = new THREE.MeshBasicMaterial({
      color: 0x39ff14, // Neon green
      wireframe: true,
      transparent: true,
      opacity: 0.15, // Subtle glowing effect
    });

    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2; // Lie flat
    scene.add(terrain);

    // Store original positions for wave calculation
    const originalPositions = geometry.attributes.position.array.slice();
    let time = 0;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.003; // Speed of animation

      const positions = geometry.attributes.position.array;

      // Loop through vertices
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];

        // Create a wave effect using sine and cosine combined
        const z =
          2 * Math.sin(x * 0.1 + time) +
          1.5 * Math.cos(y * 0.1 + time * 0.8) +
          0.5 * Math.sin((x + y) * 0.2 + time * 2);

        positions[i + 2] = z;
      }

      geometry.attributes.position.needsUpdate = true;

      // Slight terrain movement for endless scroll feel
      terrain.position.z = (time * 2) % 1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default TerrainBackground;
