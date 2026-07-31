import { useStars } from "../hooks/useStars.js";

export default function Starfield({ parallax }) {
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
