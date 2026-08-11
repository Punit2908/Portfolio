import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const count = 180;

    const positions = new Float32Array(
      count * 3
    );

    const scales = new Float32Array(
      count
    );

    for (let i = 0; i < count; i++) {
      const radius =
        2.5 +
        Math.random() * 3.5;

      const angle =
        Math.random() *
        Math.PI *
        2;

      positions[i * 3] =
        Math.cos(angle) *
        radius;

      positions[i * 3 + 1] =
        (Math.random() - 0.5) *
        4;

      positions[i * 3 + 2] =
        (Math.random() - 0.5) *
        3;

      scales[i] =
        0.5 +
        Math.random() *
        1.5;
    }

    return {
      positions,
      scales,
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    pointsRef.current.rotation.y =
      time * 0.025;

    pointsRef.current.rotation.x =
      Math.sin(time * 0.15) *
      0.04;

    pointsRef.current.position.y =
      Math.sin(time * 0.3) *
      0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={
            particles.positions.length / 3
          }
          array={
            particles.positions
          }
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.025}
        color="#a855f7"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GlowOrb({
  position,
  color,
  scale,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    ref.current.position.y =
      position[1] +
      Math.sin(
        time * 0.5 +
        position[0]
      ) *
      0.18;

    ref.current.scale.setScalar(
      scale +
        Math.sin(
          time * 0.8 +
          position[0]
        ) *
        0.03
    );
  });

  return (
    <mesh
      ref={ref}
      position={position}
    >
      <sphereGeometry
        args={[1, 32, 32]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ParticleField />

      <GlowOrb
        position={[-2.8, 0.5, -1]}
        color="#8b5cf6"
        scale={1.8}
      />

      <GlowOrb
        position={[2.8, -0.5, -1]}
        color="#3b82f6"
        scale={1.5}
      />

      <GlowOrb
        position={[0, 1.5, -2]}
        color="#ec4899"
        scale={1.2}
      />
    </>
  );
}

export default function AboutAtmosphere() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 5],
          zoom: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference:
            "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}