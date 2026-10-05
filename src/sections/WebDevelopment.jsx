import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Monitor, Server, Database } from "lucide-react";

function WebDevelopment() {
  return (
    <section
      id="web-development"
      className="
        relative
        overflow-hidden
        px-6
        py-28
        sm:py-36
        md:py-44
      "
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-purple-400">
            Web Development
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Full stack web development in Haryana.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            I'm Punit Jangra, a MERN Stack and Full Stack Developer specializing
            in React, JavaScript, Node.js, Express.js and MongoDB. I build
            responsive websites, web applications and REST APIs for businesses,
            institutions and personal projects across Haryana and India.
          </p>

          <div className="mt-8 space-y-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              MERN Stack development in Panipat, Samalkha and Sonipat
            </h3>

            <p>
              I provide modern web development for clients in Panipat, Samalkha,
              Sonipat and nearby areas of Haryana. My work combines React
              frontend development with Node.js and Express.js backend
              development, MongoDB databases and REST API integration.
            </p>

            <p>
              Whether you need a responsive business website, a custom web
              application, an API-driven project or a complete MERN Stack
              solution, I focus on clean interfaces, practical functionality,
              performance and maintainable code.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <ServiceCard
            icon={<Monitor size={21} />}
            title="Frontend Development"
            text="Responsive React interfaces, modern CSS, Tailwind CSS, animations and accessible user experiences."
          />

          <ServiceCard
            icon={<Server size={21} />}
            title="Backend Development"
            text="Node.js and Express.js APIs, server-side application logic, authentication and REST API integration."
          />

          <ServiceCard
            icon={<Database size={21} />}
            title="Full Stack Applications"
            text="MERN applications connecting React interfaces with Node.js, Express.js and MongoDB backends."
          />
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)]/50 p-7 sm:p-9">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--accent)]">
              <MapPin size={19} />
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                Based in Haryana, working across India
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                For businesses, institutions and personal projects in
                Panipat, Samalkha, Sonipat, Kaithal and other parts of Haryana,
                I build modern web experiences with a focus on responsive design, practical
                functionality and maintainable code. Remote collaboration is
                also available across India.
              </p>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
              >
                Discuss a web project
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, text }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="
        rounded-[1.5rem]
        border
        border-[var(--border)]
        bg-[var(--card)]
        p-6
        transition-colors
        duration-300
      "
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--accent)]">
        {icon}
      </div>

      <h3 className="mt-7 text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        {text}
      </p>
    </motion.article>
  );
}

export default WebDevelopment;
