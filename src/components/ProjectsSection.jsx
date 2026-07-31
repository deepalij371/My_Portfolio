import { Github, ExternalLink } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import { projects } from "../constants/data.js";

export default function ProjectsSection() {
  return (
    <section className="block" id="projects">
      <Reveal>
        <SectionHead index="02" title="Projects" />
        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.name}>
              <h3>{p.name}</h3>
              {p.note && <div className="note">// {p.note}</div>}
              <p>{p.desc}</p>
              <div className="stack-row">
                {p.stack.map((s) => (
                  <span className="stack-chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              {p.link && (
                <a
                  className="project-link"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={14} /> View repository <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
