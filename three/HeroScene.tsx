"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

import Terrain from "./Terrian";
import TerrainBack from "./TerrianBack";
import Particles from "./Particles";
import EngineeringGrid from "./Grid";
import Lights from "./Lights";
import CameraRig from "./CameraRig";
import PostProcessing from "./PostProcessing";

export default function HeroScene() {
  return (
    <Canvas
      className="absolute inset-0 !h-full !w-full"
      shadows
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.08,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{
        position: [-14, 9, 25],
        fov: 34,
        near: 0.1,
        far: 95,
      }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 10, 72]} />

      <Lights />
      <CameraRig />

      <Particles />

      <TerrainBack />
      <Terrain />

      <EngineeringGrid />

      <Environment preset="night" />
      <PostProcessing />
    </Canvas>
  );
}
