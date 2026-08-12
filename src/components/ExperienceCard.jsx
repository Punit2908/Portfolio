import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

function ExperienceCard({
  item,
  index,
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(
    rotateX,
    {
      stiffness: 180,
      damping: 22,
      mass: 0.35,
    }
  );

  const springY = useSpring(
    rotateY,
    {
      stiffness: 180,
      damping: 22,
      mass: 0.35,
    }
  );

  const handlePointerMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    rotateY.set(x * 3);
    rotateX.set(-y * 3);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      className={`
        experience-card
        experience-card-${item.accent}
      `}
      style={{
        rotateX: springX,
        rotateY: springY,
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
        duration: 0.75,
        delay: index * 0.05,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
    }
    >
      {/* ==================================================
          CARD GLOW
          ================================================== */}

      <div className="experience-card-glow" />

      {/* ==================================================
          TOP META
          ================================================== */}

      <div className="experience-card-top">
        <div className="experience-card-year">
          {item.year}
        </div>

        <div className="experience-card-status">
          <span />
          {item.status}
        </div>
      </div>

      {/* ==================================================
          CONTENT
          ================================================== */}

      <div className="experience-card-content">
        <span className="experience-card-period">
          {item.period}
        </span>

        <h3>
          {item.title}
        </h3>

        <p className="experience-card-role">
          {item.role}
        </p>

        <p className="experience-card-description">
          {item.description}
        </p>
      </div>

      {/* ==================================================
          TECHNOLOGIES
          ================================================== */}

      <div className="experience-card-tech">
        {item.technologies.map(
          (technology) => (
            <span key={technology}>
              {technology}
            </span>
          )
        )}
      </div>

      {/* ==================================================
          FOOTER
          ================================================== */}

      <div className="experience-card-footer">
        <span>
          {String(index + 1).padStart(
            2,
            "0"
          )}
        </span>

        <motion.div
          whileHover={{
            x: 3,
          }}
          className="
            experience-card-arrow
          "
        >
          <ArrowUpRight
            size={17}
          />
        </motion.div>
      </div>

      {/* ==================================================
          DECORATIVE ELEMENTS
          ================================================== */}

      <div className="experience-card-corner">
        <Sparkles
          size={15}
        />
      </div>

      <div className="experience-card-line" />
    </motion.article>
  );
}

export default ExperienceCard;