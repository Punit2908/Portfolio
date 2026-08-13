import { useState } from "react";

import Navbar from "./components/Navbar";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

import "./admin/admin.css";

function App() {
  const isAdmin =
    window.location.pathname === "/admin";

  const [token, setToken] = useState(
    () =>
      localStorage.getItem("adminToken")
  );

  /*
   * ==========================================
   * ADMIN AREA
   * ==========================================
   */

  if (isAdmin) {
    // No token → show login
    if (!token) {
      return (
        <AdminLogin
          onLogin={(newToken) => {
            setToken(newToken);
          }}
        />
      );
    }

    // Token → show dashboard
    return (
      <AdminDashboard
        token={token}
        onLogout={() => {
          localStorage.removeItem(
            "adminToken"
          );

          setToken(null);
        }}
      />
    );
  }

  // Public Portfolio
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

export default App;