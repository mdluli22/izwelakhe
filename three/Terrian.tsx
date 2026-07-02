"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

type TerrainProps = {
  back?: boolean;
};

type TerrainShader = {
  uniforms: Record<string, { value: number }>;
  vertexShader: string;
};

export default function Terrain({ back = false }: TerrainProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const wireframe = useRef<THREE.Mesh>(null!);
  const shader = useRef<TerrainShader | null>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      back ? 80 : 54,
      back ? 80 : 54,
      back ? 140 : 220,
      back ? 140 : 220
    );

    const noise = createNoise2D();

    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const mountain =
        noise(x * 0.03, y * 0.03) * 8;

      const detail =
        noise(x * 0.12, y * 0.12) * 2;

      pos.setZ(i, mountain + detail);
    }

    geo.computeVertexNormals();

    return geo;
  }, [back]);

  useFrame((state) => {
    if (!mesh.current) return;

    const t = state.clock.elapsedTime;

    mesh.current.rotation.z =
      Math.sin(t * 0.03) * (back ? 0.008 : 0.015);

    mesh.current.position.y =
      (back ? -10 : -7.5) + Math.sin(t * 0.15) * (back ? 0.05 : 0.12);

    if (wireframe.current) {
      wireframe.current.rotation.copy(mesh.current.rotation);
      wireframe.current.position.copy(mesh.current.position);
    }

    if (shader.current) {
      shader.current.uniforms.uTime.value = t;
      shader.current.uniforms.uWaveStrength.value = back ? 0.25 : 0.55;
    }
  });

  return (
    <group rotation={[-Math.PI / 2.26, 0, 0]} position={back ? [-2, -10, -22] : [8, -7.5, -7]}>
      <mesh
        ref={mesh}
        geometry={geometry}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          color={back ? "#2f3234" : "#585b57"}
          roughness={0.92}
          metalness={0.18}
          onBeforeCompile={(compiledShader) => {
            shader.current = compiledShader;
            compiledShader.uniforms.uTime = { value: 0 };
            compiledShader.uniforms.uWaveStrength = { value: 0 };
            compiledShader.vertexShader = compiledShader.vertexShader.replace(
              "#include <common>",
              `
              #include <common>
              uniform float uTime;
              uniform float uWaveStrength;
              `
            );
            compiledShader.vertexShader = compiledShader.vertexShader.replace(
              "#include <begin_vertex>",
              `
              #include <begin_vertex>
              float cinematicWave = sin((position.x * 0.34) + (uTime * 0.72)) * 0.16;
              cinematicWave += cos((position.y * 0.23) - (uTime * 0.55)) * 0.12;
              transformed.z += cinematicWave * uWaveStrength;
              `
            );
          }}
        />
      </mesh>

      <mesh
        ref={wireframe}
        geometry={geometry}
        renderOrder={2}
      >
        <meshBasicMaterial
          color="#d8b85a"
          wireframe
          transparent
          opacity={back ? 0.04 : 0.09}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
