import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import SectionTitle from "../components/SectionTitle";

const API_URL = import.meta.env.VITE_API_URL;

function GithubIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49
        0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.45-1.19-1.11-1.51-1.11-1.51
        -.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.58 2.36 1.12 2.94.86
        .09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75
        -.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.84
        c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71
        .64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.07.36.32.68.94.68 1.9
        0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.24
        C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedinIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M5.2 3.5A2.5 2.5 0 1 1 5.2 8.5a2.5 2.5 0 0 1 0-5ZM3 9.5h4.4V21H3V9.5Zm7 0h4.2v1.57h.06c.59-1.12 2.03-2.3 4.18-2.3 4.47 0 5.29 2.94 5.29 6.76V21h-4.39v-4.86c0-1.16-.02-2.65-1.61-2.65-1.61 0-1.86 1.26-1.86 2.57V21H10V9.5Z"
      />
    </svg>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 25,
  });

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove old error once the user starts typing again
    if (status.type === "error") {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(
        `${API_URL}/contact`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to send your message."
        );
      }

      setStatus({
        type: "success",
        message:
          "Message sent successfully. I'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
          AMBIENT BACKGROUND
          ================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-[var(--accent)]
          opacity-[0.045]
          blur-[150px]
        "
        animate={{
          x: [0, 80, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          h-[480px]
          w-[480px]
          rounded-full
          bg-cyan-500
          opacity-[0.025]
          blur-[160px]
        "
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 21,
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
          eyebrow="Contact"
          title="Let's build something worth remembering."
          description="Have a project, idea or problem worth solving? Send me a message and let's turn it into something real."
        />

        {/* ==================================================
            CONTACT SYSTEM
            ================================================== */}

        <div
          className="
            contact-system
            mt-16
            grid
            gap-6
            lg:grid-cols-[0.75fr_1.25fr]
          "
          onMouseMove={handleMouseMove}
        >
          {/* ==================================================
              LEFT SIDE
              ================================================== */}

          <motion.div
            className="
              contact-intro
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-7
              sm:p-9
            "
            style={{
              "--mouse-x": smoothX,
              "--mouse-y": smoothY,
            }}
          >
            <div className="contact-mouse-glow" />

            <div className="relative z-10 flex h-full flex-col">

              <div className="contact-status">
                <span className="contact-status-dot" />
                Available for opportunities
              </div>

              <div className="mt-12">
                <div className="contact-icon">
                  <Sparkles size={20} />
                </div>

                <h3 className="mt-6">
                  Have an idea?
                </h3>

                <p className="mt-4">
                  I'm interested in building useful,
                  thoughtful and slightly unusual
                  digital experiences.
                </p>
              </div>

              {/* Signature */}

              <div className="mt-auto pt-14">
                <svg
                  className="contact-signature"
                  viewBox="0 0 360 110"
                  role="img"
                  aria-label="Punit"
                >
                  <text
                    x="5"
                    y="78"
                    fontFamily="'Brush Script MT', 'Segoe Script', cursive"
                    fontSize="72"
                    fontStyle="italic"
                    fontWeight="400"
                    fill="currentColor"
                  >
                    Punit
                  </text>
                </svg>

                <span className="contact-signature-line" />

                <span className="contact-signature-label">
                  Developer · Builder · Learner
                </span>
              </div>

              {/* Socials */}

              <div className="contact-socials">
                <a
                  href="https://github.com/Punit2908"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <GithubIcon size={17} />
                  <span>GitHub</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://www.linkedin.com/in/iampunitjangra/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={17} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="mailto:punitjangra2742@gmail.com"
                  aria-label="Email"
                >
                  <Mail size={17} />
                  <span>Email</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              FORM
              ================================================== */}

          <motion.div
            className="
              contact-form-card
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-7
              sm:p-9
            "
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="contact-grid" />

            <div className="relative z-10">
              <div className="contact-form-header">
                <div>
                  <span>01 / MESSAGE</span>

                  <h3>
                    Start a conversation.
                  </h3>
                </div>

                <div className="contact-form-orb">
                  <Send size={17} />
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-10"
              >
                {/* Name + Email */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="contact-field">
                    <label htmlFor="contact-name">
                      Name
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      minLength={2}
                      maxLength={50}
                      required
                    />

                    <span />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-email">
                      Email
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <span />
                  </div>
                </div>

                {/* Subject */}

                <div className="contact-field mt-6">
                  <label htmlFor="contact-subject">
                    Subject
                  </label>

                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What are we building?"
                    value={formData.subject}
                    onChange={handleChange}
                    maxLength={100}
                  />

                  <span />
                </div>

                {/* Message */}

                <div className="contact-field mt-6">
                  <label htmlFor="contact-message">
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows="6"
                    placeholder="Tell me a little about your idea..."
                    value={formData.message}
                    onChange={handleChange}
                    minLength={10}
                    maxLength={2000}
                    required
                  />

                  <span />
                </div>

                {/* Status */}

                {status.message && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className={`mt-5 ${
                      status.type === "success"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}

                {/* Submit */}

                <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="contact-form-note">
                    Your message will open a
                    conversation.
                  </p>

                  <motion.button
                    type="submit"
                    className="contact-submit"
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting
                        ? { y: -2 }
                        : {}
                    }
                    whileTap={
                      !isSubmitting
                        ? { scale: 0.97 }
                        : {}
                    }
                  >
                    <span>
                      {isSubmitting
                        ? "Sending..."
                        : status.type === "success"
                          ? "Message sent"
                          : "Send message"}
                    </span>

                    <motion.span
                      animate={{
                        x:
                          isSubmitting
                            ? 0
                            : 3,
                      }}
                    >
                      <ArrowUpRight size={17} />
                    </motion.span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ==================================================
            BOTTOM EMAIL
            ================================================== */}

        <motion.a
          href="mailto:punitjangra2742@gmail.com"
          className="contact-email-strip"
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
        >
          <div>
            <span>DIRECT LINE</span>

            <strong>
              punitjangra2742@gmail.com
            </strong>
          </div>

          <ArrowUpRight size={19} />
        </motion.a>
      </div>
    </section>
  );
}

export default Contact;