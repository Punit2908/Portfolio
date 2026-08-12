import Navbar from "./components/Navbar";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

function App() {
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