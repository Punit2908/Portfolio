import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import ProjectPreview from "./ProjectPreview";

function ProjectCard({
  project,
  index,
  mobile = false,
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springX = useSpring(rotateX, {
    stiffness: 180,
    damping: 20,
    mass: 0.35,
  });

  const springY = useSpring(rotateY, {
    stiffness: 180,
    damping: 20,
    mass: 0.35,
  });

  const springGlowX = useSpring(glowX, {
    stiffness: 160,
    damping: 24,
  });

  const springGlowY = useSpring(glowY, {
    stiffness: 160,
    damping: 24,
  });

  const handlePointerMove = (event) => {
    if (mobile) {
      return;
    }

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

    rotateY.set(x * 4.5);
    rotateX.set(-y * 4.5);

    glowX.set(
      ((event.clientX - rect.left) /
        rect.width) *
        100
    );

    glowY.set(
      ((event.clientY - rect.top) /
        rect.height) *
        100
    );
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);

    glowX.set(50);
    glowY.set(50);
  };

  const githubUrl = project.github || null;
  const liveUrl = project.live || null;

  const totalProjects = 5;

  return (
    <motion.article
      className={`
        project-card
        project-card-${project.theme}
        ${mobile ? "project-card-mobile" : ""}
      `}
      style={{
        rotateX: mobile ? 0 : springX,
        rotateY: mobile ? 0 : springY,
        "--cursor-x": springGlowX,
        "--cursor-y": springGlowY,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={
        mobile
          ? undefined
          : {
              y: -8,
            }
      }
    >
      {/* Cursor-following glow */}
      <div className="project-cursor-glow" />

      {/* Animated border */}
      <div className="project-card-border" />

      {/* Header */}
      <div className="project-card-header">
        <div className="project-card-index">
          {project.number}
        </div>

        <div className="project-card-category">
          {project.category}
        </div>

        <Sparkles
          className="project-card-spark"
          size={18}
          strokeWidth={1.5}
        />
      </div>

      {/* Main visual */}
      <ProjectPreview project={project} />

      {/* Information */}
      <div className="project-card-body">
        <div>
          <h3 className="project-card-title">
            {project.title}
          </h3>

          <p className="project-card-description">
            {project.description}
          </p>
        </div>

        <div className="project-card-tech">
          {project.tech.map((tech) => (
            <span key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="project-card-footer">
        <span className="project-card-counter">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(totalProjects).padStart(2, "0")}
        </span>

        <div className="project-card-links">
          {/* GitHub */}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="project-card-link"
            >
              <span className="project-github-icon">
                GH
              </span>

              <span>GitHub</span>
            </a>
          )}

          {/* Live */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live demo`}
              className="
                project-card-link
                project-card-live
              "
            >
              <span>Live Demo</span>

              <ArrowUpRight
                size={16}
              />
            </a>
          )}

          {/* Development */}
          {!githubUrl &&
            !liveUrl && (
              <span className="project-card-building">
                {project.status ||
                  "In development"}
              </span>
            )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;