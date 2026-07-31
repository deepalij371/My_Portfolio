import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import { skillGroups } from "../constants/data.js";

export default function SkillsSection() {
  return (
    <section className="block" id="skills">
      <Reveal>
        <SectionHead index="03" title="Stack" />
        <div className="skills-grid">
          {skillGroups.map((g) => (
            <div className="skill-card" key={g.label}>
              <div className="label">"{g.label}"</div>
              <div className="skill-tags">
                {g.items.map((it) => (
                  <span className="skill-tag" key={it}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
