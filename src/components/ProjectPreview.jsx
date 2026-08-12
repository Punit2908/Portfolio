import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  FileText,
  Play,
  Terminal,
} from "lucide-react";

function ProjectPreview({ project }) {
  const previewMap = {
    notes: {
      icon: FileText,
      label: "HASC / NOTES",
      title: "Knowledge organized.",
    },

    library: {
      icon: BookOpen,
      label: "eLib / LIBRARY",
      title: "A new chapter is being built.",
    },

    event: {
      icon: CalendarDays,
      label: "EVENTRA / EVENTS",
      title: "Beautiful events, connected.",
    },

    terminal: {
      icon: Terminal,
      label: "SERVER / API",
      title: "Building the backend.",
    },

    cinema: {
      icon: Play,
      label: "STREAM / UI",
      title: "Frontend in motion.",
    },
  };

  const preview =
    previewMap[project.type] || previewMap.terminal;

  const Icon = preview.icon;

  const hasImage = Boolean(project.image);
  const hasMobileImage = Boolean(project.mobileImage);
  const secondaryImages =
    project.secondaryImages || [];

  return (
    <div
      className={`
        project-preview
        project-preview-${project.theme}
        ${hasImage ? "has-project-image" : ""}
      `}
    >
      {/* ==================================================
          ATMOSPHERE
          ================================================== */}

      <div className="project-preview-grid" />

      <motion.div
        className="project-preview-glow"
        animate={{
          x: ["-18%", "18%", "-18%"],
          y: ["-10%", "14%", "-10%"],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="project-preview-vignette" />

      {/* ==================================================
          BROWSER HEADER
          ================================================== */}

      <div className="project-preview-top">
        <div className="project-preview-dots">
          <span />
          <span />
          <span />
        </div>

        <span>{preview.label}</span>

        <span className="project-preview-status-dot" />
      </div>

      {/* ==================================================
          REAL PROJECT IMAGE
          ================================================== */}

      {hasImage ? (
        <div className="project-preview-stage">
          {/* Main browser */}
          <motion.div
            className="project-browser"
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="project-browser-bar">
              <div className="project-browser-dots">
                <span />
                <span />
                <span />
              </div>

              <div className="project-browser-address">
                <span>
                  {project.title.toLowerCase().replaceAll(
                    " ",
                    "-"
                  )}
                </span>
              </div>
            </div>

            <div className="project-browser-screen">
              <motion.img
                src={project.image}
                alt={`${project.title} project preview`}
                loading="lazy"
                decoding="async"
                className="project-main-image"
                whileHover={{
                  scale: 1.035,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
              />

              <div className="project-image-shine" />
            </div>
          </motion.div>

          {/* ==================================================
              MOBILE PREVIEW
              ================================================== */}

          {hasMobileImage && (
            <motion.div
              className="project-phone-preview"
              initial={{
                opacity: 0,
                x: 45,
                y: 30,
                rotate: 7,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 5,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="project-phone-notch" />

              <img
                src={project.mobileImage}
                alt={`${project.title} mobile preview`}
                loading="lazy"
                decoding="async"
              />

              <div className="project-phone-glass" />
            </motion.div>
          )}

          {/* ==================================================
              SECONDARY PREVIEWS
              ================================================== */}

          {secondaryImages.length > 0 && (
             <div className="project-secondary-previews desktop-only-project-media">
              {secondaryImages
                .slice(0, 2)
                .map((image, index) => (
                  <motion.div
                    key={image}
                    className={`project-secondary-image project-secondary-${index}`}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.25 + index * 0.1,
                    }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} secondary preview ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                ))}
            </div>
          )}

          {/* Project number */}
          <div className="project-image-number">
            <span>PROJECT</span>
            <strong>{project.number}</strong>
          </div>
        </div>
      ) : (
        /* ==================================================
            FALLBACK / DEVELOPMENT PROJECT
            ================================================== */

        <div className="project-preview-content">
          <motion.div
            className="project-preview-icon"
            animate={{
              y: [0, -7, 0],
              rotate: [0, 3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              size={30}
              strokeWidth={1.5}
            />
          </motion.div>

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
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="project-preview-number">
              PROJECT {project.number}
            </span>

            <h3>{preview.title}</h3>
          </motion.div>
        </div>
      )}

      {/* ==================================================
          DECORATIVE LINES
          ================================================== */}

      <motion.div
        className="project-preview-line project-preview-line-one"
        animate={{
          scaleX: [0.7, 1, 0.7],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="project-preview-line project-preview-line-two"
        animate={{
          scaleX: [1, 0.65, 1],
          opacity: [0.35, 0.1, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ==================================================
          BOTTOM META
          ================================================== */}

      <div className="project-preview-bottom">
        <span>{project.category}</span>

        {project.status && (
          <span className="project-preview-status">
            {project.status}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProjectPreview;