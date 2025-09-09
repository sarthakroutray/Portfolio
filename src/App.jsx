import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import "./fonts.css";
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Skills from './Skills';
import Projects from './Projects';
import Resume from './Resume';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const sideNavItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/about', icon: '👤', label: 'About' },
    { path: '/skills', icon: '⚡', label: 'Skills' },
    { path: '/projects', icon: '📁', label: 'Projects' },
    { path: '/resume', icon: '📄', label: 'Resume' },
    { path: '/contact', icon: '✉️', label: 'Contact' }
  ];

  return (
    <div className="w-screen h-screen font-mono" style={{
      backgroundColor: '#282c33',
      backgroundImage: 'none'
    }}>
      {/* Main Content Area - Full Width */}
      <div className="flex flex-col h-full">
        {/* Top Navigation */}
        <header className="px-4 md:px-8 py-6 border-b border-gray-600">
          <nav className="flex justify-between items-center">
            <div className="text-white font-bold text-xl flex items-center space-x-2">
              <img src="/vite.svg" alt="Logo" className="w-10 h-10" />
              <span>Sarthak</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 text-sm">
              <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'}`}>
                <span className="text-purple-400">#</span>home
              </Link>
              <Link to="/projects" className={`transition-colors ${location.pathname === '/projects' ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'}`}>
                <span className="text-purple-400">#</span>works
              </Link>
              <Link to="/about" className={`transition-colors ${location.pathname === '/about' ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'}`}>
                <span className="text-purple-400">#</span>about-me
              </Link>
              <Link to="/contact" className={`transition-colors ${location.pathname === '/contact' ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'}`}>
                <span className="text-purple-400">#</span>contacts
              </Link>
              <div className="text-gray-400">EN ↓</div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col space-y-1 focus:outline-none"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white"
              />
              <motion.div
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white"
              />
              <motion.div
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white"
              />
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6"> 
          <AnimatePresence mode="popLayout">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 md:hidden"
            onClick={closeMobileMenu}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-80 backdrop-blur-md border-l border-gray-600"
              style={{ 
                backgroundColor: '#282c33'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-600">
                <div className="flex items-center space-x-2">
                  <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
                  <span className="text-white font-bold text-lg">Sarthak</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="px-6 py-8 space-y-6">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`block text-lg transition-colors duration-200 ${
                    location.pathname === '/' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="text-purple-400">#</span>home
                </Link>
                <Link
                  to="/projects"
                  onClick={closeMobileMenu}
                  className={`block text-lg transition-colors duration-200 ${
                    location.pathname === '/projects' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="text-purple-400">#</span>works
                </Link>
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className={`block text-lg transition-colors duration-200 ${
                    location.pathname === '/about' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="text-purple-400">#</span>about-me
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className={`block text-lg transition-colors duration-200 ${
                    location.pathname === '/contact' ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="text-purple-400">#</span>contacts
                </Link>
                
                <div className="pt-4 border-t border-gray-600">
                  <select className="bg-transparent text-gray-300 text-lg border-none focus:outline-none cursor-pointer">
                    <option value="en">EN</option>
                  </select>
                </div>
              </div>

              {/* Mobile Menu Social Icons */}
              <div className="absolute bottom-8 left-6 flex space-x-4">
                <a href="https://github.com/sarthakroutray" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <span className="text-2xl">🐙</span>
                </a>
                <a href="https://linkedin.com/in/sarthak-routray-020583323" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <span className="text-2xl">💼</span>
                </a>
                <a href="mailto:sarthak.routray2006@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <span className="text-2xl">📧</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
