import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: "about",
    tag: "// who_am_i",
    title: "Java Backend Developer",
    body: "Building secure, scalable enterprise applications with Spring Boot & Microservices. Passionate about clean architecture and production-grade engineering.",
    accent: "#3fd6d0",
    emoji: "🚀",
  },
  {
    id: "skills",
    tag: "// core_stack",
    title: "30+ Technologies Mastered",
    body: "Spring Boot · Spring Cloud · Hibernate · Kafka · Docker · AWS · REST APIs · JWT · Eureka · PostgreSQL · React",
    accent: "#7c6ef2",
    emoji: "⚡",
  },
  {
    id: "project",
    tag: "// featured_project",
    title: "PharmaGo — Medicine Platform",
    body: "OCR prescription search · JWT Auth · PostgreSQL · Spring Boot · React frontend. Full-stack medicine ordering with real-time reminders.",
    accent: "#3fd6d0",
    emoji: "💊",
  },
  {
    id: "internship",
    tag: "// experience",
    title: "Internship @ Nexturn India",
    body: "Nov 2024 — Jul 2025 · Built REST APIs for Global Carbon Warrior climate-tech platform with Kafka streaming, AWS S3, and OTP email verification.",
    accent: "#f27c6e",
    emoji: "💼",
  },
  {
    id: "education",
    tag: "// education",
    title: "B.Tech CSE — CGPA 8.1/10",
    body: "Govt. College of Engineering, Kalahandi · BPUT University · 2020–2023. Strong foundation in computer science and software engineering.",
    accent: "#6ef2a0",
    emoji: "🎓",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  function goTo(index) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((index + slides.length) % slides.length);
      setAnimating(false);
    }, 220);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Auto-advance every 4.5 seconds
  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const s = slides[current];

  return (
    <div className="carousel-wrap">
      {/* Slide card */}
      <div
        className={`carousel-card ${animating ? "carousel-fade-out" : "carousel-fade-in"}`}
        style={{ "--accent": s.accent }}
      >
        <div className="carousel-tag mono">{s.tag}</div>
        <div className="carousel-emoji">{s.emoji}</div>
        <h3 className="carousel-title">{s.title}</h3>
        <p className="carousel-body">{s.body}</p>
      </div>

      {/* Controls */}
      <div className="carousel-controls">
        <button className="carousel-btn" onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={16} />
        </button>

        {/* Dots */}
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button className="carousel-btn" onClick={next} aria-label="Next slide">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
