/**
 * Premium profile photo frame with:
 * - Neon glowing border
 * - Pulsing outer ring
 * - Rotating dashed ring
 * - Floating particle dots
 * - Hover scale + glow intensify
 */
export default function PhotoFrame({ src, alt = "Profile photo" }) {
  // 10 particles evenly distributed around the circle
  const particles = Array.from({ length: 10 }, (_, i) => ({
    angle: i * 36, // 360 / 10
    delay: i * 0.3,
    size: i % 3 === 0 ? "lg" : i % 2 === 0 ? "md" : "sm",
  }));

  return (
    <div className="pf-root">
      {/* Outer pulse rings */}
      <span className="pf-pulse pf-pulse-1" />
      <span className="pf-pulse pf-pulse-2" />

      {/* Rotating dashed orbit ring */}
      <span className="pf-orbit" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className={`pf-particle pf-particle--${p.size}`}
          style={{
            "--angle": `${p.angle}deg`,
            "--delay": `${p.delay}s`,
          }}
        />
      ))}

      {/* Sparkle dots at cardinal points */}
      <span className="pf-sparkle pf-sparkle--top">✦</span>
      <span className="pf-sparkle pf-sparkle--right">✦</span>
      <span className="pf-sparkle pf-sparkle--bottom">✦</span>
      <span className="pf-sparkle pf-sparkle--left">✦</span>

      {/* Photo */}
      <div className="pf-photo-ring">
        <img src={src} alt={alt} className="pf-img" />
        {/* Inner glow overlay */}
        <span className="pf-inner-glow" />
      </div>
    </div>
  );
}
