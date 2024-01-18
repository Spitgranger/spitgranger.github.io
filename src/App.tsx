import './App.css'
import Header from "./Components/Header.tsx";
import About from "./Components/About.tsx";
import {AnimatePresence} from "framer-motion";
import UseScrollToTop from "./hooks/useScrollToTop.tsx";

function App() {

  return (
      <AnimatePresence>
        <Header/>
        <div className="container mx-auto">
          <About />
            <UseScrollToTop/>
        </div>
      </AnimatePresence>
  )
}

export default App
