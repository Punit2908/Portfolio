import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  Code2,
  Play,
  Terminal,
  FileText,
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

  const preview = previewMap[project.type];
  const Icon = preview.icon;

  return (
    <div className={`project-preview project-preview-${project.theme}`}>
      {/* Decorative grid */}
      <div className="project-preview-grid" />

      {/* Glow */}
      <motion.div
        className="project-preview-glow"
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-10%", "15%", "-10%"],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top bar */}
      <div className="project-preview-top">
        <div className="project-preview-dots">
          <span />
          <span />
          <span />
        </div>

        <span>{preview.label}</span>
      </div>

      {/* Main visual */}
      <div className="project-preview-content">
        <motion.div
          className="project-preview-icon"
          animate={{
            y: [0, -6, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={30} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="project-preview-number">
            PROJECT {project.number}
          </span>

          <h3>{preview.title}</h3>
        </motion.div>
      </div>

      {/* Decorative floating lines */}
      <div className="project-preview-line project-preview-line-one" />
      <div className="project-preview-line project-preview-line-two" />

      {/* Bottom label */}
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