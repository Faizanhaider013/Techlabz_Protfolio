"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hero 3D scene — an AI neural-network globe: a Fibonacci-sphere of glowing
 * nodes with dynamically drawn connection lines, wrapped in holographic
 * rings and drifting dust. Optimized: fixed geometry, no per-frame allocation,
 * DPR capped, additive blending, renders behind the hero content.
 */

const CYAN = new THREE.Color("#33C6FF");
const PURPLE = new THREE.Color("#B13EFF");
const GREEN = new THREE.Color("#56E0A0");

/** Soft circular sprite so WebGL points render as glowing dots, not squares. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/** Fibonacci-lattice sphere node positions + per-node brand colors. */
function useSphereNodes(count: number, radius: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const points: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r * radius;
      const z = Math.sin(theta) * r * radius;
      const yy = y * radius;
      positions[i * 3] = x;
      positions[i * 3 + 1] = yy;
      positions[i * 3 + 2] = z;
      points.push(new THREE.Vector3(x, yy, z));
      // Mostly cyan→purple, with an occasional green accent node.
      if (i % 11 === 0) c.copy(GREEN);
      else c.lerpColors(CYAN, PURPLE, (y + 1) / 2);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, points };
  }, [count, radius]);
}

/** Connection lines between nearby nodes — the "neural network" look. */
function useConnections(points: THREE.Vector3[], maxDist: number, maxLinks: number) {
  return useMemo(() => {
    const verts: number[] = [];
    let links = 0;
    for (let i = 0; i < points.length && links < maxLinks; i++) {
      for (let j = i + 1; j < points.length && links < maxLinks; j++) {
        if (points[i].distanceTo(points[j]) < maxDist) {
          verts.push(points[i].x, points[i].y, points[i].z);
          verts.push(points[j].x, points[j].y, points[j].z);
          links++;
        }
      }
    }
    return new Float32Array(verts);
  }, [points, maxDist, maxLinks]);
}

function NeuralGlobe() {
  const group = useRef<THREE.Group>(null);
  const glowMap = useGlowTexture();
  const { positions, colors, points } = useSphereNodes(340, 2.25);
  const lineVerts = useConnections(points, 0.62, 620);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.07;
    // Mouse parallax — ease the globe toward the pointer.
    const { x, y } = state.pointer;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, y * 0.28, 0.04);
    g.position.x = THREE.MathUtils.lerp(g.position.x, x * 0.45, 0.04);
  });

  return (
    <group ref={group}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineVerts, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={CYAN}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Glowing nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          map={glowMap}
          alphaMap={glowMap}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner wireframe core */}
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

/** Two tilted holographic rings orbiting the globe. */
function HolographicRings() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });
  return (
    <group ref={ref} rotation={[Math.PI / 2.6, 0, 0]}>
      <mesh>
        <torusGeometry args={[3.1, 0.012, 16, 120]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0.5, 0.3, 0]}>
        <torusGeometry args={[3.6, 0.01, 16, 120]} />
        <meshBasicMaterial color={PURPLE} transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

/** Floating wireframe accents drifting around the scene. */
function OrbitingAccents() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.045;
  });
  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.6}>
        <mesh position={[3.6, 1.1, -1]}>
          <octahedronGeometry args={[0.3]} />
          <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.55} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3.8, -0.9, -0.5]}>
          <boxGeometry args={[0.36, 0.36, 0.36]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.55} />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={1.4} floatIntensity={1.3}>
        <mesh position={[2.8, -1.9, 0.6]}>
          <tetrahedronGeometry args={[0.24]} />
          <meshBasicMaterial color={GREEN} wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

/** Ambient drifting dust filling the hero volume. */
function Dust() {
  const glowMap = useGlowTexture();
  const positions = useMemo(() => {
    const arr = new Float32Array(360 * 3);
    // Deterministic LCG instead of Math.random — keeps renders pure & stable.
    let seed = 42;
    const rand = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
    for (let i = 0; i < arr.length; i++) arr[i] = (rand() - 0.5) * 15;
    return arr;
  }, []);
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
        size={0.04}
        map={glowMap}
        alphaMap={glowMap}
        color={CYAN}
        transparent
        opacity={0.4}
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
      camera={{ position: [0, 0, 6.6], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      aria-hidden
    >
      <NeuralGlobe />
      <HolographicRings />
      <OrbitingAccents />
      <Dust />
    </Canvas>
  );
}
