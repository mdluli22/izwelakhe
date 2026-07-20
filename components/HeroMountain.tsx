"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

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
    frequency *= 2.1;
    amplitude *= 0.48;
  }

  return value;
}

function ridged(value: number) {
  return 1 - Math.abs(value);
}

export default function HeroMountain() {
  const group = useRef<THREE.Group>(null!);

  const geometry = useMemo(() => {
    const width = 105;
    const depth = 48;
    const segments = 340;
    const height = 25;

    const geo = new THREE.PlaneGeometry(
      width,
      depth,
      segments,
      Math.floor(segments * 0.52)
    );

    const noise = createNoise2D(seededRandom(41));
    const positions = geo.attributes.position;
    const elevations = new Float32Array(positions.count);

    let highestPoint = 0;

    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const normalizedDepth = (y + depth / 2) / depth;

      /**
       * Fade edges so the mountain dies into darkness
       * instead of looking like a visible rectangular plane.
       */
      const leftFade = smoothstep(-width / 2, -width / 2 + 13, x);
      const rightFade = 1 - smoothstep(width / 2 - 13, width / 2, x);
      const frontFade = smoothstep(0.02, 0.18, normalizedDepth);
      const backFade = 1 - smoothstep(0.94, 1, normalizedDepth);

      const edgeFade = leftFade * rightFade * frontFade * backFade;

      /**
       * Main ridge line.
       * This creates one dominant mountain silhouette instead of many layers.
       */
      const ridgeLine =
        -3.6 +
        Math.sin(x * 0.075) * 4.2 +
        noise(x * 0.026, 2.4) * 8.8 +
        noise(x * 0.063, 12.0) * 3.2;

      const distanceFromRidge = Math.abs(y - ridgeLine);

      const mainMass =
        1 - smoothstep(0, depth * 0.53, distanceFromRidge);

      const secondaryMass =
        1 -
        smoothstep(
          0,
          depth * 0.35,
          Math.abs(
            y -
              ridgeLine +
              noise(x * 0.055 + 7, y * 0.035 - 2) * 8.5
          )
        );

      /**
       * Tall jagged peaks.
       */
      const peakField =
        Math.pow(
          Math.max(
            0,
            ridged(fbm(noise, x * 0.052 + 5, y * 0.07 - 2, 6))
          ),
          2.35
        ) *
        height *
        0.52 *
        smoothstep(0.24, 0.96, mainMass);

      /**
       * Sharp vertical cuts and ravines.
       */
      const ravines =
        Math.pow(
          Math.max(0, noise(x * 0.24 + 34, y * 0.85 - 17)),
          3.1
        ) *
        height *
        0.36 *
        smoothstep(0.22, 0.96, mainMass);

      /**
       * Fine rocky surface detail.
       */
      const crags =
        fbm(noise, x * 0.23 + 19, y * 0.3 - 8, 6) *
        height *
        0.18 *
        smoothstep(0.14, 0.95, mainMass);

      /**
       * Subtle horizontal sediment / rock bands.
       */
      const strata =
        Math.sin(
          y * 0.82 +
            x * 0.26 +
            noise(x * 0.065, y * 0.065) * 5.0
        ) *
        height *
        0.035 *
        mainMass;

      const elevation =
        Math.pow(Math.max(0, mainMass), 2.15) * height +
        Math.pow(Math.max(0, secondaryMass), 2.7) * height * 0.38 +
        peakField +
        crags +
        strata -
        ravines;

      const finalElevation = Math.max(0, elevation) * edgeFade;

      positions.setZ(i, finalElevation);
      elevations[i] = finalElevation;
      highestPoint = Math.max(highestPoint, finalElevation);
    }

    positions.needsUpdate = true;
    geo.computeVertexNormals();

    /**
     * Photographic vertex color pass.
     */
    const colors = new Float32Array(positions.count * 3);
    const normals = geo.attributes.normal;

    const valleyColor = new THREE.Color("#080b0a");
    const lowRock = new THREE.Color("#171916");
    const midRock = new THREE.Color("#3b362a");
    const highRock = new THREE.Color("#8f7b55");
    const snowColor = new THREE.Color("#eee2c8");

    const sunDirection = new THREE.Vector3(-0.44, -0.28, 0.86).normalize();

    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const normal = new THREE.Vector3(
        normals.getX(i),
        normals.getY(i),
        normals.getZ(i)
      ).normalize();

      const heightRatio = elevations[i] / Math.max(highestPoint, 1);

      const slope = 1 - Math.max(0, normal.z);
      const cliffAmount = smoothstep(0.28, 0.9, slope);

      const snowAmount =
        smoothstep(0.74, 1, heightRatio) *
        smoothstep(0.48, 0.86, normal.z) *
        (1 - cliffAmount * 0.75);

      const exposedCliff =
        smoothstep(0.36, 0.92, heightRatio) *
        smoothstep(0.25, 0.8, slope);

      const directLight = Math.max(0, normal.dot(sunDirection));
      const rimLight = Math.pow(directLight, 1.7);

      const darkCreases =
        Math.pow(Math.max(0, noise(x * 0.36 - 11, y * 0.86 + 4)), 2.4) *
        0.32;

      const warmGranite =
        noise(x * 0.08 + 3, y * 0.09 - 4) * 0.055;

      const banding =
        Math.sin(
          heightRatio * 38 +
            y * 0.42 +
            noise(x * 0.06, y * 0.06) * 2.8
        ) * 0.04;

      const color = valleyColor
        .clone()
        .lerp(lowRock, smoothstep(0.05, 0.35, heightRatio))
        .lerp(midRock, smoothstep(0.28, 0.72, heightRatio))
        .lerp(highRock, exposedCliff * 0.45)
        .lerp(snowColor, snowAmount * 0.72);

      const shade = THREE.MathUtils.clamp(
        0.22 + directLight * 0.82 + rimLight * 0.48 + warmGranite + banding - darkCreases,
        0.08,
        1.32
      );

      color.multiplyScalar(shade);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    return geo;
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;

    group.current.rotation.z = Math.sin(t * 0.025) * 0.003;
    group.current.position.y = -11.6 + Math.sin(t * 0.09) * 0.035;
  });

  return (
    <group
      ref={group}
      position={[9, -11.6, -18]}
      rotation={[-Math.PI / 2.42, -0.16, 0]}
      scale={[1.08, 1.08, 1.08]}
    >
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          vertexColors
          roughness={0.98}
          metalness={0}
          envMapIntensity={0.12}
        />
      </mesh>
    </group>
  );
}