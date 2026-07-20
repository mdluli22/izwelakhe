"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader.js";

export default function PostProcessing() {
  const { gl, scene, camera, size, viewport } = useThree();

  const composer = useMemo(() => {
    const effectComposer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.22,
      0.56,
      0.38
    );
    const bokehPass = new BokehPass(scene, camera, {
      focus: 24,
      aperture: 0.00008,
      maxblur: 0.0024,
      aspect: size.width / size.height,
    });
    const vignettePass = new ShaderPass(VignetteShader);

    vignettePass.uniforms.offset.value = 1.08;
    vignettePass.uniforms.darkness.value = 1.18;

    effectComposer.addPass(renderPass);
    effectComposer.addPass(bloomPass);
    effectComposer.addPass(bokehPass);
    effectComposer.addPass(vignettePass);
    effectComposer.addPass(new OutputPass());

    return effectComposer;
  }, [camera, gl, scene, size.height, size.width]);

  useEffect(() => {
    composer.setSize(size.width, size.height);
    composer.setPixelRatio(Math.min(viewport.dpr, 1.5));
  }, [composer, size.height, size.width, viewport.dpr]);

  useEffect(() => () => composer.dispose(), [composer]);

  useFrame((_, delta) => {
    composer.render(delta);
  }, 1);

  return null;
}
