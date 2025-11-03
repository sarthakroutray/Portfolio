import "./fonts.css";
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Skills from './Skills';
import Projects from './Projects';
import Resume from './Resume';
import ThreeGalaxy from './components/canvas/ThreeGalaxy.jsx';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="relative bg-primary">
      <div className="fixed inset-0 z-0">
        <ThreeGalaxy isDark={true} />
      </div>
      <div className="relative z-10 w-full">
        <Navbar />
        <div id="home" className="w-full">
          <Home />
        </div>
        <div id="about" className="w-full">
          <About />
        </div>
        <div id="resume" className="w-full">
          <Resume />
        </div>
        <div id="skills" className="w-full">
          <Skills />
        </div>
        <div id="projects" className="w-full">
          <Projects />
        </div>
        <div id="contact" className="w-full">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
