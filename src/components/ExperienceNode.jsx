import {
  motion,
} from "framer-motion";

function ExperienceNode({
  item,
  index,
}) {
  return (
    <motion.div
      className={`
        experience-node
        experience-node-${item.accent}
      `}
      initial={{
        scale: 0,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      viewport={{
        once: false,
        amount: 0.5,
      }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
    >
      <motion.div
        className="experience-node-core"
        whileInView={{
          scale: [
            0.8,
            1.25,
            1,
          ],
        }}
        viewport={{
          once: false,
          amount: 0.6,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="experience-node-ring"
        animate={{
          scale: [
            1,
            1.45,
            1,
          ],
          opacity: [
            0.7,
            0,
            0.7,
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay:
            index * 0.25,
        }}
      />

      <span>
        {item.year}
      </span>
    </motion.div>
  );
}

export default ExperienceNode;