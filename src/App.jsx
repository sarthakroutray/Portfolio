import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import "./fonts.css";
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Skills from './Skills';
import Projects from './Projects';
import Resume from './Resume';
import StarsCanvas from './components/canvas/Stars';
import Navbar from './components/Navbar';
import PageLayout from './components/PageLayout';

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/about" element={<PageLayout><About /></PageLayout>} />
        <Route path="/resume" element={<PageLayout><Resume /></PageLayout>} />
        <Route path="/skills" element={<PageLayout><Skills /></PageLayout>} />
        <Route path="/projects" element={<PageLayout><Projects /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
      </Routes>
    </AnimatePresence>
  );
};

function AppContent() {
  const location = useLocation();
  const shouldShowStars = !['/skills', '/projects'].includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-primary">
      <div className="fixed inset-0 z-0">
        {shouldShowStars && <StarsCanvas />}
      </div>
      <div className="relative z-10">
        <Navbar />
        <AppRoutes />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
