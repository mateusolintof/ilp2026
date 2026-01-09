'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Generate particle data outside of component render
function generateParticles(count: number, speed: number) {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;

    velocities[i3] = (Math.random() - 0.5) * speed;
    velocities[i3 + 1] = (Math.random() - 0.5) * speed;
    velocities[i3 + 2] = (Math.random() - 0.5) * speed;
  }

  return { positions, velocities };
}

interface ParticleProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

function Particles({ count = 500, color = '#d06c78', size = 0.02, speed = 0.1 }: ParticleProps) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  // Use useState with lazy initializer for stable particle data
  const [particles] = useState(() => generateParticles(count, speed));

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(particles.positions, 3)
      );
    }
  }, [particles.positions]);

  useFrame((_state, delta) => {
    if (!meshRef.current || !geometryRef.current) return;

    const positionAttr = geometryRef.current.attributes.position;
    if (!positionAttr) return;

    const positions = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] += particles.velocities[i3] * delta;
      positions[i3 + 1] += particles.velocities[i3 + 1] * delta;
      positions[i3 + 2] += particles.velocities[i3 + 2] * delta;

      // Wrap particles around
      if (positions[i3] > 5) positions[i3] = -5;
      if (positions[i3] < -5) positions[i3] = 5;
      if (positions[i3 + 1] > 5) positions[i3 + 1] = -5;
      if (positions[i3 + 1] < -5) positions[i3 + 1] = 5;
      if (positions[i3 + 2] > 5) positions[i3 + 2] = -5;
      if (positions[i3 + 2] < -5) positions[i3 + 2] = 5;
    }

    positionAttr.needsUpdate = true;
    meshRef.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrbs() {
  const orbsRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!orbsRef.current) return;
    orbsRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={orbsRef}>
      <mesh position={[3, 2, -5]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#d06c78" transparent opacity={0.08} />
      </mesh>
      <mesh position={[-4, -1, -3]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#c3a463" transparent opacity={0.06} />
      </mesh>
      <mesh position={[2, -3, -4]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#8aa0c8" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export interface ParticleBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  showOrbs?: boolean;
  className?: string;
}

export function ParticleBackground({
  particleCount = 300,
  particleColor = '#d06c78',
  showOrbs = true,
  className = '',
}: ParticleBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={particleCount} color={particleColor} />
        {showOrbs && <FloatingOrbs />}
      </Canvas>
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
}
