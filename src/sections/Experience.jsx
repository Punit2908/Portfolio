import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  Sparkles,
} from "lucide-react";

import {
  useRef,
} from "react";

import SectionTitle from "../components/SectionTitle";
import ExperienceCard from "../components/ExperienceCard";
import ExperienceNode from "../components/ExperienceNode";

import experience from "../data/experience";


/*
============================================================
DESKTOP TIMELINE
============================================================
*/

function DesktopTimeline() {
  const containerRef =
    useRef(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: containerRef,
    offset: [
      "start 75%",
      "end 25%",
    ],
  });

  const progress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 90,
        damping: 25,
        mass: 0.3,
      }
    );

  const lineScale =
    useTransform(
      progress,
      [0, 1],
      [0, 1]
    );

  return (
    <div
      ref={containerRef}
      className="
        experience-desktop
      "
    >
      {/* ==================================================
          CENTRAL TRACK
          ================================================== */}

      <div className="experience-track">
        <div className="experience-track-base" />

        <motion.div
          className="experience-track-progress"
          style={{
            scaleY: lineScale,
          }}
        />

        <motion.div
          className="
            experience-track-orb
          "
          style={{
            top: useTransform(
              progress,
              [0, 1],
              ["0%", "100%"]
            ),
          }}
        />
      </div>

      {/* ==================================================
          ENTRIES
          ================================================== */}

      <div className="experience-entries">
        {experience.map(
          (item, index) => {
            const left =
              index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`
                  experience-entry
                  ${
                    left
                      ? "experience-entry-left"
                      : "experience-entry-right"
                  }
                `}
              >
                <div className="experience-entry-card">
                  <ExperienceCard
                    item={item}
                    index={index}
                  />
                </div>

                <div className="experience-entry-node">
                  <ExperienceNode
                    item={item}
                    index={index}
                  />
                </div>

                <div className="experience-entry-spacer" />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}


/*
============================================================
MOBILE TIMELINE
============================================================
*/

function MobileTimeline() {
  return (
    <div className="experience-mobile">
      <div className="experience-mobile-track" />

      {experience.map(
        (item, index) => (
          <motion.div
            key={item.id}
            className="
              experience-mobile-entry
            "
            initial={{
              opacity: 0,
              x: 35,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <div
              className={`
                experience-mobile-node
                experience-node-${item.accent}
              `}
            >
              <span>
                {item.year}
              </span>
            </div>

            <ExperienceCard
              item={item}
              index={index}
            />
          </motion.div>
        )
      )}
    </div>
  );
}


/*
============================================================
EXPERIENCE
============================================================
*/

function Experience() {
  return (
    <section
      id="experience"
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
          AURORA
          ================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-[-15%]
          top-[10%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[var(--accent)]
          opacity-[0.04]
          blur-[160px]
        "
        animate={{
          x: [
            0,
            90,
            -50,
            0,
          ],
          y: [
            0,
            -50,
            40,
            0,
          ],
          scale: [
            1,
            1.12,
            0.94,
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
          bg-cyan-500
          opacity-[0.025]
          blur-[150px]
        "
        animate={{
          x: [
            0,
            -70,
            45,
            0,
          ],
          y: [
            0,
            40,
            -45,
            0,
          ],
          scale: [
            1,
            0.9,
            1.08,
            1,
          ],
        }}
        transition={{
          duration: 22,
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
          max-w-6xl
        "
      >
        <SectionTitle
          eyebrow="Journey"
          title="Still becoming."
          description="
            The path isn't perfectly linear.
            That's kind of the point.
            Every project, problem and experiment
            adds another layer.
          "
        />

        {/* ==================================================
            CURRENT STATUS
            ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
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
            experience-status-bar
          "
        >
          <div
            className="
              experience-status-icon
            "
          >
            <Sparkles
              size={15}
            />
          </div>

          <div>
            <span>
              CURRENTLY
            </span>

            <strong>
              Building, learning,
              experimenting.
            </strong>
          </div>

          <div className="
            experience-status-pulse
          ">
            <span />
            ACTIVE
          </div>
        </motion.div>

        {/* ==================================================
            TIMELINES
            ================================================== */}

        <DesktopTimeline />

        <MobileTimeline />

        {/* ==================================================
            END MARKER
            ================================================== */}

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
            amount: 0.6,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            experience-end
          "
        >
          <div
            className="
              experience-end-orb
            "
          />

          <p>
            The journey continues.
          </p>

          <span>
            More to build
          </span>
        </motion.div>

        {/* ==================================================
            SCROLL CUE
            ================================================== */}

        <div
          className="
            experience-scroll-cue
          "
        >
          <span>
            Keep exploring
          </span>

          <motion.div
            animate={{
              y: [
                0,
                5,
                0,
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown
              size={14}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Experience;