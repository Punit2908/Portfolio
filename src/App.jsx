import Navbar from "./components/Navbar";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";

function App() {
  return (
    <>
      <Navbar />
      <main>
      <Hero />
      <About />
      <Skills />
      </main>
    </>
  );
}

export default App;