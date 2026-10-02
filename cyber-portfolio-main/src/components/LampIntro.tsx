import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';

interface LampIntroProps {
  onEnterSite: () => void;
  isOpen: boolean;
}

export default function LampIntro({ onEnterSite, isOpen }: LampIntroProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- 1. THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous children if re-mounting
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // --- 2. LIGHTING SETUP ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const studioLight = new THREE.DirectionalLight(0xffffff, 0.9);
    studioLight.position.set(4, 8, 6);
    studioLight.castShadow = true;
    scene.add(studioLight);

    const bulbLight = new THREE.PointLight(0xffb84d, 0, 10);
    bulbLight.position.set(0, 0.5, 0);
    bulbLight.castShadow = true;
    scene.add(bulbLight);

    const spotLight = new THREE.SpotLight(0xffb84d, 0);
    spotLight.position.set(0, 0.8, 0);
    spotLight.angle = Math.PI / 2.5;
    spotLight.penumbra = 0.7;
    spotLight.castShadow = true;
    scene.add(spotLight);

    // --- 3. MATERIALS ---
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.2
    });

    const shadeMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ec,
      roughness: 0.5,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      emissive: 0x000000,
      roughness: 0.1
    });

    // --- 4. BUILD SMALL 3D LAMP MODEL ---
    const lampGroup = new THREE.Group();
    lampGroup.scale.set(0.55, 0.55, 0.55);

    // Floor Shadow Receiver Plane
    const floorGeo = new THREE.PlaneGeometry(15, 15);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.25;
    floor.receiveShadow = true;
    scene.add(floor);

    // Base
    const baseGeo = new THREE.CylinderGeometry(0.95, 1.05, 0.14, 64);
    const base = new THREE.Mesh(baseGeo, brassMat);
    base.position.y = -2.13;
    base.castShadow = true;
    base.receiveShadow = true;
    lampGroup.add(base);

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.05, 0.05, 3.2, 32);
    const stem = new THREE.Mesh(stemGeo, brassMat);
    stem.position.y = -0.5;
    stem.castShadow = true;
    lampGroup.add(stem);

    // Shade
    const shadeGeo = new THREE.CylinderGeometry(0.65, 1.35, 1.25, 64, 1, true);
    const shade = new THREE.Mesh(shadeGeo, shadeMat);
    shade.position.y = 1.3;
    shade.castShadow = true;
    lampGroup.add(shade);

    // Top Cap
    const capGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
    const cap = new THREE.Mesh(capGeo, brassMat);
    cap.position.y = 1.92;
    lampGroup.add(cap);

    // Light Bulb
    const bulbGeo = new THREE.SphereGeometry(0.24, 32, 32);
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.y = 0.9;
    lampGroup.add(bulb);

    // --- 5. PULL STRING ASSEMBLY ---
    const stringGroup = new THREE.Group();

    const stringLineGeo = new THREE.CylinderGeometry(0.012, 0.012, 1.1, 16);
    const stringLine = new THREE.Mesh(stringLineGeo, brassMat);
    stringLine.position.y = -0.55;
    stringGroup.add(stringLine);

    const handleGeo = new THREE.SphereGeometry(0.085, 16, 16);
    const handle = new THREE.Mesh(handleGeo, brassMat);
    handle.position.y = -1.1;
    stringGroup.add(handle);

    stringGroup.position.set(0.42, 1.0, 0);
    lampGroup.add(stringGroup);

    scene.add(lampGroup);

    // --- 6. ANIMATION & TOGGLE LOGIC ---
    let isOn = false;
    let stringYVel = 0;
    let isTransitioning = false;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const playClickSound = (turningOn: boolean) => {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(turningOn ? 520 : 320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(turningOn ? 180 : 120, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch {
        // Audio fallback
      }
    };

    function toggleLight() {
      if (isTransitioning) return;
      isOn = !isOn;
      setIsLightOn(isOn);
      playClickSound(isOn);

      const targetBulb = isOn ? 8 : 0;
      const targetSpot = isOn ? 12 : 0;

      let startTime = performance.now();
      function animateLights(now: number) {
        let elapsed = (now - startTime) / 250;
        if (elapsed > 1) elapsed = 1;

        bulbLight.intensity = THREE.MathUtils.lerp(bulbLight.intensity, targetBulb, elapsed);
        spotLight.intensity = THREE.MathUtils.lerp(spotLight.intensity, targetSpot, elapsed);

        if (elapsed < 1) requestAnimationFrame(animateLights);
      }
      requestAnimationFrame(animateLights);

      if (isOn) {
        bulbMat.emissive.setHex(0xffb84d);
        bulbMat.color.setHex(0xffb84d);
        setIsUnlocking(true);
        isTransitioning = true;

        // Redirect to website after lamp string down animation!
        setTimeout(() => {
          onEnterSite();
        }, 850);
      } else {
        bulbMat.emissive.setHex(0x000000);
        bulbMat.color.setHex(0x222222);
        setIsUnlocking(false);
      }

      stringGroup.position.y = 0.65;
      stringYVel = 0;
    }

    // --- 7. EVENT LISTENERS ---
    const handlePointerDown = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(lampGroup.children, true);

      if (intersects.length > 0) {
        toggleLight();
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- 8. RENDER LOOP ---
    let frameId: number;
    function render() {
      frameId = requestAnimationFrame(render);

      // Spring physics rebound
      const force = (1.0 - stringGroup.position.y) * 0.25;
      stringYVel = (stringYVel + force) * 0.72;
      stringGroup.position.y += stringYVel;

      // Gentle rotation
      const time = Date.now() * 0.0008;
      lampGroup.rotation.y = Math.sin(time) * 0.05;

      renderer.render(scene, camera);
    }

    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (domElement) {
        domElement.removeEventListener('pointerdown', handlePointerDown);
      }
      renderer.dispose();
    };
  }, [isOpen, onEnterSite]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] bg-[#0c0e12] flex items-center justify-center overflow-hidden select-none"
      >
        {/* Glow ambient background overlay when lamp light is ON */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            isLightOn ? 'opacity-100 bg-[radial-gradient(ellipse_at_center,rgba(255,184,77,0.22)_0%,transparent_75%)]' : 'opacity-0'
          }`}
        />

        {/* 3D Lamp Canvas Stage - pure lamp animation with interactive string */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-pointer" />
        </div>

        {/* Smooth transition flare when turning on lamp */}
        <AnimatePresence>
          {isUnlocking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 1] }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-white pointer-events-none z-50"
            />
          )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
}
