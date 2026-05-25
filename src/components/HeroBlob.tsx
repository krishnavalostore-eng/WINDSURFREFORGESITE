import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const Blob: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.4 + Math.sin(state.clock.elapsedTime * 0.8) * 0.4;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group>
        {/* Core blob */}
        <Sphere ref={meshRef as any} args={[2.2, 128, 128]}>
          <MeshDistortMaterial
            color="#0891b2"
            emissive="#06b6d4"
            emissiveIntensity={0.45}
            distort={0.48}
            speed={1.6}
            roughness={0.25}
            metalness={0.65}
          />
        </Sphere>

        {/* Outer dotted wireframe shell */}
        <Sphere args={[2.32, 48, 48]}>
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.22}
          />
        </Sphere>

        {/* Inner glow */}
        <Sphere args={[2.05, 32, 32]}>
          <meshBasicMaterial
            color="#0e7490"
            transparent
            opacity={0.18}
          />
        </Sphere>

        <pointLight ref={lightRef} position={[3, 2, 3]} color="#22d3ee" intensity={2.5} />
        <pointLight position={[-4, -2, -2]} color="#0891b2" intensity={1.8} />
      </group>
    </Float>
  );
};

const FallbackGradient: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full opacity-80"
      style={{
        background:
          'radial-gradient(circle at 35% 35%, #22d3ee 0%, #06b6d4 30%, #0e7490 55%, transparent 75%)',
        filter: 'blur(20px)',
      }}
    />
  </div>
);

interface HeroBlobProps {
  onReady?: () => void;
}

export const HeroBlob: React.FC<HeroBlobProps> = ({ onReady }) => {
  const dpr = useMemo<[number, number]>(() => [1, 1.6], []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <FallbackGradient />
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        onCreated={() => onReady?.()}
      >
        <ambientLight intensity={0.35} />
        <Suspense fallback={null}>
          <Blob />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
      {/* Soft vignette over canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.6) 100%)',
        }}
      />
    </div>
  );
};

export default HeroBlob;
