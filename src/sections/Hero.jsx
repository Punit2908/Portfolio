import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";
import DeveloperVisual from "../components/DeveloperVisual";
import RoleSwitcher from "../components/RoleSwitcher";
import ShaderBackground from "../components/ShaderBackground";

function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        px-6
        pb-24
        pt-32
        sm:pb-28
        md:pt-40
      "
    >
      {/* ==================================================
          INTERACTIVE SHADER HMR BACKGROUND
          ================================================== */}
      <ShaderBackground />

      {/* ==================================================
          HERO CONTENT
          ================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center text-center">

          {/* ==================================================
              ROLE SWITCHER
              ================================================== */}

          <RoleSwitcher />

          {/* ==================================================
              MAIN HEADING
              ================================================== */}

          <motion.h1
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
              amount: 0.6,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              max-w-5xl
              text-5xl
              font-bold
              leading-[0.95]
              tracking-[-0.045em]
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
            "
          >
            Building digital
            <br />

            <span className="text-[var(--muted)]">
              experiences that matter.
            </span>
          </motion.h1>

          {/* ==================================================
              DESCRIPTION
              ================================================== */}

          <motion.p
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
              amount: 0.6,
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-base
              leading-7
              text-[var(--muted)]
              sm:text-lg
              sm:leading-8
            "
          >
            I build modern web applications using
            React, Node.js, Express and MongoDB.
          </motion.p>

          {/* ==================================================
              ACTION BUTTONS
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
              amount: 0.6,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="
              mt-10
              flex
              flex-col
              items-center
              justify-center
              gap-4
              sm:flex-row
            "
          >
            {/* Primary */}

            <a
              href="#projects"
              className="
                primary-button
                group
                flex
                items-center
                gap-2
                rounded-full
                px-7
                py-3.5
                font-medium
                transition-all
                duration-300
              "
            >
              <span>View Projects</span>

              <ArrowUpRight
                size={17}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>

            {/* Secondary */}

            <a
              href="#contact"
              className="
                secondary-button
                rounded-full
                px-7
                py-3.5
                font-medium
                transition-all
                duration-300
              "
            >
              Contact Me
            </a>
          </motion.div>

        </div>

        {/* ==================================================
            DEVELOPER CENTERPIECE
            ================================================== */}

        <DeveloperVisual />
      </div>

      {/* ==================================================
          SCROLL INDICATOR
          ================================================== */}

      <motion.a
        href="#about"
        initial={{
          opacity: 0,
          y: 10,
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
          duration: 0.5,
          delay: 0.5,
        }}
        className="
          absolute
          bottom-7
          left-1/2
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-[var(--muted)]
          transition-colors
          duration-300
          hover:text-[var(--foreground)]
        "
      >
        <span
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.35em]
          "
        >
          Scroll
        </span>

        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown
            size={15}
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.a>
    </section>
  );
}

export default Hero;