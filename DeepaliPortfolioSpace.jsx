import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import {
  Mail, Phone, Github, Linkedin, ExternalLink, GraduationCap, Briefcase,
  Sparkles, Send, MessageCircle, X, Sun, Moon, Download, Code2, MapPin, Menu,
  ArrowUp, FolderGit2, Award, Layers
} from "lucide-react";

const PROFILE_PHOTO = "data:image/jpeg;base64,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";

const RESUME_CONTEXT = `
Name: Deepali Jena
Role: Java Developer specializing in Spring Boot and Microservices
Summary: Results-driven Java developer building secure, scalable enterprise applications with Spring Boot, Spring MVC, Hibernate and RESTful APIs, across monolithic and microservices architectures. Skilled with Oracle, MySQL, H2 databases via JPA/JDBC. Integrates Kafka and AWS. Uses Jenkins, SonarQube, Docker, Git for CI/CD. Comfortable with Agile and JMeter performance testing.
Skills: Java, JDBC, JSP, Servlets, Spring Boot, Spring MVC, Spring Security, Spring Cloud, Hibernate, JPA, Microservices, REST APIs, Swagger, Postman, Kafka, OpenFeign, Eureka, Oracle, MySQL, PostgreSQL, H2, AWS, Docker, Jenkins, SonarQube, Maven, Git, JUnit, Mockito, JMeter, HTML, CSS, JavaScript, React.
Experience: Java Developer Intern at Nexturn India Private Limited (Nov 2024 - Jul 2025), built Spring Boot REST APIs, JWT auth, OTP email verification, AWS S3 uploads, Kafka streaming for the Global Carbon Warrior climate-tech platform. Also completed Full Stack Java Training at Naresh IT, Hyderabad.
Projects: PharmaGo (medicine ordering platform with OCR prescription search, Spring Boot, Hibernate, PostgreSQL, React, JWT), Blog Application (full-stack blogging platform, Spring Security, JWT, React), Online Food Delivery (microservices with Eureka, API Gateway, OpenFeign, Docker), Global Carbon Warrior (climate-tech platform, Kafka, AWS S3).
Education: B.Tech Computer Science, Government College of Engineering Kalahandi, BPUT University, 2020-2023, CGPA 8.1/10. Diploma in Information Technology, Bhubanananda Odisha School of Engineering, SCTEVT, 2017-2020, 81%. HSC, Bidyadharpur Girls High School, 2017, 71%.
Contact: deepalij371@gmail.com, +91 7681816772, linkedin.com/in/deepali-jena-59b677244, Hyderabad, India.
`;

async function callClaude(messages) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: `You are a terse, helpful assistant embedded in Deepali Jena's portfolio site. Answer only using this context, in 2-4 sentences max, plain text, no markdown:\n${RESUME_CONTEXT}`,
      messages,
    }),
  });
  const data = await response.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
  return text || "No response.";
}

function useStars(count = 90) {
  return useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.6,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3,
      })),
    [count]
  );
}

function Starfield({ parallax }) {
  const stars = useStars(100);
  const shift = `translate3d(${parallax.x * -10}px, ${parallax.y * -10}px, 0)`;
  return (
    <div className="starfield" aria-hidden="true" style={{ transform: shift }}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
      <span className="comet" />
    </div>
  );
}

function Nebula({ parallax }) {
  const shift1 = `translate3d(${parallax.x * 14}px, ${parallax.y * 14}px, 0)`;
  const shift2 = `translate3d(${parallax.x * -18}px, ${parallax.y * -18}px, 0)`;
  return (
    <div className="nebula-layer" aria-hidden="true">
      <span className="nebula blob-a" style={{ transform: shift1 }} />
      <span className="nebula blob-b" style={{ transform: shift2 }} />
      <span className="nebula blob-c" />
    </div>
  );
}

