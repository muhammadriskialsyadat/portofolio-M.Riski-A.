"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ── Animated Icosahedron (main object) ────────────────────────
function AnimatedIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.20;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#2563eb"
          metalness={0.7}
          roughness={0.15}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

// ── Outer wireframe ring ───────────────────────────────────────
function Ring({ radius, tilt, speed }: { radius: number; tilt: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 80]} />
      <meshBasicMaterial color="#93c5fd" transparent opacity={0.5} />
    </mesh>
  );
}

// ── Small floating satellite dots ─────────────────────────────
function Dot({ position, speed }: { position: [number, number, number]; speed: number }) {
  return (
    <Float speed={speed} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
      </mesh>
    </Float>
  );
}

const DOT_POSITIONS: [number, number, number][] = [
  [2.8,  1.2,  0],
  [-2.6, -0.8, 0.5],
  [1.5, -2.4, -0.3],
  [-1.8,  2.0,  0.8],
  [3.0, -1.5, -0.5],
];

// ── Main Canvas export ─────────────────────────────────────────
export default function HeroCanvas() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]}   intensity={1.2} />
        <directionalLight position={[-3, -3, -3]} intensity={0.3} color="#93c5fd" />
        <pointLight       position={[0, 0, 4]}    intensity={0.8} color="#3b82f6" />

        {/* Objects */}
        <AnimatedIcosahedron />
        <Ring radius={2.2} tilt={0}              speed={0.12} />
        <Ring radius={2.5} tilt={Math.PI / 3}    speed={-0.08} />
        {DOT_POSITIONS.map((pos, i) => (
          <Dot key={i} position={pos} speed={1.5 + i * 0.3} />
        ))}

        {/* Subtle auto-rotate, user can drag */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
