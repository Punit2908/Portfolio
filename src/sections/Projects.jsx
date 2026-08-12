import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";

import { useRef } from "react";

import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";

import projects from "../data/projects";


/*
============================================================
DESKTOP PROJECT
============================================================
*/

function DesktopProject({
  project,
  index,
}) {
  const ref = useRef(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: ref,
    offset: [
      "start end",
      "end start",
    ],
  });

  /*
  ----------------------------------------------------------
  Vertical movement
  ----------------------------------------------------------
  */

  const y = useTransform(
    scrollYProgress,
    [0, 0.14, 0.52, 0.82, 1],
    [110, 20, 0, -10, -100]
  );

  /*
  ----------------------------------------------------------
  Depth scale
  ----------------------------------------------------------
  */

  const scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.35, 0.7, 1],
    [
      0.84,
      0.94,
      1,
      0.97,
      0.86,
    ]
  );

  /*
  ----------------------------------------------------------
  Opacity
  ----------------------------------------------------------
  */

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.78, 1],
    [
      0,
      0.7,
      1,
      1,
      0.18,
    ]
  );

  /*
  ----------------------------------------------------------
  Rotation
  ----------------------------------------------------------
  */

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.18, 0.45, 0.78, 1],
    [
      index % 2 === 0
        ? -5
        : 5,

      index % 2 === 0
        ? -2
        : 2,

      0,

      0,

      index % 2 === 0
        ? 2
        : -2,
    ]
  );

  /*
  ----------------------------------------------------------
  Depth blur
  ----------------------------------------------------------
  */

  const filter = useTransform(
    scrollYProgress,
    [0, 0.18, 0.35, 0.78, 1],
    [
      "blur(4px)",
      "blur(1px)",
      "blur(0px)",
      "blur(0px)",
      "blur(3px)",
    ]
  );

  return (
    <div
      ref={ref}
      className="project-scroll-stage"
    >
      <motion.div
        style={{
          y,
          scale,
          opacity,
          rotate,
          filter,
        }}
        className="project-sticky-card"
      >
        <ProjectCard
          project={project}
          index={index}
        />
      </motion.div>
    </div>
  );
}


/*
============================================================
MOBILE PROJECT
============================================================
*/

function MobileProject({
  project,
  index,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.92,
        rotate: index % 2 === 0
          ? -1.5
          : 1.5,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      viewport={{
        once: false,
        amount: 0.18,
        margin: "0px 0px -12% 0px",
      }}
      transition={{
        duration: 0.75,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="project-mobile-item"
    >
      <motion.div
        className="project-mobile-node"
        whileInView={{
          scale: [
            0.75,
            1.18,
            1,
          ],
        }}
        viewport={{
          once: false,
          amount: 0.5,
        }}
        transition={{
          duration: 0.55,
        }}
      >
        <span>
          {project.number}
        </span>
      </motion.div>

      <ProjectCard
        project={project}
        index={index}
        mobile
      />
    </motion.div>
  );
}


/*
============================================================
PROJECTS
============================================================
*/

function Projects() {
  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        px-6
        py-28
        sm:py-36
        md:py-44
      "
    >
      {/* ==================================================
          AMBIENT AURORA
          ================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-[-15%]
          top-[8%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[var(--accent)]
          opacity-[0.045]
          blur-[160px]
        "
        animate={{
          x: [
            0,
            80,
            -40,
            0,
          ],

          y: [
            0,
            -60,
            40,
            0,
          ],

          scale: [
            1,
            1.1,
            0.95,
            1,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-[5%]
          right-[-15%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-fuchsia-500
          opacity-[0.035]
          blur-[150px]
        "
        animate={{
          x: [
            0,
            -70,
            40,
            0,
          ],

          y: [
            0,
            40,
            -50,
            0,
          ],

          scale: [
            1,
            0.92,
            1.08,
            1,
          ],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ==================================================
          CONTENT
          ================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* ==================================================
            TITLE
            ================================================== */}

        <SectionTitle
          eyebrow="Selected Work"
          title="Things I've actually built."
          description="
            A collection of experiments, interfaces
            and full-stack projects built while learning
            how ideas become real products.
          "
        />

        {/* ==================================================
            ARCHIVE BAR
            ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.5,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mt-10
            flex
            items-center
            justify-between
            border-y
            border-[var(--border)]
            py-4
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-[var(--muted)]
          "
        >
          <span>
            Project Archive
          </span>

          <span>
            {String(
              projects.length
            ).padStart(2, "0")}{" "}
            Projects
          </span>
        </motion.div>

        {/* ==================================================
            DESKTOP
            ================================================== */}

        <div
          className="
            projects-desktop
            mt-12
          "
        >
          {projects.map(
            (project, index) => (
              <DesktopProject
                key={project.id}
                project={project}
                index={index}
              />
            )
          )}
        </div>

        {/* ==================================================
            MOBILE
            ================================================== */}

        <div
          className="
            projects-mobile
            mt-14
          "
        >
          {projects.map(
            (project, index) => (
              <MobileProject
                key={project.id}
                project={project}
                index={index}
              />
            )
          )}
        </div>

        {/* ==================================================
            FOOTER
            ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-16
            flex
            flex-col
            gap-6
            border-t
            border-[var(--border)]
            pt-8
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[var(--muted)]
              "
            >
              Still building
            </span>

            <p
              className="
                mt-2
                max-w-lg
                text-sm
                leading-7
                text-[var(--muted)]
              "
            >
              More projects are coming.
              Including a new version of
              eLib, rebuilt properly from
              the ground up.
            </p>
          </div>

          <a
            href="#contact"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
            "
          >
            Start a project

            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </a>
        </motion.div>

        {/* ==================================================
            SCROLL CUE
            ================================================== */}

        <div
          className="
            projects-scroll-cue
            pointer-events-none
            mt-12
            flex
            items-center
            justify-center
            gap-3
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-[var(--muted)]
          "
        >
          <span>
            Scroll through the archive
          </span>

          <motion.div
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown size={13} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Projects;