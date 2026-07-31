/**
 * Renders a numbered section heading used across all portfolio sections.
 * @param {string} index - Two-digit number e.g. "01"
 * @param {string} title - Section title
 */
export default function SectionHead({ index, title }) {
  return (
    <div className="section-head">
      <span className="section-index">{index}</span>
      <h2>{title}</h2>
    </div>
  );
}
