import Navbar from "./components/Navbar";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";

function App() {
  return (
    <>
      <Navbar />
      <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      </main>
    </>
  );
}

export default App;