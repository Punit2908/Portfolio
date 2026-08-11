import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Database,
  Server,
  Sparkles,
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";
import AboutAtmosphere from "../components/AboutAtmosphere";

function About() {
  return (
    <section
      id="about"
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
          3D ATMOSPHERE
          ================================================== */}

      <AboutAtmosphere />

      {/* ==================================================
          AMBIENT GLOWS
          ================================================== */}

      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-[-10%]
          top-[20%]
          -z-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-[var(--accent)]
          opacity-[0.045]
          blur-[140px]
        "
      />

      <motion.div
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-[5%]
          right-[-5%]
          -z-0
          h-[360px]
          w-[360px]
          rounded-full
          bg-purple-500
          opacity-[0.035]
          blur-[130px]
        "
      />

      {/* ==================================================
          CONTENT
          ================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-6xl">

        <SectionTitle
          eyebrow="About Me"
          title="Turning ideas into digital experiences."
          description="I enjoy building modern web applications that are clean, interactive, and actually useful."
        />

        {/* ==================================================
            ABOUT GRID
            ================================================== */}

        <div
          className="
            mt-16
            grid
            gap-6
            lg:grid-cols-[1.15fr_0.85fr]
          "
        >

          {/* ==================================================
              MAIN ABOUT CARD
              ================================================== */}

          <AboutIntro />

          {/* ==================================================
              SKILL CARDS
              ================================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >
            <AboutCard
              number="01"
              icon={<Code2 size={20} />}
              title="Frontend"
              text="Interactive interfaces with React and modern CSS."
            />

            <AboutCard
              number="02"
              icon={<Server size={20} />}
              title="Backend"
              text="APIs and server-side applications with Node.js."
            />

            <AboutCard
              number="03"
              icon={<Database size={20} />}
              title="Database"
              text="MongoDB, SQL and structured data."
            />

            <AboutCard
              number="04"
              icon={<Sparkles size={20} />}
              title="Creative"
              text="Motion, interaction and visual experimentation."
            />
          </div>
        </div>
      </div>
    </section>
  );
}


/*
============================================================
INTRO CARD
============================================================
*/

function AboutIntro() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 45,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        about-glass
        group
        relative
        overflow-hidden
        rounded-[2rem]
        p-7
        sm:p-9
        md:p-10
      "
    >

      {/* ==================================================
          MOVING LIGHT
          ================================================== */}

      <div
        className="
          about-card-light
          pointer-events-none
          absolute
          -inset-[1px]
          rounded-[inherit]
        "
      />

      {/* ==================================================
          INNER CONTENT
          ================================================== */}

      <div
        className="
          relative
          z-10
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[var(--muted)]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[var(--accent)]
                shadow-[0_0_12px_var(--accent)]
              "
            />

            About me
          </span>

          <span
            className="
              text-xs
              font-medium
              text-[var(--muted)]
            "
          >
            2026
          </span>
        </div>


        <h3
          className="
            mt-10
            max-w-2xl
            text-3xl
            font-semibold
            leading-[1.05]
            tracking-[-0.04em]
            sm:text-4xl
            md:text-5xl
          "
        >
          I build with curiosity,

          <span
            className="
              text-[var(--muted)]
            "
          >
            {" "}
            experiment with ideas,
            and keep learning.
          </span>
        </h3>


        <div
          className="
            mt-8
            max-w-xl
            space-y-5
            text-sm
            leading-7
            text-[var(--muted)]
            sm:text-base
            sm:leading-8
          "
        >
          <p>
            I'm a developer focused on building
            modern web applications with the MERN
            stack. I enjoy taking an idea from a
            rough concept and turning it into
            something people can actually use.
          </p>

          <p>
            My interests span frontend experiences,
            backend development, APIs, databases,
            and the small interactions that make
            a website feel alive.
          </p>
        </div>


        <motion.a
          href="#contact"
          whileHover={{
            x: 5,
          }}
          className="
            group/link
            mt-9
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
          "
        >
          <span>
            Let's build something
          </span>

          <ArrowUpRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover/link:-translate-y-0.5
              group-hover/link:translate-x-0.5
            "
          />
        </motion.a>
      </div>


      {/* ==================================================
          DECORATIVE ORBIT
          ================================================== */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-24
          h-56
          w-56
          rounded-full
          border
          border-[var(--accent)]
          opacity-[0.08]
        "
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          -bottom-16
          -right-16
          h-40
          w-40
          rounded-full
          border
          border-dashed
          border-[var(--accent)]
          opacity-[0.08]
        "
      />
    </motion.div>
  );
}


/*
============================================================
ABOUT CARD
============================================================
*/

function AboutCard({
  number,
  icon,
  title,
  text,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -9,
        scale: 1.015,
      }}
      className="
        about-glass
        group
        relative
        min-h-[220px]
        overflow-hidden
        rounded-[1.6rem]
        p-5
        sm:p-6
      "
    >

      {/* ==================================================
          ANIMATED BORDER
          ================================================== */}

      <div
        className="
          about-card-light
          pointer-events-none
          absolute
          -inset-[1px]
          rounded-[inherit]
        "
      />


      {/* ==================================================
          HOVER SPOTLIGHT
          ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-36
          w-36
          rounded-full
          bg-[var(--accent)]
          opacity-0
          blur-[55px]
          transition-all
          duration-500
          group-hover:opacity-25
          group-hover:scale-150
        "
      />


      {/* ==================================================
          CONTENT
          ================================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
        "
      >

        {/* Number */}

        <div
          className="
            flex
            items-start
            justify-between
          "
        >
          <span
            className="
              text-[10px]
              font-medium
              tracking-[0.25em]
              text-[var(--muted)]
              transition-colors
              duration-300
              group-hover:text-[var(--accent)]
            "
          >
            {number}
          </span>

          <motion.div
            whileHover={{
              rotate: 15,
              scale: 1.12,
            }}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--background)]
              text-[var(--accent)]
              shadow-[0_0_0_rgba(168,85,247,0)]
              transition-shadow
              duration-500
              group-hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]
            "
          >
            {icon}
          </motion.div>
        </div>


        {/* Title */}

        <h4
          className="
            mt-auto
            pt-10
            text-xl
            font-semibold
            tracking-[-0.025em]
          "
        >
          {title}
        </h4>


        {/* Description */}

        <p
          className="
            mt-2
            text-xs
            leading-6
            text-[var(--muted)]
            sm:text-sm
          "
        >
          {text}
        </p>


        {/* Bottom line */}

        <div
          className="
            mt-5
            h-px
            w-0
            bg-[var(--accent)]
            shadow-[0_0_12px_var(--accent)]
            transition-all
            duration-500
            group-hover:w-full
          "
        />
      </div>
    </motion.div>
  );
}

export default About;