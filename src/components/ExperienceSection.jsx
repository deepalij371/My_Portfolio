import { Briefcase, GraduationCap } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import { experience, education } from "../constants/data.js";

export default function ExperienceSection() {
  return (
    <section className="block" id="experience">
      <Reveal>
        <SectionHead index="01" title="Experience & Education" />
        <div className="exp-edu-grid">
          {/* Experience column */}
          <div>
            <div className="col-title">
              <Briefcase size={14} /> EXPERIENCE
            </div>
            {experience.map((e) => (
              <div className="timeline-item" key={e.title}>
                <h4>{e.title}</h4>
                <p className="timeline-org">{e.org}</p>
                <p className="timeline-time">{e.time}</p>
                <ul>
                  {e.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education column */}
          <div id="education">
            <div className="col-title">
              <GraduationCap size={14} /> EDUCATION
            </div>
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
  );
}