function Globe({ size = 260 }) {
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 3.1;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    el.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1.35, 22, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x3fd6d0,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const glowGeo = new THREE.SphereGeometry(1.36, 16, 12);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3fd6d0,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.scale.set(1.15, 1.15, 1.15);
    scene.add(glow);

    let frameId;
    function animate() {
      sphere.rotation.y += 0.0028;
      sphere.rotation.x += 0.0007;
      glow.rotation.y -= 0.0012;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      if (el) el.innerHTML = "";
    };
  }, [size]);

  return <div ref={mountRef} className="globe-mount" style={{ width: size, height: size }} />;
}

const skillGroups = [
  { label: "core_java", items: ["Java", "JDBC", "JSP", "Servlets"] },
  { label: "spring_stack", items: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Cloud", "Hibernate", "JPA", "Microservices"] },
  { label: "apis_tools", items: ["REST APIs", "Swagger", "Postman", "Kafka", "OpenFeign", "Eureka"] },
  { label: "databases", items: ["Oracle", "MySQL", "PostgreSQL", "H2"] },
  { label: "cloud_devops", items: ["AWS", "Docker", "Jenkins", "SonarQube", "Maven", "Git"] },
  { label: "testing", items: ["JUnit", "Mockito", "JMeter"] },
  { label: "frontend", items: ["HTML", "CSS", "JavaScript", "React.js"] },
];

const projects = [
  {
    name: "PharmaGo",
    desc: "Online medicine ordering platform with OCR-based prescription search, secure uploads, and real-time reminders.",
    stack: ["Java", "Spring Boot", "Hibernate", "PostgreSQL", "React", "JWT", "OCR"],
    link: "https://github.com/deepalij371/PharmaGo",
  },
  {
    name: "Blog Application",
    desc: "Full-stack blogging platform with secure authentication, role-based authorization, and a responsive React UI.",
    stack: ["Spring Boot", "Spring Data JPA", "MySQL", "Spring Security", "React.js"],
    link: "https://github.com/deepalij371/blogapplication1.git",
  },
  {
    name: "Online Food Delivery",
    desc: "Microservices-based delivery system: independent User, Restaurant, Order, and Payment services with Eureka + API Gateway.",
    stack: ["Spring Cloud", "Eureka", "API Gateway", "OpenFeign", "Docker", "React.js"],
    link: "https://github.com/deepalij371/Food-Delivery-Project.git",
  },
  {
    name: "Global Carbon Warrior",
    desc: "Climate-tech platform for startups and investors. Built REST APIs, JWT security, OTP verification, S3 uploads, Kafka scheduling.",
    stack: ["Spring Boot", "JWT", "AWS S3", "Kafka"],
    link: null,
    note: "Built during internship at Nexturn India",
  },
];

const experience = [
  {
    title: "Java Developer Intern",
    org: "Nexturn India Private Limited",
    time: "Nov 2024 \u2014 Jul 2025",
    points: [
      "Developed Spring Boot REST APIs for Global Carbon Warrior, with JWT security and OTP email verification.",
      "Built AWS S3 file upload, Excel export, and paginated filtering modules.",
      "Integrated Kafka streaming and scheduled reminder jobs via Spring Scheduler.",
    ],
  },
  {
    title: "Full Stack Java Training",
    org: "Naresh IT, Hyderabad",
    time: "Training program",
    points: [
      "Backend: Core Java, Advanced Java, Spring, Spring Boot, Hibernate.",
      "Database: Oracle. Frontend: HTML, CSS, JavaScript.",
    ],
  },
];

const education = [
  { title: "B.Tech, Computer Science and Engineering", org: "Govt. College of Engineering, Kalahandi \u2014 BPUT University", time: "2020 \u2014 2023", detail: "CGPA: 8.1 / 10" },
  { title: "Diploma in Information Technology", org: "Bhubanananda Odisha School of Engineering \u2014 SCTEVT, Odisha", time: "2017 \u2014 2020", detail: "Percentage: 81%" },
  { title: "HSC (10th)", org: "Bidyadharpur Girls High School \u2014 BSE, Odisha", time: "2017", detail: "Percentage: 71%" },
];

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
];

const DEFAULT_BIO = "Specializing in Spring Boot, microservices, and secure REST APIs. Merging backend architecture with production-grade engineering.";

