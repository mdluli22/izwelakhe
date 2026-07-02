"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

export default function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef({ progress: 0 });
  const viewport = useRef({ isSmall: false });
  const cinematic = useMemo(() => ({ x: -10, y: 6.5, z: 21 }), []);

  useEffect(() => {
    const syncViewport = () => {
      viewport.current.isSmall = window.innerWidth < 640;
    };

    const intro = gsap.fromTo(
      cinematic,
      { x: -16, y: 10, z: 27 },
      { x: -10, y: 6.5, z: 21, duration: 2.8, ease: "power3.out" }
    );

    const onPointerMove = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      const maxScroll = Math.max(1, window.innerHeight);
      scroll.current.progress = Math.min(window.scrollY / maxScroll, 1);
    };

    syncViewport();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncViewport, { passive: true });
    onScroll();

    return () => {
      intro.kill();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncViewport);
    };
  }, [cinematic]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { camera } = state;
    const scrollProgress = scroll.current.progress;
    const small = viewport.current.isSmall;
    const targetX = (small ? -5.4 : cinematic.x) + mouse.current.x * (small ? 0.45 : 1.1) + Math.sin(t * 0.08) * (small ? 0.22 : 0.55);
    const targetY = (small ? 6.9 : cinematic.y) - scrollProgress * (small ? 1.4 : 2.4) - mouse.current.y * (small ? 0.28 : 0.65) + Math.sin(t * 0.12) * (small ? 0.16 : 0.28);
    const targetZ = (small ? 29 : cinematic.z) - scrollProgress * (small ? 2.2 : 5.5);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.035);

    camera.lookAt(
      (small ? 5.4 : 2) + mouse.current.x * (small ? 0.35 : 0.9),
      (small ? -2.2 : -1.6) - scrollProgress * (small ? 0.7 : 1.4),
      -7
    );
  });

  return null;
}
