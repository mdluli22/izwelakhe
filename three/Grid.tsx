"use client";

import { Grid } from "@react-three/drei";

export default function EngineeringGrid() {
  return (
    <Grid
      position={[4, -7.2, -5]}
      args={[140, 140]}
      cellSize={1}
      cellThickness={0.18}
      cellColor="#6d684c"
      sectionSize={8}
      sectionThickness={0.9}
      sectionColor="#d4ad4a"
      fadeDistance={48}
      fadeStrength={1.35}
      infiniteGrid
    />
  );
}
