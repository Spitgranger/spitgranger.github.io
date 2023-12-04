import './App.css'
import Header from "./Components/Header.tsx";
import About from "./Components/About.tsx";
import {AnimatePresence} from "framer-motion";

function App() {

  return (
      <AnimatePresence>
        <Header/>
        <div className="container mx-auto">
          <About />
        </div>
      </AnimatePresence>
  )
}

export default App
