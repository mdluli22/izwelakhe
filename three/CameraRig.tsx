"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

export default function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef({ progress: 0 });
  const viewport = useRef({ isSmall: false });
  const cinematic = useMemo(() => ({ x: -10.5, y: 7.6, z: 26 }), []);

  useEffect(() => {
    const syncViewport = () => {
      viewport.current.isSmall = window.innerWidth < 640;
    };

    const intro = gsap.fromTo(
      cinematic,
      { x: -16, y: 10.5, z: 34 },
      { x: -10.5, y: 7.6, z: 26, duration: 2.8, ease: "power3.out" }
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
    const targetX = (small ? -6.4 : cinematic.x) + mouse.current.x * (small ? 0.55 : 1.45) + Math.sin(t * 0.08) * (small ? 0.2 : 0.46);
    const targetY = (small ? 8.4 : cinematic.y) - scrollProgress * (small ? 1.2 : 2.1) - mouse.current.y * (small ? 0.36 : 0.82) + Math.sin(t * 0.12) * (small ? 0.14 : 0.24);
    const targetZ = (small ? 31 : cinematic.z) - scrollProgress * (small ? 1.8 : 4.6) + mouse.current.x * (small ? 0.18 : 0.5);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.035);

    camera.lookAt(
      (small ? 6.3 : 5) + mouse.current.x * (small ? 0.5 : 1.25),
      (small ? -2.9 : -2.3) - scrollProgress * (small ? 0.58 : 1.15),
      -22
    );
  });

  return null;
}
