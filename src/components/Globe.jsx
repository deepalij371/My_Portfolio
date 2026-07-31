import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Globe({ size = 260 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 3.1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    el.appendChild(renderer.domElement);

    // Main wireframe sphere
    const geometry = new THREE.SphereGeometry(1.35, 22, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x3fd6d0,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Outer glow sphere
    const glowGeo = new THREE.SphereGeometry(1.36, 16, 12);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3fd6d0,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.scale.set(1.15, 1.15, 1.15);
    scene.add(glow);

    let frameId;
    function animate() {
      sphere.rotation.y += 0.0028;
      sphere.rotation.x += 0.0007;
      glow.rotation.y -= 0.0012;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      if (el) el.innerHTML = "";
    };
  }, [size]);

  return <div ref={mountRef} className="globe-mount" style={{ width: size, height: size }} />;
}
