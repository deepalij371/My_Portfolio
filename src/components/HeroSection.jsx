import { Sparkles, MapPin, Download, Github, Linkedin } from "lucide-react";
import Globe from "./Globe.jsx";
import HeroCarousel from "./HeroCarousel.jsx";
import PhotoFrame from "./PhotoFrame.jsx";
import { STATS, DEFAULT_BIO } from "../constants/data.js";
import { useTypewriter } from "../hooks/useTypewriter.js";
import { callClaude } from "../api/claude.js";
import { downloadResume } from "../constants/resume.js";
import { useState } from "react";

const STAT_ICONS = ["💼", "📁", "🎓", "⚡"];

export default function HeroSection({ parallax }) {
  const typedRole = useTypewriter();
  const [bio, setBio] = useState(DEFAULT_BIO);
  const [bioLoading, setBioLoading] = useState(false);

  async function generateBio() {
    setBioLoading(true);
    try {
      const text = await callClaude([
        {
          role: "user",
          content:
            "Write one punchy 2-sentence terminal-style bio (max 220 characters) for Deepali, a Java/Spring Boot backend developer. No quotes, no markdown, just the sentences.",
        },
      ]);
      setBio(text);
    } catch {
      setBio("Neural core offline — try generating again in a moment.");
    } finally {
      setBioLoading(false);
    }
  }

  return (
    <section className="hero" id="home">

      {/* ── Row 1: Two-column identity layout ── */}
      <div className="hero-inner">

        {/* LEFT — identity block */}
        <div className="hero-left">
          {/* Status badge */}
          <div className="badge">
            <Sparkles size={12} /> AVAILABLE FOR OPPORTUNITIES
          </div>

          {/* Photo + name */}
          <div className="hero-identity">
            <PhotoFrame src="/profile.jpg" alt="Deepali Jena" />
            <div className="hero-name-block">
              <h1 className="hero-name">Deepali<br />Jena</h1>
              <p className="hero-loc mono">
                <MapPin size={13} /> Hyderabad, India
              </p>
            </div>
          </div>

          {/* Typewriter role */}
          <div className="cycling-role mono">
            <span className="type-prompt">&gt;</span>
            <span className="type-text">{typedRole}</span>
            <span className="type-cursor" aria-hidden="true">_</span>
          </div>

          {/* Bio box */}
          <div className="bio-box">
            <div className="bio-label mono">// bio.generate()</div>
            <div className="bio-text">{bioLoading ? "generating…" : bio}</div>
          </div>

          {/* CTA buttons */}
          <div className="hero-ctas">
            <button className="cta-primary" onClick={downloadResume}>
              <Download size={15} /> Download CV
            </button>
            <a className="cta-ghost" href="https://github.com/deepalij371" target="_blank" rel="noopener noreferrer">
              <Github size={15} /> GitHub
            </a>
            <a className="cta-ghost" href="https://www.linkedin.com/in/deepali-jena-59b677244" target="_blank" rel="noopener noreferrer">
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>

          {/* AI regenerate */}
          <button className="generate-btn" onClick={generateBio} disabled={bioLoading}>
            <Sparkles size={13} /> {bioLoading ? "THINKING…" : "REGENERATE BIO"}
          </button>
        </div>

        {/* RIGHT — globe */}
        <div className="hero-right">
          <div className="globe-wrapper">
            <Globe size={320} />
            <span className="float-pill pill-1  mono">Java</span>
            <span className="float-pill pill-2  mono">Spring Boot</span>
            <span className="float-pill pill-3  mono">Spring Security</span>
            <span className="float-pill pill-4  mono">JWT</span>
            <span className="float-pill pill-5  mono">Docker</span>
            <span className="float-pill pill-6  mono">Kafka</span>
            <span className="float-pill pill-7  mono">React</span>
            <span className="float-pill pill-8  mono">Git</span>
            <span className="float-pill pill-9  mono">AWS</span>
            <span className="float-pill pill-10 mono">MySQL</span>
            <span className="float-pill pill-11 mono">PostgreSQL</span>
            <span className="float-pill pill-12 mono">Hibernate</span>
          </div>
        </div>
      </div>

      {/* ── Row 2: Carousel ── */}
      <HeroCarousel />

      {/* ── Row 3: Stats bar ── */}
      <div className="stats-bar">
        {STATS.map((s, idx) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-icon">{STAT_ICONS[idx]}</span>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
}
