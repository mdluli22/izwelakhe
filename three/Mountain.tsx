"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

export default function Mountain() {
  const mesh = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      40,
      40,
      250,
      250
    );

    const noise = createNoise2D();

    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const z =
        noise(x * 0.12, y * 0.12) * 3 +
        noise(x * 0.03, y * 0.03) * 7;

      pos.setZ(i, z);
    }

    geo.computeVertexNormals();

    return geo;
  }, []);

  useFrame((state) => {
    mesh.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      rotation={[-Math.PI / 2.5, 0, 0]}
      position={[0, -3, 0]}
    >
      <meshStandardMaterial
        color="#4f4f4f"
        roughness={1}
        metalness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}