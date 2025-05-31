import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import "./fonts.css";
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Skills from './Skills';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center font-sans" style={{
      backgroundImage: 'url(/image.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="bg-white w-[90vw] h-[88vh] max-w-[1200px] max-h-[650px] rounded-xl relative px-16 py-20" style={{ boxShadow: '0 0 30px rgba(255, 0, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
        {/* Global Header - Absolute at top */}
        <header className="absolute top-8 left-0 w-full flex justify-between items-start px-16 z-10">
          <nav className="space-x-8 text-sm font-normal mt-2">
            <Link to="/" className={`hover:underline text-gray-200 ${location.pathname === '/' ? 'text-cyan-400' : ''}`} style={{ filter: 'drop-shadow(0 0 3px rgba(255, 0, 255, 0.7))' }}>Home</Link>
            <Link to="/about" className={`hover:underline text-gray-200 ${location.pathname === '/about' ? 'text-cyan-400' : ''}`} style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>About</Link>
            <Link to="/skills" className={`hover:underline text-gray-200 ${location.pathname === '/skills' ? 'text-cyan-400' : ''}`} style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>Skills</Link>
            <Link to="/contact" className={`hover:underline text-gray-200 ${location.pathname === '/contact' ? 'text-cyan-400' : ''}`} style={{ filter: 'drop-shadow(0 0 3px rgba(255, 0, 255, 0.7))' }}>Contact</Link>
          </nav>
        </header>

        <AnimatePresence mode="popLayout">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
