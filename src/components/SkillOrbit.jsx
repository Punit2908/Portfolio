import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Code2,
  Database,
  GitBranch,
  Globe,
  Server,
  Sparkles,
  Move,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DESKTOP_SKILLS = [
  {
    id: "react",
    number: "01",
    title: "React",
    category: "Frontend",
    description:
      "Component-driven interfaces with reusable architecture, state and polished interactions.",
    icon: Code2,
    color: "#61dafb",
    x: 16,
    y: 22,
  },
  {
    id: "javascript",
    number: "02",
    title: "JavaScript",
    category: "Language",
    description:
      "Application logic, asynchronous workflows, browser APIs and interactive behavior.",
    icon: Sparkles,
    color: "#f7df1e",
    x: 50,
    y: 12,
  },
  {
    id: "tailwind",
    number: "03",
    title: "Tailwind",
    category: "Styling",
    description:
      "Responsive interfaces with consistent spacing, typography and visual systems.",
    icon: Code2,
    color: "#38bdf8",
    x: 84,
    y: 22,
  },
  {
    id: "node",
    number: "04",
    title: "Node.js",
    category: "Runtime",
    description:
      "Server-side JavaScript for APIs, backend services and full-stack application logic.",
    icon: Server,
    color: "#68a063",
    x: 87,
    y: 52,
  },
  {
    id: "express",
    number: "05",
    title: "Express",
    category: "Backend",
    description:
      "REST APIs, middleware, routing and structured request handling.",
    icon: Server,
    color: "#a8a8a8",
    x: 72,
    y: 80,
  },
  {
    id: "mongodb",
    number: "06",
    title: "MongoDB",
    category: "Database",
    description:
      "Document-based data modeling, persistence and database integration.",
    icon: Database,
    color: "#47a248",
    x: 28,
    y: 80,
  },
  {
    id: "git",
    number: "07",
    title: "Git",
    category: "Workflow",
    description:
      "Version control, branching and collaboration for organized development.",
    icon: GitBranch,
    color: "#f05032",
    x: 13,
    y: 52,
  },
  {
    id: "html",
    number: "08",
    title: "HTML / CSS",
    category: "Foundation",
    description:
      "Semantic structure, responsive layouts and polished visual foundations.",
    icon: Globe,
    color: "#e34f26",
    x: 50,
    y: 91,
  },
];

const MOBILE_SKILLS = [
  {
    id: "react",
    number: "01",
    title: "React",
    category: "Frontend",
    description:
      "Reusable components and interactive interfaces.",
    icon: Code2,
    color: "#61dafb",
    x: 25,
    y: 18,
  },
  {
    id: "javascript",
    number: "02",
    title: "JavaScript",
    category: "Language",
    description:
      "Application logic and browser interaction.",
    icon: Sparkles,
    color: "#f7df1e",
    x: 75,
    y: 18,
  },
  {
    id: "tailwind",
    number: "03",
    title: "Tailwind",
    category: "Styling",
    description:
      "Responsive interfaces and visual systems.",
    icon: Code2,
    color: "#38bdf8",
    x: 86,
    y: 42,
  },
  {
    id: "node",
    number: "04",
    title: "Node.js",
    category: "Runtime",
    description:
      "Backend services and APIs.",
    icon: Server,
    color: "#68a063",
    x: 80,
    y: 70,
  },
  {
    id: "express",
    number: "05",
    title: "Express",
    category: "Backend",
    description:
      "REST APIs and middleware.",
    icon: Server,
    color: "#a8a8a8",
    x: 68,
    y: 88,
  },
  {
    id: "mongodb",
    number: "06",
    title: "MongoDB",
    category: "Database",
    description:
      "Data modeling and persistence.",
    icon: Database,
    color: "#47a248",
    x: 32,
    y: 88,
  },
  {
    id: "git",
    number: "07",
    title: "Git",
    category: "Workflow",
    description:
      "Version control and collaboration.",
    icon: GitBranch,
    color: "#f05032",
    x: 20,
    y: 70,
  },
  {
    id: "html",
    number: "08",
    title: "HTML / CSS",
    category: "Foundation",
    description:
      "Structure, layout and styling.",
    icon: Globe,
    color: "#e34f26",
    x: 14,
    y: 42,
  },
];

