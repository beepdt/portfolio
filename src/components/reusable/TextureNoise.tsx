import React, { useRef, useMemo } from 'react';
import type { FC } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

// NPM Packages Required:
// npm install react react-dom three @react-three/fiber
// npm install --save-dev typescript @types/react @types/react-dom @types/three

/**
 * Props for TextureNoiseCanvas
 */
interface TextureNoiseCanvasProps {
  width?: string;
  height?: string;
  dpr?: number | number[];
  camera?: {
    fov: number;
    near: number;
    far: number;
    position: [number, number, number];
  };
  textureConfig?: Record<string, THREE.IUniform>;
}

/**
 * A reusable full-screen grainy noise canvas component.
 */
const TextureNoiseCanvas: FC<TextureNoiseCanvasProps> = ({
  width = '100vw',
  height = '100vh',
  dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  camera = { fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] },
  textureConfig = {}
}) => (
  <Canvas
    style={{ width, height }}
    dpr={Array.isArray(dpr) ? (dpr.length === 2 ? [dpr[0], dpr[1]] : dpr[0]) : dpr}
    camera={camera}
    gl={{
      preserveDrawingBuffer: true,
      premultipliedAlpha: false,
      alpha: true,
      antialias: true,
      precision: 'highp',
      powerPreference: 'high-performance'
    }}
    resize={{ debounce: 0, scroll: false, offsetSize: true }}
  >
    <TextureMesh config={textureConfig} />
  </Canvas>
);

interface TextureMeshProps {
  config: Record<string, THREE.IUniform>;
}

const TextureMesh: FC<TextureMeshProps> = ({ config }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const { gl, mouse, clock } = useThree();

  const uniforms = useMemo(() => ({
    u_size: { value: 1 },
    u_amount: { value: 0.298 },
    u_vignette: { value: 0 },
    u_opacity_random: { value: true },
    u_random_seed: { value: Math.random() },
    u_shape: { value: [false, true, false, false, false, false, false] },
    u_shape_image: { value: new THREE.Texture() },
    u_rotation: { value: 0 },
    u_rotation_random: { value: false },
    u_color_random: { value: false },
    u_aa_passes: { value: 2 },
    u_color: { value: [0.1176, 0.1176, 0.1176] },
    u_time: { value: 0 },
    u_mouse: { value: [0, 0] },
    u_resolution: { value: [100, 100] },
    ...config
  }), [config]);

  useFrame(() => {
    if (!mesh.current) return;
    const { x, y } = mouse;
    const material = mesh.current.material as THREE.ShaderMaterial;
    material.uniforms.u_mouse.value = [x / 2 + 0.5, y / 2 + 0.5];
    material.uniforms.u_time.value = clock.getElapsedTime();
    const { width: W, height: H } = gl.domElement.getBoundingClientRect();
    material.uniforms.u_resolution.value = [W, H];
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        fragmentShader={FRAGMENT_SHADER}
        vertexShader={VERTEX_SHADER}
        uniforms={uniforms}
        glslVersion={THREE.WebGLRenderer ? "100" : "300 es"}
        dithering={false}
        toneMapped={false}
        depthTest={false}
        transparent
      />
    </mesh>
  );
};

// GLSL shaders
const VERTEX_SHADER = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const FRAGMENT_SHADER = `
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_size;
uniform float u_vignette;
uniform float u_amount;
uniform bool u_opacity_random;
uniform bool u_rotation_random;
uniform float u_rotation;
uniform float u_random_seed;
uniform bool u_shape[7];
uniform sampler2D u_shape_image;
uniform vec2 u_shape_image_resolution;
uniform float u_aa_passes;

// [Include all SDF and utility functions here as in your original shader...]

void main() {
  staticNoise(u_color, u_size, u_amount, u_rotation, u_opacity_random, u_rotation_random, u_color_random);
}
`;

export default TextureNoiseCanvas;
