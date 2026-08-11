import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import SectionTitle from "../components/SectionTitle";
import SkillsConstellation from "../components/SkillsConstellation";
import SkillOrbit from "../components/SkillOrbit";

function Skills() {
  return (
    <section
      id="skills"
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
          AMBIENT BACKGROUND
          ================================================== */}

      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.12, 0.92, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-[-10%]
          top-[15%]
          -z-10
          h-[450px]
          w-[450px]
          rounded-full
          bg-[var(--accent)]
          opacity-[0.035]
          blur-[150px]
        "
      />

      <motion.div
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 35, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-[5%]
          right-[-10%]
          -z-10
          h-[400px]
          w-[400px]
          rounded-full
          bg-purple-500
          opacity-[0.03]
          blur-[140px]
        "
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
          max-w-6xl
        "
      >
        {/* ==================================================
            SECTION TITLE
            ================================================== */}

        <SectionTitle
          eyebrow="Skills"
          title="The tools behind the ideas."
          description="A growing toolkit built around modern frontend, backend, database and development workflows."
        />

        {/* ==================================================
            BIG INTERACTIVE GRAPH
            ================================================== */}

        <div
          className="
            relative
            mt-16
            min-h-[520px]
            overflow-hidden
            rounded-[2.5rem]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            sm:min-h-[580px]
          "
        >
          <SkillsConstellation />

          {/* ==================================================
              TOP LABEL
              ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-6
              top-6
              z-20
              flex
              items-center
              gap-2
              text-[10px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-[var(--muted)]
              sm:left-8
              sm:top-8
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-[var(--accent)]
                shadow-[0_0_12px_var(--accent)]
              "
            />

            <span>Interactive stack</span>
          </div>

          {/* ==================================================
              CENTER CONTENT
              ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              flex
              items-center
              justify-center
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: false,
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
              }}
              className="
                max-w-xs
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[var(--accent)]
                  bg-[var(--background)]
                  text-[var(--accent)]
                  shadow-[0_0_45px_rgba(168,85,247,0.2)]
                "
              >
                <Sparkles size={26} />
              </div>

              <h3
                className="
                  mt-6
                  text-2xl
                  font-semibold
                  tracking-[-0.03em]
                "
              >
                Always learning.
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-[var(--muted)]
                "
              >
                Technologies are tools.
                Understanding how they work
                together is the real skill.
              </p>
            </motion.div>
          </div>

          {/* ==================================================
              BOTTOM LABEL
              ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-6
              left-6
              z-20
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[var(--muted)]
              sm:bottom-8
              sm:left-8
            "
          >
            Explore the stack
          </div>
        </div>

        {/* ==================================================
            SKILL ORBIT
            ================================================== */}

        <SkillOrbit />

        {/* ==================================================
            FINAL PHILOSOPHY
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
            items-start
            justify-between
            gap-6
            border-t
            border-[var(--border)]
            pt-8
            sm:flex-row
            sm:items-center
          "
        >
          <p
            className="
              max-w-xl
              text-sm
              leading-7
              text-[var(--muted)]
            "
          >
            I don't collect technologies just to
            make a longer list. I learn them when
            they help me solve a problem better.
          </p>

          <a
            href="#projects"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
            "
          >
            <span>See what I build</span>

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
      </div>
    </section>
  );
}

export default Skills;