function downloadResume() {
  const text = `DEEPALI JENA
Java Developer | Spring Boot & Microservices Engineer
+91 7681816772 | deepalij371@gmail.com
linkedin.com/in/deepali-jena-59b677244 | Hyderabad, India

SUMMARY
Results-driven Java developer with hands-on experience designing, developing and deploying enterprise-grade applications using Java/J2EE, Spring Boot, Spring MVC, Hibernate and RESTful APIs across monolithic and microservices architectures.

SKILLS
${skillGroups.map((g) => `${g.label}: ${g.items.join(", ")}`).join("\n")}

EXPERIENCE
${experience.map((e) => `${e.title} \u2014 ${e.org} (${e.time})\n${e.points.map((p) => "- " + p).join("\n")}`).join("\n\n")}

PROJECTS
${projects.map((p) => `${p.name}: ${p.desc} [${p.stack.join(", ")}]`).join("\n")}

EDUCATION
${education.map((e) => `${e.title} \u2014 ${e.org} (${e.time}) ${e.detail}`).join("\n")}
`;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Deepali_Jena_Resume.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

const ROLES = ["JAVA DEVELOPER", "SPRING BOOT ENGINEER", "MICROSERVICES BUILDER", "REST API DEVELOPER"];

function useCyclingText(list, interval = 2600) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % list.length), interval);
    return () => clearInterval(t);
  }, [list, interval]);
  return list[i];
}

const STATS = [
  { icon: Briefcase, label: "yrs experience", value: "1+" },
  { icon: FolderGit2, label: "projects shipped", value: "4" },
  { icon: Award, label: "cgpa", value: "8.1" },
  { icon: Layers, label: "technologies", value: "30+" },
];


