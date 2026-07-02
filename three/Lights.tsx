"use client";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.16} />

      <directionalLight
        position={[14, 18, 8]}
        intensity={3.6}
        color="#fff5d7"
        castShadow
      />

      <pointLight
        position={[-14, 7, 6]}
        intensity={22}
        color="#d4ad4a"
      />

      <spotLight
        position={[2, 24, 12]}
        angle={0.35}
        penumbra={1}
        intensity={16}
        color="#ffffff"
        castShadow
      />
    </>
  );
}
