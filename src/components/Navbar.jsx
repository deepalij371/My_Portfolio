import { Sun, Moon, Download, Menu } from "lucide-react";
import { NAV_ITEMS } from "../constants/data.js";
import { downloadResume } from "../constants/resume.js";

/**
 * Sticky top navbar with scroll progress bar, theme toggle, resume download,
 * active section highlighting, and mobile hamburger menu.
 */
export default function Navbar({
  theme,
  setTheme,
  navOpen,
  setNavOpen,
  activeSection,
  scrollProgress,
}) {
  function scrollTo(id) {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          DJ<span className="dot-ai">.dev</span>
        </div>

        <div className="nav-links">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              className={activeSection === n.id ? "active" : ""}
              onClick={() => scrollTo(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <button
            className="icon-btn"
            aria-label="Toggle theme"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="cv-btn" onClick={downloadResume}>
            <Download size={14} /> CV
          </button>

          <button
            className="nav-toggle icon-btn"
            aria-label="Open menu"
            onClick={() => setNavOpen((v) => !v)}
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-nav ${navOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((n) => (
          <button key={n.id} onClick={() => scrollTo(n.id)}>
            {n.label}
          </button>
        ))}
      </div>
    </>
  );
}
