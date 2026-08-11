import React, {
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

import * as THREE from "three";

/*
============================================================
SKILL DATA
============================================================
*/

const skills = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: 92,
    color: "#61dafb",
    position: [-1.9, 0.9, 0],
  },

  {
    id: "javascript",
    name: "JavaScript",
    category: "Language",
    level: 90,
    color: "#f7df1e",
    position: [-0.7, 1.65, 0],
  },

  {
    id: "tailwind",
    name: "Tailwind",
    category: "Frontend",
    level: 88,
    color: "#38bdf8",
    position: [0.8, 1.35, 0],
  },

  {
    id: "node",
    name: "Node.js",
    category: "Backend",
    level: 86,
    color: "#68a063",
    position: [1.95, 0.55, 0],
  },

  {
    id: "express",
    name: "Express",
    category: "Backend",
    level: 82,
    color: "#ffffff",
    position: [1.2, -0.65, 0],
  },

  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    level: 84,
    color: "#47a248",
    position: [-0.2, -1.15, 0],
  },

  {
    id: "git",
    name: "Git",
    category: "Tools",
    level: 86,
    color: "#f05032",
    position: [-1.65, -0.55, 0],
  },

  {
    id: "html",
    name: "HTML",
    category: "Frontend",
    level: 95,
    color: "#e34f26",
    position: [-2.45, -1.15, 0],
  },

  {
    id: "css",
    name: "CSS",
    category: "Frontend",
    level: 90,
    color: "#1572b6",
    position: [-2.75, 0.25, 0],
  },
];

/*
============================================================
CONNECTIONS
============================================================
*/

const connections = [
  ["react", "javascript"],
  ["react", "tailwind"],
  ["react", "node"],
  ["javascript", "tailwind"],
  ["javascript", "node"],
  ["node", "express"],
  ["express", "mongodb"],
  ["node", "mongodb"],
  ["git", "react"],
  ["git", "node"],
  ["html", "css"],
  ["html", "react"],
  ["css", "react"],
];

/*
============================================================
CREATE LINE GEOMETRY
============================================================
*/

function ConnectionLine({
  start,
  end,
  active,
  color,
}) {
  const materialRef = useRef(null);

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(
        start[0],
        start[1],
        start[2]
      ),

      new THREE.Vector3(
        end[0],
        end[1],
        end[2]
      ),
    ];

    return new THREE.BufferGeometry().setFromPoints(
      points
    );
  }, [start, end]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((state) => {
    if (!materialRef.current) {
      return;
    }

    const pulse =
      Math.sin(
        state.clock.elapsedTime * 2.5
      ) *
      0.5 +
      0.5;

    const targetOpacity =
      active
        ? 0.75 + pulse * 0.2
        : 0.12;

    materialRef.current.opacity +=
      (
        targetOpacity -
        materialRef.current.opacity
      ) *
      0.08;
  });

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </line>
  );
}

/*
============================================================
SKILL NODE
============================================================
*/

function SkillNode({
  skill,
  active,
  onHover,
}) {
  const groupRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    const targetScale =
      active ? 1.28 : 1;

    groupRef.current.scale.x +=
      (
        targetScale -
        groupRef.current.scale.x
      ) *
      0.08;

    groupRef.current.scale.y =
      groupRef.current.scale.x;

    groupRef.current.position.y =
      skill.position[1] +
      Math.sin(
        time * 0.8 +
        skill.position[0]
      ) *
      0.07;

    if (ringRef.current) {
      ringRef.current.rotation.z =
        time *
        (
          active
            ? 1.5
            : 0.4
        );

      ringRef.current.scale.setScalar(
        active
          ? 1.35 +
            Math.sin(
              time * 3
            ) *
            0.08
          : 1
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={skill.position}
      onPointerEnter={() =>
        onHover(skill.id)
      }
      onPointerLeave={() =>
        onHover(null)
      }
    >
      {/* Main node */}

      <mesh>
        <sphereGeometry
          args={[
            active
              ? 0.105
              : 0.075,
            20,
            20,
          ]}
        />

        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={
            active
              ? 1
              : 0.85
          }
        />
      </mesh>

      {/* Outer glow */}

      <mesh scale={1.8}>
        <sphereGeometry
          args={[
            0.075,
            16,
            16,
          ]}
        />

        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={
            active
              ? 0.22
              : 0.06
          }
          depthWrite={false}
        />
      </mesh>

      {/* Orbit ring */}

      {active && (
        <mesh
          ref={ringRef}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              0.15,
              0.008,
              8,
              32,
            ]}
          />

          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </group>
  );
}

/*
============================================================
CONSTELLATION SCENE
============================================================
*/

function ConstellationScene({
  activeSkill,
  setActiveSkill,
}) {
  const groupRef = useRef(null);

  const skillMap = useMemo(() => {
    return Object.fromEntries(
      skills.map((skill) => [
        skill.id,
        skill,
      ])
    );
  }, []);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    groupRef.current.rotation.y =
      Math.sin(time * 0.18) *
      0.035;

    groupRef.current.rotation.x =
      Math.cos(time * 0.14) *
      0.025;
  });

  return (
    <group ref={groupRef}>
      {/* Connections */}

      {connections.map(
        ([from, to], index) => {
          const first =
            skillMap[from];

          const second =
            skillMap[to];

          const isActive =
            activeSkill === from ||
            activeSkill === to;

          const color =
            isActive
              ? first.color
              : "#8b5cf6";

          return (
            <ConnectionLine
              key={index}
              start={first.position}
              end={second.position}
              active={isActive}
              color={color}
            />
          );
        }
      )}

      {/* Nodes */}

      {skills.map((skill) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          active={
            activeSkill === skill.id
          }
          onHover={setActiveSkill}
        />
      ))}
    </group>
  );
}

/*
============================================================
BACKGROUND PARTICLES
============================================================
*/

function BackgroundParticles() {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const count = 280;

    const array =
      new Float32Array(
        count * 3
      );

    for (
      let i = 0;
      i < count;
      i++
    ) {
      array[i * 3] =
        (Math.random() - 0.5) *
        7;

      array[i * 3 + 1] =
        (Math.random() - 0.5) *
        5;

      array[i * 3 + 2] =
        (Math.random() - 0.5) *
        2;
    }

    return array;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y =
      state.clock.elapsedTime *
      0.015;

    pointsRef.current.rotation.z =
      Math.sin(
        state.clock.elapsedTime *
        0.15
      ) *
      0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={
            positions.length / 3
          }
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#a855f7"
        size={0.018}
        transparent
        opacity={0.32}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/*
============================================================
SCENE
============================================================
*/

function Scene({
  activeSkill,
  setActiveSkill,
}) {
  return (
    <>
      <BackgroundParticles />

      <ConstellationScene
        activeSkill={activeSkill}
        setActiveSkill={setActiveSkill}
      />
    </>
  );
}

/*
============================================================
MAIN COMPONENT
============================================================
*/

export default function SkillsConstellation() {
  const [activeSkill, setActiveSkill] =
    React.useState(null);

  return (
    <div
      className="
        absolute
        inset-0
        pointer-events-none
      "
    >
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 5],
          zoom: 100,
        }}
        dpr={[1, 1.5]}
        performance={{
          min: 0.6,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference:
            "high-performance",
        }}
      >
        <Scene
          activeSkill={
            activeSkill
          }
          setActiveSkill={
            setActiveSkill
          }
        />

        <EffectComposer
          multisampling={0}
        >
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.65}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}