const ROOT = {
  x: 50,
  y: 50,
};

const CARD_WIDTH = 190;
const CARD_HEIGHT = 190;


/*
============================================================
SKILL ORBIT
============================================================
*/

function SkillOrbit() {
  const containerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  const [skills, setSkills] =
    useState(DESKTOP_SKILLS);

  const [activeSkill, setActiveSkill] =
    useState(null);

  const [draggingSkill, setDraggingSkill] =
    useState(null);


  /*
  ==========================================================
  RESPONSIVE MODE
  ==========================================================
  */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 640px)"
    );

    const updateMode = () => {
      const mobile =
        mediaQuery.matches;

      setIsMobile(mobile);

      setSkills(
        mobile
          ? MOBILE_SKILLS
          : DESKTOP_SKILLS
      );
    };

    updateMode();

    mediaQuery.addEventListener(
      "change",
      updateMode
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMode
      );
    };
  }, []);


  /*
  ==========================================================
  MOUSE PARALLAX
  ==========================================================
  */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(
    mouseX,
    {
      stiffness: 70,
      damping: 24,
      mass: 0.5,
    }
  );

  const smoothY = useSpring(
    mouseY,
    {
      stiffness: 70,
      damping: 24,
      mass: 0.5,
    }
  );


  const handlePointerMove = (event) => {
    if (
      draggingSkill ||
      !containerRef.current
    ) {
      return;
    }

    const rect =
      containerRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    mouseX.set(x);
    mouseY.set(y);
  };


  const handlePointerLeave = () => {
    if (!draggingSkill) {
      mouseX.set(0);
      mouseY.set(0);
      setActiveSkill(null);
    }
  };


  /*
  ==========================================================
  DRAG HANDLING
  ==========================================================
  */

  const handleDragEnd = (
    event,
    info,
    skill
  ) => {
    if (!containerRef.current) {
      return;
    }

    const rect =
      containerRef.current.getBoundingClientRect();

    /*
    Convert dragged pixel distance
    into percentage movement.
    */

    const deltaX =
      (info.offset.x /
        rect.width) *
      100;

    const deltaY =
      (info.offset.y /
        rect.height) *
      100;

    setSkills((current) =>
      current.map((item) => {
        if (item.id !== skill.id) {
          return item;
        }

        const cardHalfWidth =
          (CARD_WIDTH /
            rect.width) *
          50;

        const cardHalfHeight =
          (CARD_HEIGHT /
            rect.height) *
          50;

        const minX =
          Math.max(
            9,
            cardHalfWidth
          );

        const maxX =
          Math.min(
            91,
            100 - cardHalfWidth
          );

        const minY =
          Math.max(
            12,
            cardHalfHeight
          );

        const maxY =
          Math.min(
            92,
            100 - cardHalfHeight
          );

        const newX = Math.min(
          maxX,
          Math.max(
            minX,
            item.x + deltaX
          )
        );

        const newY = Math.min(
          maxY,
          Math.max(
            minY,
            item.y + deltaY
          )
        );

        return {
          ...item,
          x: newX,
          y: newY,
        };
      })
    );

    setDraggingSkill(null);

    mouseX.set(0);
    mouseY.set(0);
  };


  /*
  ==========================================================
  RESET POSITIONS
  ==========================================================
  */

  const resetPositions = () => {
    setSkills(
      isMobile
        ? MOBILE_SKILLS
        : DESKTOP_SKILLS
    );

    setActiveSkill(null);
  };


  return (
    <section
      ref={containerRef}
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
      className="
        skill-orbit-container
        relative
        mt-20
        h-[900px]
        overflow-hidden
        rounded-[2.5rem]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        sm:h-[920px]
        md:h-[960px]
      "
    >

      {/* ==================================================
          BACKGROUND
          ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)]
            [background-size:55px_55px]
          "
        />


        {/* Main atmospheric glow */}

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.05, 0.09, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[430px]
            w-[430px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[var(--accent)]
            blur-[150px]
          "
        />


        {/* Secondary glow */}

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[5%]
            top-[35%]
            h-[220px]
            w-[220px]
            rounded-full
            bg-purple-500
            opacity-[0.025]
            blur-[120px]
          "
        />

      </div>


      {/* ==================================================
          HEADER
          ================================================== */}

      <div
        className="
          absolute
          left-7
          top-7
          z-[70]
          flex
          items-center
          gap-3
          sm:left-9
          sm:top-9
        "
      >

        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-[var(--accent)]
            shadow-[0_0_14px_var(--accent)]
          "
        />

        <span
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[var(--muted)]
          "
        >
          Interactive skill network
        </span>

      </div>


      {/* ==================================================
          RESET BUTTON
          ================================================== */}

      <button
        type="button"
        onClick={resetPositions}
        className="
          absolute
          right-7
          top-7
          z-[70]
          rounded-full
          border
          border-[var(--border)]
          bg-[var(--background)]
          px-3
          py-2
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-[var(--muted)]
          transition-all
          duration-300
          hover:border-[var(--accent)]
          hover:text-[var(--foreground)]
          sm:right-9
          sm:top-9
        "
      >
        Reset
      </button>


      {/* ==================================================
          OUTER ORBIT
          ================================================== */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[5]
          h-[570px]
          w-[570px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-dashed
          border-[var(--accent)]
          opacity-[0.07]
          sm:h-[650px]
          sm:w-[650px]
          md:h-[720px]
          md:w-[720px]
        "
      />


      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[5]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[var(--accent)]
          opacity-[0.045]
          sm:h-[500px]
          sm:w-[500px]
        "
      />


      {/* ==================================================
          3D PARALLAX WORLD
          ================================================== */}

      <motion.div
        style={{
          rotateX: useSpring(
            useMotionValue(0),
            {
              stiffness: 50,
              damping: 25,
            }
          ),
          rotateY: useSpring(
            useMotionValue(0),
            {
              stiffness: 50,
              damping: 25,
            }
          ),
          transformPerspective: 1400,
        }}
        className="
          absolute
          inset-0
        "
      >

        {/* ==================================================
            CONNECTION GRAPH
            ================================================== */}

        <SkillConnections
          skills={skills}
          activeSkill={activeSkill}
        />


        {/* ==================================================
            CENTER
            ================================================== */}

        <CenterRoot
          activeSkill={activeSkill}
          draggingSkill={draggingSkill}
        />


        {/* ==================================================
            SKILL CARDS
            ================================================== */}

        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            active={
              activeSkill === skill.id
            }
            dragging={
              draggingSkill === skill.id
            }
            onEnter={() =>
              setActiveSkill(
                skill.id
              )
            }
            onLeave={() => {
              if (
                draggingSkill !==
                skill.id
              ) {
                setActiveSkill(null);
              }
            }}
            onDragStart={() => {
              setDraggingSkill(
                skill.id
              );

              setActiveSkill(
                skill.id
              );
            }}
            onDragEnd={(
              event,
              info
            ) =>
              handleDragEnd(
                event,
                info,
                skill
              )
            }
          />
        ))}

      </motion.div>


      {/* ==================================================
          BOTTOM HELP
          ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-7
          left-1/2
          z-[70]
          flex
          -translate-x-1/2
          items-center
          gap-2
          whitespace-nowrap
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-[var(--muted)]
          opacity-80
          sm:bottom-9
        "
      >
        <Move size={12} />
        Drag skills to explore
      </div>

    </section>
  );
}


/*
============================================================
CONNECTION GRAPH
============================================================
*/

function SkillConnections({
  skills,
  activeSkill,
}) {
  return (
    <svg
      className="
        pointer-events-none
        absolute
        inset-0
        z-10
        h-full
        w-full
      "
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >

      <defs>

        <filter
          id="skillGlow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur
            stdDeviation="0.8"
            result="blur"
          />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id="activeLine"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="#a855f7"
          />

          <stop
            offset="50%"
            stopColor="#c084fc"
          />

          <stop
            offset="100%"
            stopColor="#60a5fa"
          />
        </linearGradient>

      </defs>


      {skills.map((skill) => {
        const isActive =
          activeSkill ===
          skill.id;

        const dx =
          skill.x - ROOT.x;

        const dy =
          skill.y - ROOT.y;

        const curve =
          Math.max(
            -10,
            Math.min(
              10,
              dx * 0.06
            )
          );

        const controlX =
          ROOT.x +
          dx * 0.5 +
          curve;

        const controlY =
          ROOT.y +
          dy * 0.5;

        const path = `
          M ${ROOT.x} ${ROOT.y}
          Q ${controlX} ${controlY}
            ${skill.x} ${skill.y}
        `;

        return (
          <g key={skill.id}>

            {/* Base line */}

            <path
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth={
                isActive
                  ? "0.32"
                  : "0.12"
              }
              className={
                isActive
                  ? "text-[var(--accent)]"
                  : "text-[var(--border)]"
              }
              opacity={
                isActive
                  ? 1
                  : 0.55
              }
              vectorEffect="non-scaling-stroke"
            />


            {/* Active glow */}

            {isActive && (
              <>
                <path
                  d={path}
                  fill="none"
                  stroke="url(#activeLine)"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  filter="url(#skillGlow)"
                  opacity="0.6"
                  vectorEffect="non-scaling-stroke"
                />

                <circle
                  r="0.6"
                  fill={skill.color}
                  filter="url(#skillGlow)"
                >
                  <animateMotion
                    dur="1.4s"
                    repeatCount="indefinite"
                    path={path}
                  />
                </circle>
              </>
            )}

          </g>
        );
      })}
    </svg>
  );
}


/*
============================================================
CENTER ROOT
============================================================
*/

function CenterRoot({
  activeSkill,
  draggingSkill,
}) {
  return (
    <motion.div
      animate={{
        scale:
          activeSkill ||
          draggingSkill
            ? 1.06
            : 1,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-30
        flex
        h-32
        w-32
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-[var(--accent)]
        bg-[var(--background)]
        shadow-[0_0_60px_rgba(168,85,247,0.18)]
        sm:h-40
        sm:w-40
      "
    >

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-2
          rounded-full
          border
          border-dashed
          border-[var(--accent)]
          opacity-20
        "
      />

      <div
        className="
          absolute
          inset-5
          rounded-full
          bg-[var(--accent)]
          opacity-[0.035]
          blur-2xl
        "
      />

      <div
        className="
          relative
          z-10
          text-center
        "
      >
        <div
          className="
            text-[9px]
            uppercase
            tracking-[0.35em]
            text-[var(--muted)]
          "
        >
          Root
        </div>

        <div
          className="
            mt-2
            text-lg
            font-semibold
            tracking-[-0.03em]
            sm:text-xl
          "
        >
          Punit
        </div>

        <div
          className="
            mt-1
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-[var(--accent)]
          "
        >
          MERN Stack
        </div>
      </div>

    </motion.div>
  );
}


/*
============================================================
SKILL CARD
============================================================
*/

function SkillCard({
  skill,
  active,
  dragging,
  onEnter,
  onLeave,
  onDragStart,
  onDragEnd,
}) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.1,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}

      /*
      ======================================================
      DRAG
      ======================================================
      */

      drag
      dragMomentum={false}
      dragElastic={0.04}

      onDragStart={onDragStart}
      onDragEnd={onDragEnd}

      onPointerEnter={onEnter}
      onPointerLeave={onLeave}

      whileHover={{
        scale:
          dragging
            ? 1
            : 1.04,
      }}

      whileTap={{
        scale: 1.03,
      }}

      style={{
        left: `${skill.x}%`,
        top: `${skill.y}%`,
        x: "-50%",
        y: "-50%",
        touchAction: "none",
        zIndex: dragging
          ? 100
          : active
          ? 60
          : 20,
      }}

      className="
        group
        absolute
        w-[145px]
        cursor-grab
        sm:w-[190px]
        md:w-[205px]
        active:cursor-grabbing
      "
    >

      {/* ==================================================
          GLOW
          ================================================== */}

      <motion.div
        animate={{
          opacity:
            active ||
            dragging
              ? 0.38
              : 0,
          scale:
            active ||
            dragging
              ? 1.12
              : 0.9,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
          pointer-events-none
          absolute
          -inset-5
          rounded-[2rem]
          blur-2xl
        "
        style={{
          background:
            skill.color,
        }}
      />


      {/* ==================================================
          CARD
          ================================================== */}

      <div
        className={`
          skill-orbit-card
          relative
          overflow-hidden
          rounded-[1.35rem]
          border
          p-4
          sm:rounded-[1.5rem]
          sm:p-5
          ${
            active ||
            dragging
              ? "skill-orbit-card-active"
              : ""
          }
        `}
        style={{
          "--skill-color":
            skill.color,
        }}
      >

        {/* Glass sweep */}

        <div
          className="
            pointer-events-none
            absolute
            -left-[100%]
            top-0
            h-full
            w-[45%]
            rotate-[18deg]
            bg-white/[0.055]
            blur-xl
            transition-transform
            duration-700
            group-hover:translate-x-[400%]
          "
        />


        {/* Top */}

        <div
          className="
            relative
            flex
            items-start
            justify-between
          "
        >

          <span
            className="
              text-[9px]
              tracking-[0.25em]
              text-[var(--muted)]
            "
          >
            {skill.number}
          </span>


          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-[var(--border)]
              bg-[var(--background)]
            "
            style={{
              color:
                active ||
                dragging
                  ? skill.color
                  : "var(--muted)",

              boxShadow:
                active ||
                dragging
                  ? `0 0 20px ${skill.color}33`
                  : "none",
            }}
          >
            <Icon size={16} />
          </div>

        </div>


        {/* Category */}

        <div
          className="
            relative
            mt-5
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-[var(--muted)]
            sm:text-[9px]
          "
          style={{
            color:
              active ||
              dragging
                ? skill.color
                : undefined,
          }}
        >
          {skill.category}
        </div>


        {/* Title */}

        <h3
          className="
            relative
            mt-1.5
            text-lg
            font-semibold
            tracking-[-0.03em]
            sm:text-xl
          "
        >
          {skill.title}
        </h3>


        {/* Description */}

        <p
          className="
            relative
            mt-2
            text-[10px]
            leading-5
            text-[var(--muted)]
            sm:text-xs
          "
        >
          {skill.description}
        </p>


        {/* Bottom indicator */}

        <div
          className="
            relative
            mt-4
            flex
            items-center
            justify-between
          "
        >

          <div
            className="
              h-px
              flex-1
              overflow-hidden
              bg-[var(--border)]
            "
          >
            <motion.div
              animate={{
                x:
                  active ||
                  dragging
                    ? [
                        "-100%",
                        "200%",
                      ]
                    : "-100%",
              }}
              transition={{
                duration: 1.4,
                repeat:
                  active ||
                  dragging
                    ? Infinity
                    : 0,
                ease: "linear",
              }}
              className="
                h-full
                w-1/2
              "
              style={{
                background:
                  skill.color,
                boxShadow:
                  `0 0 12px ${skill.color}`,
              }}
            />
          </div>

          <Move
            size={11}
            className="
              ml-2
              text-[var(--muted)]
              opacity-50
            "
          />

        </div>

      </div>

    </motion.div>
  );
}

export default SkillOrbit;