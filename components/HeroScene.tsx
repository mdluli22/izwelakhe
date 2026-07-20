"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import HeroMountain from "./HeroMountain";

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
        position: [0, 3.8, 31],
        fov: 30,
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
        gl.toneMappingExposure = 0.78;
      }}
    >
      <color attach="background" args={["#030403"]} />

      {/* No fog */}

      <ambientLight intensity={0.035} />

      <hemisphereLight
        args={["#d7c190", "#020303", 0.16]}
      />

      <directionalLight
        position={[-9, 18, 15]}
        intensity={4.8}
        color="#ffe6ad"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-camera-left={-48}
        shadow-camera-right={48}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0002}
      />

      <spotLight
        position={[18, 10, 18]}
        angle={0.34}
        penumbra={0.9}
        intensity={2.2}
        color="#b58d48"
      />

      <pointLight
        position={[22, 2, 10]}
        intensity={1.4}
        color="#7a5a2e"
        distance={42}
      />

      <HeroMountain />

      <EffectComposer multisampling={0}>
        <DepthOfField
          focusDistance={0.035}
          focalLength={0.032}
          bokehScale={0.45}
        />

        <Bloom
          intensity={0.11}
          luminanceThreshold={0.76}
          luminanceSmoothing={0.42}
          mipmapBlur
        />

        <Noise opacity={0.018} />

        <Vignette
          offset={0.14}
          darkness={0.78}
        />
      </EffectComposer>
    </Canvas>
  );
}