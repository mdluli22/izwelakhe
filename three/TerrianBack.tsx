"use client";

import Terrain from "./Terrian";

export default function TerrainBack() {
  return (
    <group
      scale={1.35}
      position={[0, 0, 0]}
      rotation={[0, 0.2, 0]}
    >
      <Terrain back />
    </group>
  );
}
