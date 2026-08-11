import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--surface)]
      "
    >
      <motion.div
        key={theme}
        initial={{
          rotate: -90,
          scale: 0,
          opacity: 0,
        }}
        animate={{
          rotate: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {theme === "dark" ? (
          <Sun size={17} />
        ) : (
          <Moon size={17} />
        )}
      </motion.div>
    </button>
  );
}

export default ThemeToggle;