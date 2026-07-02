"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles() {
  const points = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const count = 3600;

    const positions = new Float32Array(count * 3);

    const pseudoRandom = (seed: number) => {
      const value = Math.sin(seed * 12.9898) * 43758.5453;
      return value - Math.floor(value);
    };

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (pseudoRandom(i + 1) - 0.5) * 90;
      positions[i * 3 + 1] = pseudoRandom(i + 17) * 28;
      positions[i * 3 + 2] = (pseudoRandom(i + 37) - 0.5) * 90;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;

    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.01;
    points.current.position.y = Math.sin(t * 0.2) * 0.25;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.045}
        color="#f1dd9a"
        transparent
        opacity={0.42}
        depthWrite={false}
      />
    </points>
  );
}
