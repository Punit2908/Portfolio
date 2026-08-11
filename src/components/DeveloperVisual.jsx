import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  Check,
  Code2,
  Database,
  GitBranch,
  Server,
  Terminal,
} from "lucide-react";

function DeveloperVisual() {
  /*
   * --------------------------------------------------
   * Mouse movement for terminal tilt
   * --------------------------------------------------
   */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  /*
   * --------------------------------------------------
   * Detect desktop
   * --------------------------------------------------
   */

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const updateScreenSize = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateScreenSize();

    mediaQuery.addEventListener(
      "change",
      updateScreenSize
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateScreenSize
      );
    };
  }, []);

  /*
   * --------------------------------------------------
   * Mouse movement
   * --------------------------------------------------
   */

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDesktop) return;

      const x =
        (event.clientX / window.innerWidth - 0.5) * 8;

      const y =
        (event.clientY / window.innerHeight - 0.5) * -8;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [isDesktop, mouseX, mouseY]);

  /*
   * --------------------------------------------------
   * Drag boundary
   * --------------------------------------------------
   */

  const visualRef = useRef(null);

  return (
    <div
      ref={visualRef}
      className="
        relative
        mx-auto
        mt-20
        h-[340px]
        w-full
        max-w-4xl
        sm:h-[360px]
        md:mt-24
        md:h-[390px]
      "
    >
      {/* ==================================================
          AMBIENT BACKGROUND GLOW
          ================================================== */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.04, 0.09, 0.04],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[var(--accent)]
          blur-[110px]
          sm:h-80
          sm:w-80
        "
      />

      {/* ==================================================
          FLOATING TECHNOLOGY BADGES
          ================================================== */}

      <FloatingBadge
        icon={<Code2 size={17} />}
        label="React"
        className="
          left-[0%]
          top-[18%]
          lg:left-[4%]
        "
        delay={0}
        draggable={isDesktop}
        constraintsRef={visualRef}
      />

      <FloatingBadge
        icon={<Server size={17} />}
        label="Node.js"
        className="
          right-[0%]
          top-[13%]
          lg:right-[4%]
        "
        delay={0.8}
        draggable={isDesktop}
        constraintsRef={visualRef}
      />

      <FloatingBadge
        icon={<Database size={17} />}
        label="MongoDB"
        className="
          bottom-[10%]
          left-[2%]
          lg:left-[6%]
        "
        delay={1.2}
        draggable={isDesktop}
        constraintsRef={visualRef}
      />

      <FloatingBadge
        icon={<GitBranch size={17} />}
        label="Git"
        className="
          bottom-[14%]
          right-[2%]
          lg:right-[6%]
        "
        delay={1.6}
        draggable={isDesktop}
        constraintsRef={visualRef}
      />

      {/* ==================================================
          MAIN TERMINAL
          ================================================== */}

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        initial={{
          opacity: 0,
          y: 45,
          scale: 0.94,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.3,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          scale: 1.015,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          w-[94%]
          max-w-xl
          -translate-x-1/2
          -translate-y-1/2
          sm:w-[90%]
        "
      >
        {/* ==================================================
            GRADIENT BORDER
            ================================================== */}

        <div
          className="
            rounded-2xl
            bg-gradient-to-br
            from-[var(--border)]
            via-[var(--accent)]/30
            to-[var(--border)]
            p-[1px]
          "
        >
          {/* ==================================================
              TERMINAL WINDOW
              ================================================== */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              bg-[var(--surface)]
              text-left
              shadow-2xl
              shadow-black/10
            "
          >
            {/* ==================================================
                TERMINAL HEADER
                ================================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--border)]
                bg-[var(--surface)]
                px-4
                py-3
                sm:px-5
              "
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-[var(--muted)]
                "
              >
                <Terminal size={13} />
                <span>portfolio</span>
              </div>
            </div>

            {/* ==================================================
                TERMINAL CONTENT
                ================================================== */}

            <div
              className="
                p-5
                font-mono
                text-xs
                sm:p-6
                sm:text-sm
              "
            >
              {/* Command */}

              <div
                className="
                  mb-5
                  overflow-hidden
                  whitespace-nowrap
                  text-[var(--muted)]
                "
              >
                <span className="text-[var(--accent)]">
                  ~/punit
                </span>

                <span> $ npm run dev</span>
              </div>

              {/* Stack */}

              <div className="space-y-3">
                <TerminalLine>
                  <Check
                    size={15}
                    strokeWidth={2.5}
                    className="shrink-0 text-green-500"
                  />
                  <span>React</span>
                </TerminalLine>

                <TerminalLine>
                  <Check
                    size={15}
                    strokeWidth={2.5}
                    className="shrink-0 text-green-500"
                  />
                  <span>Node.js</span>
                </TerminalLine>

                <TerminalLine>
                  <Check
                    size={15}
                    strokeWidth={2.5}
                    className="shrink-0 text-green-500"
                  />
                  <span>Express</span>
                </TerminalLine>

                <TerminalLine>
                  <Check
                    size={15}
                    strokeWidth={2.5}
                    className="shrink-0 text-green-500"
                  />
                  <span>MongoDB</span>
                </TerminalLine>
              </div>

              {/* Build progress */}

              <div className="mt-7">
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                    text-[10px]
                    text-[var(--muted)]
                    sm:text-xs
                  "
                >
                  <span>
                    building experience
                  </span>

                  <motion.span
                    initial={{
                      opacity: 0.4,
                    }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    100%
                  </motion.span>
                </div>

                <div
                  className="
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-[var(--border)]
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "100%",
                    }}
                    viewport={{
                      once: false,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.4,
                      ease: "easeOut",
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-[var(--accent)]
                    "
                  />
                </div>
              </div>

              {/* Blinking cursor */}

              <motion.div
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  mt-5
                  inline-block
                  h-4
                  w-2
                  bg-[var(--foreground)]
                "
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   TERMINAL LINE
   ============================================================ */

function TerminalLine({ children }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        text-[var(--foreground)]
      "
    >
      {children}
    </div>
  );
}

/* ============================================================
   FLOATING BADGE
   ============================================================ */

function FloatingBadge({
  icon,
  label,
  className,
  delay = 0,
  draggable,
  constraintsRef,
}) {
  return (
    <motion.div
      drag={draggable}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
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
        amount: 0.3,
      }}
      animate={{
        y: draggable
          ? [0, -8, 0]
          : [0, -8, 0],
      }}
      transition={{
        opacity: {
          duration: 0.5,
          delay,
        },

        scale: {
          duration: 0.5,
          delay,
        },

        y: {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      whileDrag={{
        scale: 1.08,
        zIndex: 50,
        cursor: "grabbing",
      }}
      className={`
        absolute
        hidden
        sm:block
        ${className}
        ${
          draggable
            ? "cursor-grab"
            : "cursor-default"
        }
      `}
    >
      <div
        className="
          flex
          select-none
          items-center
          gap-2
          rounded-full
          border
          border-[var(--border)]
          bg-[var(--surface)]/80
          px-4
          py-2.5
          text-sm
          text-[var(--muted)]
          shadow-lg
          backdrop-blur-md
          transition-colors
          duration-300
        "
      >
        {icon}

        <span>{label}</span>
      </div>
    </motion.div>
  );
}

export default DeveloperVisual;