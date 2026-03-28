'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroParticleSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    renderer.domElement.style.opacity = '0';
    renderer.domElement.style.transition = 'opacity 2s cubic-bezier(0.19, 1, 0.22, 1)';

    const group = new THREE.Group();
    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);
    const purpleLight = new THREE.PointLight(0x9b00e8, 5, 20);
    purpleLight.position.set(-5, -5, 5);
    scene.add(purpleLight);
    const whiteLight = new THREE.PointLight(0xffffff, 4, 20);
    whiteLight.position.set(5, 5, 5);
    scene.add(whiteLight);

    const geo = new THREE.SphereGeometry(0.045, 16, 16);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x9b00e8,
      metalness: 0.8,
      roughness: 0.2,
      transmission: 0.3,
      thickness: 0.5,
      emissive: new THREE.Color(0x4a0070),
      emissiveIntensity: 0.6,
    });

    const dummy = new THREE.Object3D();

    let instancedMesh: THREE.InstancedMesh | null = null;
    let positions: THREE.Vector3[] = [];
    let animId: number;
    let mouseX = 0;
    let mouseY = 0;

    const startTime = performance.now();
    const targetMousePos = new THREE.Vector3();

    const updateGroupPosition = () => {
      if (window.innerWidth > 768) {
        group.position.set(3.4, 0.6, 0);
      } else {
        group.position.set(0, 2.2, 0);
      }
    };
    updateGroupPosition();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateGroupPosition();
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!instancedMesh || positions.length === 0) return;

      const time = (performance.now() - startTime) / 1000;
      const COUNT = positions.length;

      const vec = new THREE.Vector3(mouseX, mouseY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      targetMousePos.copy(camera.position).add(dir.multiplyScalar(dist));
      group.worldToLocal(targetMousePos);

      group.rotation.y = Math.sin(time * 0.4) * 0.12;
      group.rotation.x = Math.sin(time * 0.25) * 0.06;

      for (let i = 0; i < COUNT; i++) {
        const basePos = positions[i];
        const currentPos = new THREE.Vector3().copy(basePos);

        const distToMouse = basePos.distanceTo(targetMousePos);
        if (distToMouse < 2.5) {
          const force = (2.5 - distToMouse) / 2.5;
          const repel = new THREE.Vector3().copy(basePos).sub(targetMousePos).normalize();
          currentPos.add(repel.multiplyScalar(force * 0.8));
        }

        dummy.position.copy(currentPos);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    // ── Sample image pixels → 3D particle positions ───────────────────────
    const img = new Image();
    img.src = '/panther-mask.png';
    img.onload = () => {
      const SAMPLE_SIZE = 300; // internal canvas resolution for sampling
      const offscreen = document.createElement('canvas');
      offscreen.width = SAMPLE_SIZE;
      offscreen.height = SAMPLE_SIZE;
      const ctx = offscreen.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
      const { data } = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

      const LOGO_SCALE = 5.5; // world-unit size of the logo
      const DEPTH     = 0.5; // random Z spread for 3D depth

      const sampled: THREE.Vector3[] = [];
      for (let y = 0; y < SAMPLE_SIZE; y++) {
        for (let x = 0; x < SAMPLE_SIZE; x++) {
          const idx = (y * SAMPLE_SIZE + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          const isLogo = a > 128 && !(r > 220 && g > 220 && b > 220);
          if (!isLogo) continue;

          const nx = ((x / SAMPLE_SIZE) * 2 - 1) * (LOGO_SCALE / 2);
          const ny = -((y / SAMPLE_SIZE) * 2 - 1) * (LOGO_SCALE / 2); // flip Y
          const nz = (Math.random() - 0.5) * DEPTH;
          sampled.push(new THREE.Vector3(nx, ny, nz));
        }
      }

      const MAX = 1800;
      const step = Math.max(1, Math.floor(sampled.length / MAX));
      positions = sampled.filter((_, i) => i % step === 0);

      const COUNT = positions.length;
      instancedMesh = new THREE.InstancedMesh(geo, mat, COUNT);
      group.add(instancedMesh);

      for (let i = 0; i < COUNT; i++) {
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
        instancedMesh.setColorAt(i, new THREE.Color('#9b00e8'));
      }
      instancedMesh.instanceMatrix.needsUpdate = true;

      setTimeout(() => (renderer.domElement.style.opacity = '1'), 800);
      animate();
    };

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
}
