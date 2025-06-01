import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import "./fonts.css";
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Skills from './Skills';
import NotFound from './NotFound';

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
      {/* Main white container - now a flex column */}
      <div className="bg-white w-[90vw] h-[88vh] max-w-[1200px] max-h-[650px] rounded-xl relative flex flex-col" style={{ boxShadow: '0 0 30px rgba(255, 0, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
        {/* Global Header - fixed at top within the flex container */}
        <header className="px-4 pt-8 pb-4 z-10 md:px-16"> 
          <nav className="flex justify-center md:justify-start space-x-4 text-sm font-normal mt-2 md:space-x-8">
            <Link to="/" className={`hover:underline text-gray-200 ${location.pathname === '/' ? 'text-cyan-400' : ''}`} style={{ filter: 'drop-shadow(0 0 3px rgba(255, 0, 255, 0.7))' }}>Home</Link>
            <Link to="/about" className={`hover:underline text-gray-200 ${location.pathname === '/about' ? 'text-cyan-400' : ''}`} style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>About</Link>
            <Link to="/skills" className={`hover:underline text-gray-200 ${location.pathname === '/skills' ? 'text-cyan-400' : ''}`} style={{ filter: 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.7))' }}>Skills</Link>
            <Link to="/contact" className={`hover:underline text-gray-200 ${location.pathname === '/contact' ? 'text-cyan-400' : ''}`} style={{ filter: 'drop-shadow(0 0 3px rgba(255, 0, 255, 0.7))' }}>Contact</Link>
          </nav>
        </header>

        {/* Scrollable Content Area - takes remaining space */}
        <div className="flex-grow overflow-y-auto px-4 pb-8 md:px-16"> 
          <AnimatePresence mode="popLayout">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
