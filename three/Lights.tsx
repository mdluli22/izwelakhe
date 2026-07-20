"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import MountainRange from "./MountainRange";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{
        position: [0, 3.8, 30],
        fov: 31,
        near: 0.1,
        far: 120,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.82;
      }}
    >
      <color attach="background" args={["#030505"]} />
      <fog attach="fog" args={["#050706", 18, 78]} />

      <ambientLight intensity={0.12} />

      <hemisphereLight
        args={["#f5ead2", "#050809", 0.28]}
      />

      <directionalLight
        position={[-10, 18, 16]}
        intensity={3.8}
        color="#fff1d0"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
      />

      <spotLight
        position={[18, 12, 18]}
        angle={0.32}
        penumbra={1}
        intensity={3.2}
        color="#d8bd72"
      />

      <MountainRange variant="back" />
      <MountainRange variant="middle" />
      <MountainRange variant="front" />
    </Canvas>
  );
}