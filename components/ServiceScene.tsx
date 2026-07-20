"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ServiceSceneVariant = "consulting" | "construction" | "property";

type ServiceSceneProps = {
  variant: ServiceSceneVariant;
};

function ConsultingField() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    return Array.from({ length: 42 }, (_, index) => {
      const lane = (index % 7) - 3;
      const depth = Math.floor(index / 7);

      return {
        position: [
          lane * 2.15 + Math.sin(index * 1.7) * 0.32,
          Math.cos(index * 0.84) * 1.55,
          -depth * 2.15 + Math.sin(index) * 0.45,
        ] as [number, number, number],
        scale: 0.045 + (index % 5) * 0.011,
      };
    });
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;

    const elapsed = clock.getElapsedTime();
    group.current.rotation.y = elapsed * 0.055 + pointer.x * 0.08;
    group.current.rotation.x = -0.12 + pointer.y * 0.035;
    group.current.position.z = Math.sin(elapsed * 0.28) * 0.3;
  });

  return (
    <group ref={group} position={[2.2, -0.35, 2.2]} rotation={[-0.12, -0.42, 0]}>
      <mesh position={[0, -1.9, -4.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 18, 32, 32]} />
        <meshStandardMaterial color="#11161a" emissive="#191006" emissiveIntensity={0.18} metalness={0.24} roughness={0.7} wireframe transparent opacity={0.38} />
      </mesh>

      {nodes.map((node, index) => (
        <mesh key={index} position={node.position} scale={node.scale}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={index % 4 === 0 ? "#f2d98d" : "#cfa75a"} emissive="#cfa75a" emissiveIntensity={index % 4 === 0 ? 0.55 : 0.28} roughness={0.32} metalness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

function ConstructionField() {
  const group = useRef<THREE.Group>(null);
  const beams = useMemo(() => {
    return Array.from({ length: 16 }, (_, index) => ({
      x: (index % 4) * 1.65 - 2.5,
      y: Math.floor(index / 4) * 0.86 - 1.25,
      z: -Math.floor(index / 4) * 1.3,
      delay: index * 0.18,
    }));
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;

    const elapsed = clock.getElapsedTime();
    group.current.rotation.y = -0.28 + pointer.x * 0.06 + Math.sin(elapsed * 0.25) * 0.04;
    group.current.rotation.x = -0.06 + pointer.y * 0.035;
    group.current.children.forEach((child, index) => {
      child.position.y += Math.sin(elapsed * 1.2 + index * 0.6) * 0.0008;
    });
  });

  return (
    <group ref={group} position={[2.1, -0.1, 0.4]} rotation={[-0.08, -0.28, 0]}>
      {beams.map((beam, index) => (
        <group key={index} position={[beam.x, beam.y, beam.z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.08, 1.34, 0.08]} />
            <meshStandardMaterial color="#cfa75a" emissive="#8a621e" emissiveIntensity={0.24} metalness={0.48} roughness={0.36} />
          </mesh>
          <mesh position={[0.68, 0, 0]}>
            <boxGeometry args={[1.36, 0.07, 0.07]} />
            <meshStandardMaterial color="#f2d98d" emissive="#9f792d" emissiveIntensity={0.18} metalness={0.5} roughness={0.34} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -2.05, -2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11, 12, 18, 18]} />
        <meshStandardMaterial color="#101318" emissive="#11100b" emissiveIntensity={0.12} wireframe transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

function PropertyField() {
  const group = useRef<THREE.Group>(null);
  const towers = useMemo(() => {
    return Array.from({ length: 18 }, (_, index) => ({
      x: (index % 6) * 1.05 - 2.65,
      z: -Math.floor(index / 6) * 1.05,
      height: 0.7 + ((index * 7) % 6) * 0.28,
    }));
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;

    const elapsed = clock.getElapsedTime();
    group.current.rotation.y = -0.48 + pointer.x * 0.08 + Math.sin(elapsed * 0.22) * 0.05;
    group.current.rotation.x = -0.18 + pointer.y * 0.03;
    group.current.position.y = Math.sin(elapsed * 0.38) * 0.08;
  });

  return (
    <group ref={group} position={[2.35, -1.05, 1.15]} rotation={[-0.18, -0.48, 0]}>
      {towers.map((tower, index) => (
        <mesh key={index} position={[tower.x, tower.height / 2, tower.z]}>
          <boxGeometry args={[0.58, tower.height, 0.58]} />
          <meshStandardMaterial color={index % 3 === 0 ? "#d5b96b" : "#7c8c86"} emissive={index % 3 === 0 ? "#7b5519" : "#26352f"} emissiveIntensity={0.18} metalness={0.22} roughness={0.54} />
        </mesh>
      ))}
      <mesh position={[0, -0.03, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.7, 48]} />
        <meshStandardMaterial color="#101619" emissive="#18231f" emissiveIntensity={0.16} transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

export default function ServiceScene({ variant }: ServiceSceneProps) {
  return (
    <Canvas
      className="service-animated-scene"
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.7, 10.5], fov: 42, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.9;
      }}
    >
      <ambientLight intensity={0.24} />
      <hemisphereLight args={["#f5ead2", "#05070a", 0.42]} />
      <pointLight position={[-3.5, 3.5, 4]} intensity={4.2} color="#f0d28a" />
      <pointLight position={[4, -1.2, -4]} intensity={1.8} color={variant === "property" ? "#8fb2a4" : "#6f8fa3"} />
      <fog attach="fog" args={["#0b0d10", 7, 24]} />
      {variant === "consulting" && <ConsultingField />}
      {variant === "construction" && <ConstructionField />}
      {variant === "property" && <PropertyField />}
    </Canvas>
  );
}
