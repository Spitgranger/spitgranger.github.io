import './App.css'
import Header from "./Components/Header.tsx";
import About from "./Components/About.tsx";
import Projects from "./Components/Projects.tsx";
import Contact from "./Components/Contact.tsx";
import {AnimatePresence} from "framer-motion";
import UseScrollToTop from "./hooks/useScrollToTop.tsx";

function App() {

  return (
      <AnimatePresence>
        <div className="bg-primary-light dark:bg-primary-dark min-h-screen transition-colors duration-300">
          <Header/>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <section id="about">
              <About />
            </section>
            <Projects />
            <Contact />
            <UseScrollToTop/>
          </div>
        </div>
      </AnimatePresence>
  )
}

export default App
