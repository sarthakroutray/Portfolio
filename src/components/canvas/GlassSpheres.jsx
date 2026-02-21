import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const GlassSpheres = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x00ff41, 1.5);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x00ff41, 1);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x00ff41, 1, 100);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Create glass spheres with varying sizes and positions
    const spheres = [];
    const sphereData = [
      { x: -2.5, y: 1, z: 0, size: 1.2 },
      { x: 2, y: 1.5, z: -1, size: 1.5 },
      { x: -1, y: -1.5, z: -0.5, size: 0.8 },
      { x: 2.5, y: -1, z: 0.5, size: 1 },
      { x: 0, y: 2.5, z: -2, size: 0.9 },
    ];

    sphereData.forEach((data) => {
      const geometry = new THREE.SphereGeometry(data.size, 64, 64);
      
      // Glass material with green tint
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: 0.95,
        thickness: 0.5,
        envMapIntensity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        transparent: true,
        opacity: 0.8,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(data.x, data.y, data.z);
      sphere.userData = {
        initialY: data.y,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      };
      scene.add(sphere);
      spheres.push(sphere);
    });

    // Add green glow spheres inside glass spheres
    sphereData.forEach((data, index) => {
      const glowGeometry = new THREE.SphereGeometry(data.size * 0.7, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        transparent: true,
        opacity: 0.3,
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      glowSphere.position.set(data.x, data.y, data.z);
      glowSphere.userData = spheres[index].userData;
      scene.add(glowSphere);
      spheres.push(glowSphere);
    });

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate spheres
      spheres.forEach((sphere) => {
        // Floating animation
        sphere.position.y = 
          sphere.userData.initialY + 
          Math.sin(elapsedTime * sphere.userData.speed + sphere.userData.offset) * 0.3;
        
        // Rotation
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;

        // Mouse parallax
        sphere.position.x += (mouseX * 0.5 - sphere.position.x) * 0.01;
      });

      // Rotate camera slightly
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      spheres.forEach((sphere) => {
        sphere.geometry.dispose();
        sphere.material.dispose();
      });
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#0a0a0a' }}
    />
  );
};

export default GlassSpheres;
