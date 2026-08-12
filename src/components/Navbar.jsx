import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

const navLinks = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Skills",
    href: "#skills",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  /*
   * ==================================================
   * ACTIVE SECTION + SCROLL PROGRESS
   * ==================================================
   */

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(
            visibleSections[0].target.id
          );
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      setScrollProgress(
        Math.min(
          100,
          Math.max(
            0,
            (scrollTop / documentHeight) * 100
          )
        )
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /*
   * ==================================================
   * CLOSE MOBILE MENU ON DESKTOP
   * ==================================================
   */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /*
   * ==================================================
   * LOCK BODY WHEN MOBILE MENU IS OPEN
   * ==================================================
   */

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /*
   * ==================================================
   * ESCAPE CLOSE
   * ==================================================
   */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavClick = (id) => {
    setActiveSection(id);
    closeMenu();
  };

  return (
    <>
      {/* ==================================================
          NAVBAR
          ================================================== */}

      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-50
          px-4
          pt-4
          sm:px-6
          md:px-8
          md:pt-6
        "
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative">

            {/* Ambient glow */}

            <motion.div
              animate={{
                opacity: [0.2, 0.38, 0.2],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                -inset-[2px]
                rounded-full
                bg-[var(--accent)]
                blur-md
              "
            />

            {/* Moving neon beam */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                pointer-events-none
                absolute
                -inset-[2px]
                overflow-hidden
                rounded-full
              "
            >
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[180%]
                  w-[180%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[conic-gradient(
                    from_0deg,
                    transparent_0deg,
                    transparent_300deg,
                    var(--accent)_330deg,
                    white_345deg,
                    var(--accent)_355deg,
                    transparent_360deg
                  )]
                  opacity-80
                  blur-[2px]
                "
              />
            </motion.div>

            {/* ==================================================
                NAVBAR SURFACE
                ================================================== */}

            <nav
              className="
                navbar-neon
                relative
                z-50
                flex
                h-[66px]
                items-center
                justify-between
                overflow-hidden
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--surface)]/90
                px-4
                shadow-lg
                backdrop-blur-xl
                sm:h-[68px]
                sm:px-7
              "
            >

              {/* ==================================================
                  LOGO
                  ================================================== */}

              <a
                href="#home"
                onClick={() =>
                  handleNavClick("home")
                }
                className="
                  group
                  relative
                  flex
                  h-full
                  items-center
                  outline-none
                "
              >
                <motion.img
                  src="/Profile-Pic.png"
                  alt="Punit"
                  className="
                    absolute
                    left-0
                    top-1/2
                    hidden
                    h-[34px]
                    w-[34px]
                    -translate-y-1/2
                    rounded-full
                    object-cover
                    opacity-90
                    ring-1
                    ring-[var(--border)]
                    transition-all
                    duration-500
                    md:block
                    group-hover:-translate-x-1
                    group-hover:scale-110
                    group-hover:ring-[var(--accent)]
                    group-hover:shadow-[0_0_16px_var(--accent)]
                  "
                />

                <span
                  className="
                    signature-font
                    relative
                    z-10
                    ml-6
                    flex
                    items-center
                    text-[30px]
                    font-semibold
                    leading-none
                    tracking-[-0.04em]
                    text-[var(--foreground)]
                    transition-all
                    duration-500
                    group-hover:ml-9
                    group-hover:scale-[1.04]
                    sm:text-[32px]
                  "
                >
                  {"PUNIT".split("").map(
                    (letter, index) => (
                      <span
                        key={`${letter}-${index}`}
                        className="
                          inline-block
                          transition-transform
                          duration-300
                          ease-out
                          group-hover:-translate-y-1
                        "
                        style={{
                          transitionDelay: `${
                            index * 45
                          }ms`,
                        }}
                      >
                        {letter}
                      </span>
                    )
                  )}
                </span>
              </a>

              {/* ==================================================
                  DESKTOP NAVIGATION
                  ================================================== */}

              <div
                className="
                  hidden
                  items-center
                  gap-1
                  md:flex
                "
              >
                {navLinks.map(
                  (link, index) => (
                    <NavLink
                      key={link.name}
                      {...link}
                      index={index}
                      active={
                        activeSection ===
                        link.href.slice(1)
                      }
                    />
                  )
                )}
              </div>

              {/* ==================================================
                  DESKTOP THEME
                  ================================================== */}

              <div
                className="
                  hidden
                  items-center
                  md:flex
                "
              >
                <ThemeToggle />
              </div>

              {/* ==================================================
                  MOBILE CONTROLS
                  ================================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  md:hidden
                "
              >
                <ThemeToggle />

                <motion.button
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={() =>
                    setIsOpen(true)
                  }
                  aria-label="Open navigation"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    text-[var(--foreground)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent)]
                    hover:text-[var(--accent)]
                  "
                >
                  <Menu size={20} />
                </motion.button>
              </div>

              {/* ==================================================
                  SCROLL PROGRESS
                  ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-[8%]
                  right-[8%]
                  h-px
                  overflow-hidden
                  rounded-full
                "
              >
                <motion.div
                  className="
                    h-full
                    origin-left
                    bg-gradient-to-r
                    from-[var(--accent)]
                    via-cyan-400
                    to-pink-400
                  "
                  style={{
                    scaleX:
                      scrollProgress / 100,
                  }}
                />
              </div>

            </nav>
          </div>
        </div>
      </header>

      {/* ==================================================
          MOBILE SIDE PANEL
          ================================================== */}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={closeMenu}
              className="
                fixed
                inset-0
                z-[60]
                bg-black/40
                backdrop-blur-sm
                md:hidden
              "
            />

            {/* Side panel */}

            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              className="
                fixed
                bottom-0
                right-0
                top-0
                z-[70]
                flex
                w-[85%]
                max-w-sm
                flex-col
                overflow-hidden
                border-l
                border-[var(--border)]
                bg-[var(--surface)]/95
                shadow-2xl
                backdrop-blur-2xl
                md:hidden
              "
            >

              {/* Profile */}

              <div
                className="
                  relative
                  flex
                  flex-col
                  items-center
                  border-b
                  border-[var(--border)]
                  px-6
                  pb-7
                  pt-8
                "
              >

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-7
                    h-32
                    w-32
                    -translate-x-1/2
                    rounded-full
                    bg-[var(--accent)]
                    blur-3xl
                  "
                />

                <motion.button
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={closeMenu}
                  aria-label="Close navigation"
                  className="
                    absolute
                    right-5
                    top-5
                    z-20
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    text-[var(--foreground)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent)]
                    hover:text-[var(--accent)]
                  "
                >
                  <X size={20} />
                </motion.button>

                <motion.img
                  src="/Profile-Pic.png"
                  alt="Punit"
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="
                    relative
                    z-10
                    h-24
                    w-24
                    rounded-full
                    object-cover
                    ring-2
                    ring-[var(--border)]
                    shadow-[0_0_30px_var(--accent)]
                  "
                />

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                  }}
                  className="
                    group
                    relative
                    z-10
                    mt-4
                    flex
                    cursor-default
                    items-center
                  "
                >
                  <span
                    className="
                      signature-font
                      flex
                      text-[34px]
                      font-semibold
                      leading-none
                      tracking-[-0.04em]
                      text-[var(--foreground)]
                    "
                  >
                    {"PUNIT".split("").map(
                      (letter, index) => (
                        <span
                          key={`${letter}-${index}`}
                          className="
                            inline-block
                            transition-transform
                            duration-300
                            ease-out
                            group-hover:-translate-y-1
                          "
                          style={{
                            transitionDelay: `${
                              index * 45
                            }ms`,
                          }}
                        >
                          {letter}
                        </span>
                      )
                    )}
                  </span>
                </motion.div>

                <span
                  className="
                    relative
                    z-10
                    mt-1
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-[var(--muted)]
                  "
                >
                  Full Stack Developer
                </span>
              </div>

              {/* Mobile links */}

              <nav
                className="
                  mt-5
                  flex
                  flex-1
                  flex-col
                  gap-1
                  overflow-y-auto
                  px-5
                "
              >
                {navLinks.map(
                  (link, index) => (
                    <MobileNavLink
                      key={link.name}
                      {...link}
                      index={index}
                      active={
                        activeSection ===
                        link.href.slice(1)
                      }
                      onClick={() =>
                        handleNavClick(
                          link.href.slice(1)
                        )
                      }
                    />
                  )
                )}
              </nav>

              {/* Footer */}

              <div
                className="
                  border-t
                  border-[var(--border)]
                  p-5
                "
              >
                <a
                  href="#contact"
                  onClick={() =>
                    handleNavClick("contact")
                  }
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    px-5
                    py-4
                    text-sm
                    font-medium
                    text-[var(--foreground)]
                    transition-all
                    duration-300
                    hover:border-[var(--accent)]
                    hover:text-[var(--accent)]
                  "
                >
                  <span>
                    Let's work together
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                    "
                  />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   DESKTOP NAV LINK
   ============================================================ */

function NavLink({
  name,
  href,
  index,
  active,
}) {
  return (
    <a
      href={href}
      className={`
        group
        relative
        rounded-full
        px-4
        py-2
        text-sm
        font-medium
        transition-colors
        duration-300
        ${
          active
            ? "text-[var(--foreground)]"
            : "text-[var(--muted)]"
        }
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        <span
          className={`
            text-[7px]
            font-mono
            tracking-[0.12em]
            transition-all
            duration-300
            ${
              active
                ? "text-[var(--accent)] opacity-100"
                : "opacity-0 group-hover:opacity-60"
            }
          `}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {name}
      </span>

      {/* Hover background */}

      <span
        className={`
          absolute
          inset-0
          -z-0
          rounded-full
          bg-[var(--accent)]/10
          transition-all
          duration-300
          ${
            active
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          }
        `}
      />

      {/* Active indicator */}

      {active && (
        <motion.span
          layoutId="navbar-active-indicator"
          className="
            absolute
            bottom-0
            left-1/2
            h-[2px]
            w-4
            -translate-x-1/2
            rounded-full
            bg-[var(--accent)]
            shadow-[0_0_10px_var(--accent)]
          "
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      )}
    </a>
  );
}

/* ============================================================
   MOBILE NAV LINK
   ============================================================ */

function MobileNavLink({
  name,
  href,
  index,
  active,
  onClick,
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial={{
        opacity: 0,
        x: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: 0.08 + index * 0.06,
        duration: 0.35,
        ease: "easeOut",
      }}
      className={`
        group
        relative
        flex
        items-center
        justify-between
        overflow-hidden
        rounded-2xl
        px-5
        py-4
        text-lg
        font-medium
        transition-all
        duration-300
        ${
          active
            ? "bg-[var(--accent)]/10 text-[var(--foreground)]"
            : "text-[var(--muted)] hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]"
        }
      `}
    >
      <span className="relative z-10 flex items-center gap-3">
        <span
          className="
            text-[8px]
            font-mono
            tracking-[0.18em]
            text-[var(--accent)]
            opacity-60
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {name}
      </span>

      <ArrowUpRight
        size={18}
        className={`
          transition-all
          duration-300
          ${
            active
              ? "translate-x-0 -translate-y-0 opacity-100"
              : "opacity-0 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
          }
        `}
      />

      {active && (
        <motion.span
          layoutId="mobile-active-indicator"
          className="
            absolute
            bottom-0
            left-0
            h-full
            w-[2px]
            bg-[var(--accent)]
            shadow-[0_0_12px_var(--accent)]
          "
        />
      )}
    </motion.a>
  );
}

export default Navbar;