function SectionHead({ index, title }) {
  return (
    <div className="section-head">
      <span className="section-index">{index}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [navOpen, setNavOpen] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [showTop, setShowTop] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const scrollProgress = useScrollProgress();
  const cyclingRole = useCyclingText(ROLES);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleMouseMove(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setParallax({ x, y });
  }
  const [bio, setBio] = useState(DEFAULT_BIO);
  const [bioLoading, setBioLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about Deepali's experience, skills, or projects." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatOpen]);

  function scrollTo(id) {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
      setBio("Neural core offline \u2014 try generating again in a moment.");
    } finally {
      setBioLoading(false);
    }
  }

  async function sendChat(e) {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    const nextMessages = [...chatMessages, { role: "user", content: text }];
    setChatMessages(nextMessages);
    setChatInput("");
    setChatLoading(true);
    try {
      const apiMessages = nextMessages
        .filter((m) => !(m.role === "assistant" && m === nextMessages[0]))
        .map((m) => ({ role: m.role, content: m.content }));
      const reply = await callClaude(apiMessages);
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Connection lost. Try again in a moment." }]);
    } finally {
      setChatLoading(false);
    }
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n\u2014 ${form.name} (${form.email})`);
    window.open(`mailto:deepalij371@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  }

  return (
    <div className={`app ${theme}`} onMouseMove={handleMouseMove}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .app {
          --bg: #05070c;
          --bg-alt: #0a0e17;
          --panel: #0d1220;
          --line: #1c2536;
          --fg: #e7ecf5;
          --fg-dim: #8992a8;
          --cyan: #3fd6d0;
          --cyan-dim: #1c6b68;
          font-family: 'Space Grotesk', sans-serif;
          background: var(--bg);
          color: var(--fg);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .app.light {
          --bg: #f4f6fb;
          --bg-alt: #ffffff;
          --panel: #ffffff;
          --line: #dbe1ee;
          --fg: #10151f;
          --fg-dim: #5b6478;
          --cyan: #0f9d97;
          --cyan-dim: #bfeeeb;
        }
        * { box-sizing: border-box; }
        .app ::selection { background: var(--cyan-dim); color: #fff; }
        .mono { font-family: 'JetBrains Mono', monospace; }

        .nebula-layer { position: fixed; inset: -10%; z-index: 0; pointer-events: none; overflow: hidden; transition: transform .2s ease-out; }
        .app.light .nebula-layer { opacity: .35; }
        .nebula { position: absolute; border-radius: 50%; filter: blur(70px); opacity: .28; transition: transform .3s ease-out; }
        .blob-a { width: 420px; height: 420px; top: 4%; left: 8%; background: radial-gradient(circle, var(--cyan) 0%, transparent 70%); animation: drift-a 22s ease-in-out infinite; }
        .blob-b { width: 380px; height: 380px; bottom: 6%; right: 10%; background: radial-gradient(circle, #6d5ef2 0%, transparent 70%); animation: drift-b 26s ease-in-out infinite; }
        .blob-c { width: 300px; height: 300px; top: 40%; right: 30%; background: radial-gradient(circle, var(--cyan) 0%, transparent 72%); opacity: .16; animation: drift-c 30s ease-in-out infinite; }
        @keyframes drift-a { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,30px) scale(1.08); } }
        @keyframes drift-b { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-35px,-25px) scale(1.1); } }
        @keyframes drift-c { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-25px,20px); } }

        .starfield { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; transition: transform .2s ease-out; }
        .app.light .starfield { display: none; }
        .star {
          position: absolute;
          border-radius: 50%;
          background: #ffffff;
          animation: twinkle ease-in-out infinite;
        }
        @keyframes twinkle { 0%, 100% { opacity: .15; } 50% { opacity: 1; } }
        .comet {
          position: absolute;
          top: 14%;
          right: 8%;
          width: 90px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan));
          border-radius: 2px;
          animation: comet-move 6s ease-in-out infinite;
          box-shadow: 0 0 12px 2px var(--cyan);
        }
        @keyframes comet-move {
          0% { transform: translate(60px,-20px) rotate(-30deg); opacity: 0; }
          15% { opacity: 1; }
          50% { transform: translate(-40px,30px) rotate(-30deg); opacity: 1; }
          65% { opacity: 0; }
          100% { opacity: 0; }
        }

        .navbar {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 32px;
          background: rgba(5,7,12,0.7);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .scroll-progress { position: absolute; left: 0; bottom: -1px; height: 2px; background: var(--cyan); box-shadow: 0 0 8px var(--cyan); transition: width .1s linear; }
        .app.light .navbar { background: rgba(255,255,255,0.75); }
        .logo { font-weight: 700; font-size: 18px; letter-spacing: .02em; }
        .logo .dot-ai { color: var(--cyan); }
        .nav-links { display: flex; gap: 26px; }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-size: 12.5px; letter-spacing: .06em; font-weight: 600;
          color: var(--fg-dim); padding: 6px 0; border-bottom: 2px solid transparent;
          transition: all .15s ease;
        }
        .nav-links button:hover, .nav-links button:focus-visible { color: var(--cyan); outline: none; }
        .nav-links button.active { color: var(--cyan); border-bottom-color: var(--cyan); }
        .nav-right { display: flex; align-items: center; gap: 14px; }
        .icon-btn {
          background: none; border: 1px solid var(--line); color: var(--fg-dim);
          width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .15s ease;
        }
        .icon-btn:hover { border-color: var(--cyan); color: var(--cyan); }
        .cv-btn {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
          color: var(--cyan); background: transparent; border: 1px solid var(--cyan-dim);
          padding: 9px 16px; border-radius: 8px; cursor: pointer;
          display: flex; align-items: center; gap: 8px; letter-spacing: .04em;
        }
        .cv-btn:hover { background: var(--cyan-dim); }
        .nav-toggle { display: none; background: none; border: 1px solid var(--line); color: var(--fg); border-radius: 8px; padding: 6px 8px; }
        .mobile-nav { display: none; flex-direction: column; padding: 10px 20px 18px; border-bottom: 1px solid var(--line); background: var(--panel); }
        .mobile-nav.open { display: flex; }
        .mobile-nav button { text-align: left; background: none; border: none; color: var(--fg-dim); padding: 10px 2px; font-size: 13px; font-weight: 600; letter-spacing: .05em; border-bottom: 1px solid var(--line); }
        .mobile-nav button:last-child { border-bottom: none; }
        @media (max-width: 840px) {
          .nav-links { display: none; }
          .nav-toggle { display: inline-flex; }
        }

        .hero { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; padding: 56px 24px 40px; text-align: center; }
        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace; font-size: 11.5px; letter-spacing: .1em;
          color: var(--cyan); border: 1px solid var(--cyan-dim); padding: 6px 14px; border-radius: 999px;
          margin-bottom: 30px;
        }
        .badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 6px 2px var(--cyan); }

        .portrait-stack { position: relative; display: flex; flex-direction: column; align-items: center; margin-bottom: 6px; transition: transform .25s ease-out; }
        .photo-ring {
          width: 150px; height: 150px; border-radius: 50%;
          border: 3px solid var(--bg-alt); overflow: hidden;
          background: linear-gradient(135deg, var(--cyan-dim), var(--panel));
          display: flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 34px; color: var(--cyan);
          position: relative; z-index: 2; margin-bottom: -70px;
          box-shadow: 0 0 0 1px var(--line), 0 0 0 8px rgba(63,214,208,0.06);
          animation: ring-pulse 4s ease-in-out infinite;
        }
        @keyframes ring-pulse {
          0%, 100% { box-shadow: 0 0 0 1px var(--line), 0 0 0 8px rgba(63,214,208,0.06); }
          50% { box-shadow: 0 0 0 1px var(--line), 0 0 0 14px rgba(63,214,208,0.12); }
        }
        .photo-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .globe-mount { position: relative; z-index: 1; opacity: .9; }

        .hero h1 {
          font-size: clamp(38px, 7vw, 64px); font-weight: 700; letter-spacing: .01em;
          margin: 8px 0 4px; position: relative; z-index: 2;
          background: linear-gradient(100deg, var(--fg) 30%, var(--cyan) 48%, var(--fg) 66%);
          background-size: 260% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: shimmer 7s ease-in-out infinite;
        }
        @keyframes shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .hero .role {
          font-family: 'JetBrains Mono', monospace; color: var(--cyan);
          font-size: 14px; letter-spacing: .16em; margin: 0 0 26px; min-height: 18px;
        }

        .stats-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-bottom: 26px; }
        .stat-card {
          display: flex; align-items: center; gap: 10px;
          background: var(--panel); border: 1px solid var(--line); border-radius: 10px;
          padding: 10px 16px; color: var(--cyan);
        }
        .stat-value { font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 15px; color: var(--fg); line-height: 1.1; }
        .stat-label { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: var(--fg-dim); letter-spacing: .04em; }

        .bio-card {
          background: var(--panel); border: 1px solid var(--line); border-radius: 12px;
          padding: 16px 20px; text-align: left; max-width: 560px; margin: 0 auto 20px;
        }
        .bio-titlebar { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .bio-dot { width: 9px; height: 9px; border-radius: 50%; }
        .bio-dot.r { background: #e5534b; } .bio-dot.y { background: #e3b341; } .bio-dot.g { background: #3fb950; }
        .bio-label { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: var(--fg-dim); margin-left: 4px; }
        .bio-text { font-family: 'JetBrains Mono', monospace; font-size: 13.5px; color: var(--fg); line-height: 1.6; }
        .bio-text::before { content: '> '; color: var(--cyan); }

        .generate-btn {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
          background: var(--panel); border: 1px solid var(--cyan-dim); color: var(--cyan);
          padding: 10px 18px; border-radius: 999px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px; letter-spacing: .04em;
        }
        .generate-btn:hover { background: var(--cyan-dim); }
        .generate-btn:disabled { opacity: .6; cursor: default; }

        section.block { position: relative; z-index: 1; max-width: 980px; margin: 0 auto; padding: 60px 24px; border-top: 1px solid var(--line); }
        .section-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 32px; }
        .section-index { font-family: 'JetBrains Mono', monospace; color: var(--cyan); font-size: 13px; }
        .section-head h2 { font-size: 26px; font-weight: 700; margin: 0; }

        .exp-edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        @media (max-width: 720px) { .exp-edu-grid { grid-template-columns: 1fr; } }
        .col-title { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--fg-dim); display: flex; align-items: center; gap: 8px; margin-bottom: 18px; letter-spacing: .06em; }
        .timeline-item { position: relative; padding-left: 22px; border-left: 2px solid var(--line); padding-bottom: 26px; }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-item::before { content: ''; position: absolute; left: -6px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 0 3px var(--bg); }
        .timeline-item h4 { margin: 0 0 4px; font-size: 15.5px; }
        .timeline-org { font-size: 13px; color: var(--fg-dim); margin: 0 0 2px; }
        .timeline-time { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: var(--cyan); margin: 0 0 8px; }
        .timeline-item ul { margin: 0; padding-left: 18px; }
        .timeline-item li { font-size: 13px; color: var(--fg-dim); margin-bottom: 5px; }
        .timeline-detail { font-size: 13px; color: var(--fg-dim); }

        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; }
        .project-card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; transition: border-color .15s, transform .15s; }
        .project-card:hover { border-color: var(--cyan-dim); transform: translateY(-2px); }
        .project-card h3 { margin: 0 0 10px; font-size: 18px; }
        .project-card p { color: var(--fg-dim); font-size: 13.5px; margin: 0 0 14px; flex: 1; }
        .note { color: var(--cyan); font-family: 'JetBrains Mono', monospace; font-size: 11.5px; margin: -6px 0 12px; }
        .stack-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .stack-chip { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--cyan); background: transparent; border: 1px solid var(--cyan-dim); padding: 3px 8px; border-radius: 4px; }
        .project-link { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--fg); display: inline-flex; align-items: center; gap: 6px; text-decoration: none; border-top: 1px solid var(--line); padding-top: 12px; margin-top: auto; }
        .project-link:hover { color: var(--cyan); }

        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        .skill-card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 16px 18px; }
        .skill-card .label { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--cyan); margin-bottom: 12px; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .skill-tag { font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 4px 10px; border-radius: 4px; background: var(--bg-alt); border: 1px solid var(--line); color: var(--fg); }

        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        @media (max-width: 720px) { .contact-grid { grid-template-columns: 1fr; } }
        .contact-info-card, form.contact-form { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 22px; }
        .contact-info-card p.lead { color: var(--fg-dim); font-size: 14px; margin: 0 0 18px; }
        .contact-line { display: flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--fg); text-decoration: none; padding: 9px 0; border-bottom: 1px solid var(--line); }
        .contact-line:last-child { border-bottom: none; }
        .contact-line:hover { color: var(--cyan); }
        .contact-line svg { color: var(--cyan); flex-shrink: 0; }
        form.contact-form { display: flex; flex-direction: column; gap: 14px; }
        form.contact-form label { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: var(--fg-dim); margin-bottom: 6px; display: block; }
        form.contact-form input, form.contact-form textarea {
          width: 100%; background: var(--bg-alt); border: 1px solid var(--line); border-radius: 8px;
          padding: 10px 12px; color: var(--fg); font-family: 'Space Grotesk', sans-serif; font-size: 13.5px; resize: vertical;
        }
        form.contact-form input:focus, form.contact-form textarea:focus { outline: none; border-color: var(--cyan); }
        .submit-btn {
          font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600;
          background: var(--cyan); color: #04211f; border: none; padding: 11px 18px; border-radius: 8px;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover { opacity: .9; }
        .sent-note { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--cyan); }

        footer { position: relative; z-index: 1; max-width: 980px; margin: 0 auto; padding: 30px 24px; text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--fg-dim); }

        .chat-launcher {
          position: fixed; bottom: 24px; right: 24px; z-index: 60;
          width: 54px; height: 54px; border-radius: 50%; background: var(--cyan); border: none;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .chat-launcher svg { color: #04211f; }
        .chat-hint {
          position: fixed; bottom: 34px; right: 90px; z-index: 59;
          background: var(--panel); border: 1px solid var(--line); color: var(--fg);
          padding: 8px 14px; border-radius: 999px; font-size: 13px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .chat-panel {
          position: fixed; bottom: 90px; right: 24px; z-index: 60;
          width: 320px; max-width: calc(100vw - 48px); height: 420px;
          background: var(--panel); border: 1px solid var(--line); border-radius: 14px;
          display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.45);
        }
        .chat-header { padding: 14px 16px; border-bottom: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; }
        .chat-header span { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--cyan); }
        .chat-header button { background: none; border: none; color: var(--fg-dim); cursor: pointer; }
        .chat-body { flex: 1; overflow-y: auto; padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; }
        .chat-msg { font-size: 13px; padding: 9px 12px; border-radius: 10px; max-width: 85%; line-height: 1.5; }
        .chat-msg.assistant { background: var(--bg-alt); color: var(--fg); align-self: flex-start; }
        .chat-msg.user { background: var(--cyan-dim); color: var(--fg); align-self: flex-end; }
        .chat-form { display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--line); }
        .chat-form input { flex: 1; background: var(--bg-alt); border: 1px solid var(--line); border-radius: 8px; padding: 8px 10px; color: var(--fg); font-size: 13px; }
        .chat-form input:focus { outline: none; border-color: var(--cyan); }
        .chat-form button { background: var(--cyan); border: none; color: #04211f; border-radius: 8px; width: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; }

        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s ease, transform .7s ease; }
        .reveal-in { opacity: 1; transform: translateY(0); }

        .scroll-top-btn {
          position: fixed; bottom: 24px; left: 24px; z-index: 55;
          width: 42px; height: 42px; border-radius: 50%; background: var(--panel);
          border: 1px solid var(--line); color: var(--cyan); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.35);
        }
        .scroll-top-btn:hover { border-color: var(--cyan); }

        @media (prefers-reduced-motion: reduce) {
          .star, .comet, .nebula, .hero h1, .photo-ring { animation: none !important; }
          .starfield, .nebula-layer, .portrait-stack { transform: none !important; }
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <Nebula parallax={parallax} />
      <Starfield parallax={parallax} />

      <nav className="navbar">
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        <div className="logo">DEEPALI<span className="dot-ai">.DEV</span></div>
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
          <button className="icon-btn" aria-label="Toggle theme" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="cv-btn" onClick={downloadResume}>
            <Download size={14} /> DOWNLOAD CV
          </button>
          <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setNavOpen((v) => !v)}>
            <Menu size={18} />
          </button>
        </div>
      </nav>
      <div className={`mobile-nav ${navOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((n) => (
          <button key={n.id} onClick={() => scrollTo(n.id)}>{n.label}</button>
        ))}
      </div>

      <section className="hero" id="home">
        <div className="badge">SYSTEM ONLINE</div>

        <div
          className="portrait-stack"
          style={{ transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 6}px, 0)` }}
        >
          <div className="photo-ring">
            <img src={PROFILE_PHOTO} alt="Deepali Jena" className="photo-img" />
          </div>
          <Globe size={240} />
        </div>

        <h1>DEEPALI JENA</h1>
        <p className="role mono">{cyclingRole}</p>

        <div className="stats-row">
          {STATS.map((s) => (
            <div className="stat-card" key={s.label}>
              <s.icon size={16} />
              <div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bio-card">
          <div className="bio-titlebar">
            <span className="bio-dot r" /><span className="bio-dot y" /><span className="bio-dot g" />
            <span className="bio-label">BACKEND_CORE // BIO_GENERATOR</span>
          </div>
          <div className="bio-text">{bioLoading ? "generating\u2026" : bio}</div>
        </div>

        <button className="generate-btn" onClick={generateBio} disabled={bioLoading}>
          <Sparkles size={14} /> {bioLoading ? "THINKING\u2026" : "GENERATE NEW BIO"}
        </button>
      </section>

      <section className="block" id="experience">
        <Reveal>
        <SectionHead index="01" title="Experience & Education" />
        <div className="exp-edu-grid">
          <div>
            <div className="col-title"><Briefcase size={14} /> EXPERIENCE</div>
            {experience.map((e) => (
              <div className="timeline-item" key={e.title}>
                <h4>{e.title}</h4>
                <p className="timeline-org">{e.org}</p>
                <p className="timeline-time">{e.time}</p>
                <ul>{e.points.map((pt, i) => <li key={i}>{pt}</li>)}</ul>
              </div>
            ))}
          </div>
          <div id="education">
            <div className="col-title"><GraduationCap size={14} /> EDUCATION</div>
            {education.map((ed) => (
              <div className="timeline-item" key={ed.title}>
                <h4>{ed.title}</h4>
                <p className="timeline-org">{ed.org}</p>
                <p className="timeline-time">{ed.time}</p>
                <p className="timeline-detail">{ed.detail}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      <section className="block" id="projects">
        <Reveal>
        <SectionHead index="02" title="Projects" />
        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.name}>
              <h3>{p.name}</h3>
              {p.note && <div className="note">// {p.note}</div>}
              <p>{p.desc}</p>
              <div className="stack-row">{p.stack.map((s) => <span className="stack-chip" key={s}>{s}</span>)}</div>
              {p.link && (
                <a className="project-link" href={p.link} target="_blank" rel="noopener noreferrer">
                  <Github size={14} /> View repository <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      <section className="block" id="skills">
        <Reveal>
        <SectionHead index="03" title="Stack" />
        <div className="skills-grid">
          {skillGroups.map((g) => (
            <div className="skill-card" key={g.label}>
              <div className="label">"{g.label}"</div>
              <div className="skill-tags">{g.items.map((it) => <span className="skill-tag" key={it}>{it}</span>)}</div>
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      <section className="block" id="contact">
        <Reveal>
        <SectionHead index="04" title="Contact" />
        <div className="contact-grid">
          <div className="contact-info-card">
            <p className="lead">Open to Java developer roles and backend engineering opportunities.</p>
            <a className="contact-line" href="mailto:deepalij371@gmail.com"><Mail size={16} /> deepalij371@gmail.com</a>
            <a className="contact-line" href="tel:+917681816772"><Phone size={16} /> +91 7681816772</a>
            <a className="contact-line" href="https://www.linkedin.com/in/deepali-jena-59b677244" target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> linkedin.com/in/deepali-jena</a>
            <a className="contact-line" href="https://github.com/deepalij371" target="_blank" rel="noopener noreferrer"><Github size={16} /> github.com/deepalij371</a>
            <a className="contact-line" href="#contact" onClick={(e) => e.preventDefault()}><MapPin size={16} /> Hyderabad, India</a>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div>
              <label htmlFor="name">name</label>
              <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message">message</label>
              <textarea id="message" rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Let's talk about..." />
            </div>
            <button className="submit-btn" type="submit"><Send size={15} /> Send message</button>
            {sent && <span className="sent-note">// mail client opened \u2014 review and hit send</span>}
          </form>
        </div>
        </Reveal>
      </section>

      <footer>deepali@portfolio:~$ echo "Thanks for stopping by."</footer>

      {showTop && (
        <button className="scroll-top-btn" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ArrowUp size={18} />
        </button>
      )}

      {!chatOpen && <div className="chat-hint">Hi! Ask me! \uD83D\uDC4B</div>}
      <button className="chat-launcher" aria-label="Open chat" onClick={() => setChatOpen((v) => !v)}>
        {chatOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {chatOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <span>ASK_DEEPALI.AI</span>
            <button onClick={() => setChatOpen(false)} aria-label="Close chat"><X size={16} /></button>
          </div>
          <div className="chat-body">
            {chatMessages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.content}</div>
            ))}
            {chatLoading && <div className="chat-msg assistant">thinking\u2026</div>}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-form" onSubmit={sendChat}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about my experience..."
            />
            <button type="submit" aria-label="Send"><Send size={15} /></button>
          </form>
        </div>
      )}
    </div>
  );
}
