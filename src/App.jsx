import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

import "./index.css";

import Navbar from "./components/Navbar.jsx";
import Background from "./components/Background.jsx";
import HeroSection from "./components/HeroSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import ChatWidget from "./components/ChatWidget.jsx";

import { useActiveSection } from "./hooks/useActiveSection.js";
import { useScrollProgress } from "./hooks/useScrollProgress.js";
import { NAV_ITEMS } from "./constants/data.js";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [navOpen, setNavOpen] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [showTop, setShowTop] = useState(false);

  const activeSection = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const scrollProgress = useScrollProgress();

  // Show "back to top" button after scrolling 600px
  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Subtle mouse parallax for background elements
  function handleMouseMove(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setParallax({ x, y });
  }

  return (
    <div className={`app ${theme}`} onMouseMove={handleMouseMove}>
      {/* Animated background */}
      <Background parallax={parallax} />

      {/* Navigation */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
      />

      {/* Page sections */}
      <main>
        <HeroSection parallax={parallax} />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <footer>deepali@portfolio:~$ echo "Thanks for stopping by."</footer>

      {/* Scroll to top */}
      {showTop && (
        <button
          className="scroll-top-btn"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Floating AI chat widget */}
      <ChatWidget />
    </div>
  );
}
