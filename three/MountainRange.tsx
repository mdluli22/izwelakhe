"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

type MountainRangeProps = {
  variant: "front" | "middle" | "back";
};

const CONFIG = {
  front: {
    width: 88,
    depth: 42,
    segments: 260,
    height: 14.8,
    ridgeOffset: -4.5,
    valleyColor: "#14191a",
    midColor: "#3f473f",
    peakColor: "#827d68",
    snowColor: "#f4ecd9",
    opacity: 1,
    position: [10, -9.5, -8] as [number, number, number],
    rotationY: -0.18,
    drift: 0.08,
  },
  middle: {
    width: 106,
    depth: 44,
    segments: 220,
    height: 11.2,
    ridgeOffset: -1,
    valleyColor: "#101719",
    midColor: "#33403d",
    peakColor: "#706f5e",
    snowColor: "#eadfc9",
    opacity: 0.98,
    position: [2, -10.1, -28] as [number, number, number],
    rotationY: 0.04,
    drift: 0.055,
  },
  back: {
    width: 126,
    depth: 38,
    segments: 170,
    height: 7.6,
    ridgeOffset: 1.8,
    valleyColor: "#0c1113",
    midColor: "#263333",
    peakColor: "#565d55",
    snowColor: "#dfd3bd",
    opacity: 0.9,
    position: [-8, -10.35, -48] as [number, number, number],
    rotationY: 0.18,
    drift: 0.035,
  },
};

function seededRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

function fbm(
  noise: ReturnType<typeof createNoise2D>,
  x: number,
  y: number,
  octaves = 5
) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;

  for (let i = 0; i < octaves; i += 1) {
    value += noise(x * frequency, y * frequency) * amplitude;
    frequency *= 2.05;
    amplitude *= 0.48;
  }

  return value;
}

function ridged(value: number) {
  return 1 - Math.abs(value);
}

export default function MountainRange({ variant }: MountainRangeProps) {
  const group = useRef<THREE.Group>(null!);
  const config = CONFIG[variant];

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      config.width,
      config.depth,
      config.segments,
      Math.floor(config.segments * 0.5)
    );

    const noise = createNoise2D(
      seededRandom(variant === "front" ? 27 : variant === "middle" ? 61 : 93)
    );

    const positions = geo.attributes.position;
    const elevations = new Float32Array(positions.count);

    let highestPoint = 0;

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);

      const normalizedDepth = (y + config.depth / 2) / config.depth;

      const edgeFade =
        smoothstep(-config.width / 2, -config.width / 2 + 9, x) *
        (1 - smoothstep(config.width / 2 - 9, config.width / 2, x));

      const footFade =
        smoothstep(0.04, 0.22, normalizedDepth) *
        (1 - smoothstep(0.93, 1, normalizedDepth));

      const ridgeLine =
        config.ridgeOffset +
        Math.sin(x * 0.105) * 3.2 +
        noise(x * 0.032, 0.7) * 5.4 +
        noise(x * 0.071, 8.4) * 1.9;

      const distanceFromRidge = Math.abs(y - ridgeLine);

      const mainRidge =
        1 - smoothstep(0, config.depth * 0.5, distanceFromRidge);

      const secondaryRidge =
        1 -
        smoothstep(
          0,
          config.depth * 0.36,
          Math.abs(
            y -
              ridgeLine +
              noise(x * 0.06 + 7, y * 0.025 - 2) * 7.5
          )
        );

      const macroMass =
        Math.pow(Math.max(0, mainRidge), 2.15) * config.height +
        Math.pow(Math.max(0, secondaryRidge), 2.7) * config.height * 0.38;

      const peakNoise =
        Math.pow(
          Math.max(0, ridged(fbm(noise, x * 0.055 + 2, y * 0.075 - 3, 5))),
          1.8
        ) *
        config.height *
        0.42 *
        smoothstep(0.18, 0.96, mainRidge);

      const cragDetail =
        fbm(noise, x * 0.18 + 17, y * 0.22 - 11, 5) *
        config.height *
        0.16 *
        smoothstep(0.12, 0.9, mainRidge);

      const gullies =
        Math.pow(
          Math.max(0, noise(x * 0.22 + 31, y * 0.72 - 9)),
          3.4
        ) *
        config.height *
        0.28 *
        smoothstep(0.24, 0.92, mainRidge);

      const sediment =
        Math.sin(
          y * 0.72 +
            x * 0.18 +
            noise(x * 0.055, y * 0.055) * 4.2
        ) *
        config.height *
        0.025 *
        mainRidge;

      const finalElevation =
        Math.max(0, macroMass + peakNoise + cragDetail + sediment - gullies) *
        footFade *
        edgeFade;

      positions.setZ(index, finalElevation);

      elevations[index] = finalElevation;
      highestPoint = Math.max(highestPoint, finalElevation);
    }

    positions.needsUpdate = true;
    geo.computeVertexNormals();

    const colors = new Float32Array(positions.count * 3);
    const normals = geo.attributes.normal;

    const valleyColor = new THREE.Color(config.valleyColor);
    const midColor = new THREE.Color(config.midColor);
    const peakColor = new THREE.Color(config.peakColor);
    const snowColor = new THREE.Color(config.snowColor);

    const sunDirection = new THREE.Vector3(-0.32, -0.42, 0.85).normalize();

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);

      const normal = new THREE.Vector3(
        normals.getX(index),
        normals.getY(index),
        normals.getZ(index)
      ).normalize();

      const heightRatio = elevations[index] / Math.max(highestPoint, 1);
      const slope = 1 - Math.max(0, normal.z);

      const cliffAmount = smoothstep(0.28, 0.82, slope);

      const snowAmount =
        smoothstep(0.68, 0.98, heightRatio) *
        smoothstep(0.52, 0.88, normal.z) *
        (1 - cliffAmount * 0.55);

      const exposedRock =
        smoothstep(0.42, 0.92, heightRatio) * smoothstep(0.22, 0.74, slope);

      const light = THREE.MathUtils.clamp(
        normal.dot(sunDirection) * 0.72 + 0.52,
        0.18,
        1.28
      );

      const coldCrease =
        Math.pow(Math.max(0, noise(x * 0.32 - 6, y * 0.76 + 13)), 2.5) *
        0.22;

      const warmDust =
        noise(x * 0.08 + 3, y * 0.08 - 4) * 0.045;

      const rockBanding =
        Math.sin(
          heightRatio * 32 +
            y * 0.35 +
            noise(x * 0.065, y * 0.065) * 2.4
        ) * 0.035;

      const color = valleyColor
        .clone()
        .lerp(midColor, smoothstep(0.08, 0.58, heightRatio))
        .lerp(peakColor, smoothstep(0.48, 0.92, heightRatio))
        .lerp(new THREE.Color("#6b6658"), exposedRock * 0.28)
        .lerp(snowColor, snowAmount * 0.82);

      const photographicShade = THREE.MathUtils.clamp(
        light + warmDust + rockBanding - coldCrease,
        0.26,
        1.18
      );

      color.multiplyScalar(photographicShade);

      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    return geo;
  }, [config, variant]);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;

    group.current.position.y =
      config.position[1] + Math.sin(t * 0.12) * config.drift;

    group.current.rotation.z = Math.sin(t * 0.035) * 0.004;
  });

  return (
    <group
      ref={group}
      position={config.position}
      rotation={[-Math.PI / 2.34, config.rotationY, 0]}
    >
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          vertexColors
          roughness={0.96}
          metalness={0}
          envMapIntensity={0.18}
          transparent={config.opacity < 1}
          opacity={config.opacity}
        />
      </mesh>
    </group>
  );
}