"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hero 3D scene — a rotating particle globe (AI network) with orbiting
 * wireframe accents. Optimized: single Points geometry, no per-frame
 * allocations, DPR capped, renders behind the hero content.
 */

const CYAN = new THREE.Color("#33C6FF");
const PURPLE = new THREE.Color("#B13EFF");

/** Soft circular sprite so WebGL points render as glowing dots, not squares. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

/** Evenly distributed points on a sphere via Fibonacci lattice. */
function useSpherePoints(count: number, radius: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * r * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * r * radius;
      // Blend cyan → purple across the sphere's height.
      color.lerpColors(CYAN, PURPLE, (y + 1) / 2);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count, radius]);
}

function ParticleGlobe() {
  const group = useRef<THREE.Group>(null);
  const { positions, colors } = useSpherePoints(1400, 2.2);
  const glowMap = useGlowTexture();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.08;
    // Mouse parallax — ease the whole globe toward the pointer.
    const { x, y } = state.pointer;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, y * 0.25, 0.04);
    g.position.x = THREE.MathUtils.lerp(g.position.x, x * 0.4, 0.04);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          map={glowMap}
          alphaMap={glowMap}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Inner wireframe core */}
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function OrbitingAccents() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.05;
  });
  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[3.4, 1, -1]}>
          <octahedronGeometry args={[0.28]} />
          <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3.6, -0.8, -0.5]}>
          <boxGeometry args={[0.34, 0.34, 0.34]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={1.4} floatIntensity={1.2}>
        <mesh position={[2.6, -1.8, 0.5]}>
          <tetrahedronGeometry args={[0.22]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

/** Ambient drifting dust particles filling the hero volume. */
function Dust() {
  const positions = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    // Deterministic LCG instead of Math.random — keeps renders pure & stable.
    let seed = 42;
    const rand = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
    for (let i = 0; i < arr.length; i++) arr[i] = (rand() - 0.5) * 14;
    return arr;
  }, []);
  const glowMap = useGlowTexture();
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        map={glowMap}
        alphaMap={glowMap}
        color={CYAN}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      aria-hidden
    >
      <ParticleGlobe />
      <OrbitingAccents />
      <Dust />
    </Canvas>
  );
}
