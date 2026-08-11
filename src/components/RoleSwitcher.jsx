import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "FULL STACK DEVELOPER",
  "MERN STACK DEVELOPER",
];

function RoleSwitcher() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        relative
        mb-5
        h-7
        w-full
        overflow-hidden
      "
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[index]}
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -50,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            whitespace-nowrap
            text-xs
            font-medium
            uppercase
            tracking-[0.3em]
            text-[var(--muted)]
            sm:text-sm
            sm:tracking-[0.35em]
          "
        >
          {roles[index] === "MERN STACK DEVELOPER" ? (
            <>
              <span className="text-[var(--accent)]">
                MERN
              </span>

              <span>&nbsp;STACK DEVELOPER</span>
            </>
          ) : (
            roles[index]
          )}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default RoleSwitcher;