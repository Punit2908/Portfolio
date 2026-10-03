import { useState } from "react";

import Navbar from "./components/Navbar";
import About from "./sections/About";
import Hero from "./sections/Hero";
import WebDevelopment from "./sections/WebDevelopment";
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

  if (isAdmin) {
    if (!token) {
      return (
        <AdminLogin
          onLogin={(newToken) => {
            setToken(newToken);
          }}
        />
      );
    }

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

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <WebDevelopment />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

export default App;
