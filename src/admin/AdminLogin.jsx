import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Invalid credentials"
        );
      }

      localStorage.setItem(
        "adminToken",
        result.token
      );

      onLogin(result.token);
    } catch (error) {
      setError(
        error.message || "Unable to sign in"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-background-orb admin-orb-one" />
      <div className="admin-background-orb admin-orb-two" />

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="admin-login-card"
      >
        <div className="admin-grid" />

        <div className="admin-login-content">
          <div className="admin-login-top">
            <div className="admin-login-icon">
              <ShieldCheck size={22} />
            </div>

            <span>PRIVATE AREA</span>
          </div>

          <div className="admin-login-heading">
            <p>ADMIN / 01</p>

            <h1>
              Welcome back,
              <br />
              Punit.
            </h1>

            <span>
              Secure access to your portfolio
              messages.
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="admin-login-form"
          >
            <div className="admin-field">
              <label htmlFor="admin-email">
                Email
              </label>

              <div className="admin-input-wrapper">
                <Mail size={16} />

                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="admin-field">
              <label htmlFor="admin-password">
                Password
              </label>

              <div className="admin-input-wrapper">
                <LockKeyhole size={16} />

                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="admin-error"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="admin-login-button"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <span>
                {loading
                  ? "Authenticating..."
                  : "Enter dashboard"}
              </span>

              <ArrowUpRight size={17} />
            </motion.button>
          </form>

          <div className="admin-login-footer">
            <span>JWT PROTECTED</span>
            <span>SESSION · 02H</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default AdminLogin;