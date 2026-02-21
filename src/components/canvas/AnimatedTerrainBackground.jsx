import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedTerrainBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create first terrain layer
    const geometry = new THREE.PlaneGeometry(100, 100, 150, 150);
    const vertices = geometry.attributes.position.array;

    // Create initial wave pattern
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      vertices[i + 2] = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 3;
    }

    // Material with green wireframe
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 3;
    scene.add(plane);

    // Add second layer for depth
    const geometry2 = new THREE.PlaneGeometry(100, 100, 150, 150);
    const vertices2 = geometry2.attributes.position.array;

    for (let i = 0; i < vertices2.length; i += 3) {
      const x = vertices2[i];
      const y = vertices2[i + 1];
      vertices2[i + 2] = Math.sin(x * 0.15 + 2) * Math.cos(y * 0.15) * 2.5;
    }

    const material2 = new THREE.MeshBasicMaterial({
      color: 0x00cc00,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    });

    const plane2 = new THREE.Mesh(geometry2, material2);
    plane2.rotation.x = -Math.PI / 3;
    plane2.position.z = -5;
    scene.add(plane2);

    // Add ambient glow particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ff00,
      size: 0.5,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let time = 0;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // Animate first wave layer
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time) * 3;
      }
      geometry.attributes.position.needsUpdate = true;

      // Animate second wave layer
      const positions2 = geometry2.attributes.position.array;
      for (let i = 0; i < positions2.length; i += 3) {
        const x = positions2[i];
        const y = positions2[i + 1];
        positions2[i + 2] = Math.sin(x * 0.15 + time + 2) * Math.cos(y * 0.15 + time) * 2.5;
      }
      geometry2.attributes.position.needsUpdate = true;

      // Rotate planes slowly
      plane.rotation.z = time * 0.05;
      plane2.rotation.z = -time * 0.03;

      // Animate particles
      particles.rotation.y = time * 0.05;

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
      geometry2.dispose();
      particleGeometry.dispose();
      material.dispose();
      material2.dispose();
      particleMaterial.dispose();
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

export default AnimatedTerrainBackground;
