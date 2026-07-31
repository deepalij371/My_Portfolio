import { useEffect, useRef } from "react";

/**
 * Premium animated background with:
 * 1. CSS dot-grid pattern
 * 2. Canvas-based moving particles with connecting lines
 * 3. Radial gradient vignette
 * 4. Floating blur circles (nebula orbs)
 */
export default function Background({ parallax = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);

  /* ── Canvas particles ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    /* Resize */
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener("resize", onResize);

    /* Particle class */
    const PARTICLE_COUNT = 55;
    const MAX_DIST = 130;
    let particles = [];

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r:  Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.25,
      }));
    }
    initParticles();

    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      /* Update positions */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      /* Draw connecting lines between close particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(63,214,208,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* Draw particles */
      for (const p of particles) {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        grad.addColorStop(0, `rgba(63,214,208,${p.opacity})`);
        grad.addColorStop(1, "rgba(63,214,208,0)");
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Parallax shifts for blur orbs */
  const s1 = `translate3d(${parallax.x * 18}px, ${parallax.y * 18}px, 0)`;
  const s2 = `translate3d(${parallax.x * -14}px, ${parallax.y * -14}px, 0)`;
  const s3 = `translate3d(${parallax.x * 10}px, ${parallax.y * -10}px, 0)`;

  return (
    <div className="bg-root" aria-hidden="true">
      {/* 1 ── dot-grid */}
      <div className="bg-grid" />

      {/* 2 ── canvas particles */}
      <canvas ref={canvasRef} className="bg-canvas" />

      {/* 3 ── radial gradient vignette */}
      <div className="bg-gradient" />

      {/* 4 ── blur orbs */}
      <span className="bg-orb bg-orb-a" style={{ transform: s1 }} />
      <span className="bg-orb bg-orb-b" style={{ transform: s2 }} />
      <span className="bg-orb bg-orb-c" style={{ transform: s3 }} />
      <span className="bg-orb bg-orb-d" />
    </div>
  );
}
