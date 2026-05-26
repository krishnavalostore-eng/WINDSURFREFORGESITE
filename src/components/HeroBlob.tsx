import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const Blob: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const segments = isMobile ? 64 : 128;
  const shellSegments = isMobile ? 32 : 48;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.13;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.12;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.6 + Math.sin(state.clock.elapsedTime * 0.7) * 0.4;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
      <group scale={isMobile ? 0.72 : 1}>
        {/* Core glossy liquid blob */}
        <Sphere ref={meshRef as any} args={[2.2, segments, segments]}>
          <MeshDistortMaterial
            color="#0e7490"
            emissive="#06b6d4"
            emissiveIntensity={0.35}
            distort={0.35}
            speed={1.4}
            roughness={0.18}
            metalness={0.9}
          />
        </Sphere>

        {/* Outer wireframe shell — crisp rim */}
        <Sphere args={[2.34, shellSegments, shellSegments]}>
          <meshBasicMaterial
            color="#67e8f9"
            wireframe
            transparent
            opacity={0.14}
          />
        </Sphere>

        {/* Cyan key light */}
        <pointLight ref={lightRef} position={[3, 2.5, 3]} color="#22d3ee" intensity={2.8} />
        {/* Soft magenta rim light for iridescence */}
        <pointLight position={[-3.5, -1.5, -2]} color="#a78bfa" intensity={0.7} />
        {/* Fill */}
        <pointLight position={[0, -3, 2]} color="#0891b2" intensity={1.2} />
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const dpr = useMemo<[number, number]>(() => (isMobile ? [1, 1.2] : [1, 1.4]), [isMobile]);

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <FallbackGradient />
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, isMobile ? 7.5 : 6.5], fov: 45 }}
        onCreated={() => onReady?.()}
      >
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          <Blob isMobile={isMobile} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(2,6,23,0.65) 100%)',
        }}
      />
    </div>
  );
};

export default HeroBlob;
