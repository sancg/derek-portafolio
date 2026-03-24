import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useThreeMusicWave() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // let scrollY = 0;

    // window.addEventListener('scroll', () => {
    //   scrollY = window.scrollY;
    // });

    // -----------------------------
    // Scene setup
    // -----------------------------
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      65,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // -----------------------------
    // Particle Wave Geometry
    // -----------------------------
    const COUNT_X = 200;
    const COUNT_Y = 60;

    const positions = new Float32Array(COUNT_X * COUNT_Y * 3);

    let i = 0;
    for (let x = 0; x < COUNT_X; x++) {
      for (let y = 0; y < COUNT_Y; y++) {
        positions[i++] = (x - COUNT_X / 2) * 0.05; // X
        positions[i++] = (y - COUNT_Y / 2) * 0.08; // Y
        positions[i++] = 0; // Z
      }
    }

    // const geometry = new THREE.BufferGeometry();
    const geometry = new THREE.PlaneGeometry(30, 100, 100, 200);
    // geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    // -----------------------------
    // Material (soft glowing dots)
    // -----------------------------
    const material = new THREE.PointsMaterial({
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // const material = new THREE.PointsMaterial({
    //   size: 0.04,
    //   color: 0xffffff,
    //   transparent: true,
    //   opacity: 0.7,
    //   blending: THREE.AdditiveBlending,
    //   depthWrite: false,
    // });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // -----------------------------
    // Animation variables
    // -----------------------------
    let time = 0;
    let mouseX = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    });

    // -----------------------------
    // Wave Function (IMPORTANT)
    // -----------------------------
    const animateWave = () => {
      const pos = geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const distance = Math.abs(y);
        const fade = 1.0 - Math.min(distance / 5, 1);
        material.opacity = 0.2 + fade * 0.3;
        // layered waves (less repetitive)

        const depth = Math.sin(y * 0.3 + time * 0.5) * 0.5;
        const wave = Math.sin(x * 1.5 + time) * 0.3 + Math.sin(x * 0.5 + time * 0.7) * 0.2;

        pos.setZ(i, wave + depth);
      }

      pos.needsUpdate = true;
    };

    // -----------------------------
    // Loop
    // -----------------------------
    let frameId: number;

    const render = () => {
      time += 0.01;
      // time = scrollY * 0.002;
      animateWave();

      // subtle camera movement
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    render();

    // -----------------------------
    // Resize
    // -----------------------------
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;

      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // -----------------------------
    // Cleanup
    // -----------------------------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return mountRef;
}
