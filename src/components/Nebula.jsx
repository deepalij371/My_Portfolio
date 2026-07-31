export default function Nebula({ parallax }) {
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
