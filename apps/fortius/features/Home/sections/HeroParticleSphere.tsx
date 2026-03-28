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
    setTimeout(() => (renderer.domElement.style.opacity = '1'), 800);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x9b00e8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    const COUNT = 1800;
    const RADIUS = 1.65;
    const geo = new THREE.SphereGeometry(0.035, 16, 16);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.1,
      transmission: 0.8,
      thickness: 0.5,
    });
    const instancedMesh = new THREE.InstancedMesh(geo, mat, COUNT);
    group.add(instancedMesh);

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

    const positions: THREE.Vector3[] = [];
    const colorDark = new THREE.Color('#050505');
    const colorAccent = new THREE.Color('#ffffff');
    const colorWhite = new THREE.Color('#ffffff');
    const colorTemp = new THREE.Color();
    const dummy = new THREE.Object3D();

    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = RADIUS * Math.cos(theta) * Math.sin(phi);
      const y = RADIUS * Math.sin(theta) * Math.sin(phi);
      const z = RADIUS * Math.cos(phi);
      positions.push(new THREE.Vector3(x, y, z));
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
      instancedMesh.setColorAt(i, colorDark);
    }

    const updateGroupPosition = () => {
      if (window.innerWidth > 768) {
        group.position.set(3.4, 0.6, 0);
      } else {
        group.position.set(0, 2.2, 0);
      }
    };
    updateGroupPosition();

    let mouseX = 0;
    let mouseY = 0;
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

    const clock = new THREE.Clock();
    const targetMousePos = new THREE.Vector3();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      const vec = new THREE.Vector3(mouseX, mouseY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      targetMousePos.copy(camera.position).add(dir.multiplyScalar(dist));
      group.worldToLocal(targetMousePos);

      group.rotation.y += 0.005;
      group.rotation.x += 0.002;
      coreMesh.rotation.y -= 0.002;
      coreMesh.rotation.x -= 0.003;

      const blob1 = new THREE.Vector3(
        Math.sin(time * 0.8) * RADIUS,
        Math.cos(time * 0.6) * RADIUS,
        Math.sin(time * 1.1) * RADIUS
      );
      const blob2 = new THREE.Vector3(
        Math.cos(time * 1.2) * RADIUS,
        Math.sin(time * 0.9) * RADIUS,
        Math.cos(time * 0.7) * RADIUS
      );

      for (let i = 0; i < COUNT; i++) {
        const basePos = positions[i];
        const currentPos = new THREE.Vector3().copy(basePos);

        const distToMouse = basePos.distanceTo(targetMousePos);
        if (distToMouse < 2.5) {
          const force = (2.5 - distToMouse) / 2.5;
          const repel = new THREE.Vector3().copy(basePos).sub(targetMousePos).normalize();
          currentPos.add(repel.multiplyScalar(force * 0.8));
        }

        const dist1 = currentPos.distanceTo(blob1);
        const dist2 = currentPos.distanceTo(blob2);
        const minDist = Math.min(dist1, dist2);

        let scale: number;
        if (minDist < 0.9) {
          const n = 1 - minDist / 0.9;
          scale = 1.0 + n * 1.5;
          colorTemp.copy(colorAccent).lerp(colorWhite, n);
        } else if (minDist < 2.0) {
          const n = 1 - (minDist - 0.9) / 1.1;
          scale = 0.5 + n * 0.5;
          colorTemp.copy(colorDark).lerp(colorAccent, n);
        } else {
          scale = 0.5;
          colorTemp.copy(colorDark);
        }

        dummy.position.copy(currentPos);
        dummy.scale.set(scale, scale, scale);
        dummy.lookAt(new THREE.Vector3(0, 0, 0));
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
        instancedMesh.setColorAt(i, colorTemp);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

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
