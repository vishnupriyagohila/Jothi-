import React, { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  rotation: number;
  rotationSpeed: number;
}

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool - keep it refined, delicate, not overwhelming
    const particleCount = window.innerWidth < 768 ? 20 : 35;
    const particles: HeartParticle[] = [];

    const createParticle = (initialRandomY = false): HeartParticle => ({
      x: Math.random() * width,
      y: initialRandomY ? Math.random() * height : height + 20,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.45 + 0.2,
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.35 + 0.1,
      fadeSpeed: (Math.random() - 0.5) * 0.003,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();

      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);

      // Top left curve
      context.bezierCurveTo(
        -size / 2,
        -size / 2,
        -size,
        topCurveHeight / 3,
        0,
        size
      );

      // Top right curve
      context.bezierCurveTo(
        size,
        topCurveHeight / 3,
        size / 2,
        -size / 2,
        0,
        topCurveHeight
      );

      context.closePath();

      // Soft rose & burgundy glow
      context.fillStyle = `rgba(244, 114, 182, ${opacity})`;
      context.shadowColor = 'rgba(225, 29, 72, 0.4)';
      context.shadowBlur = 10;
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.45 || p.opacity < 0.08) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -30 || p.x < -30 || p.x > width + 30) {
          particles[i] = createParticle(false);
        }

        drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.rotation);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Burgundy & Rose Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[650px] max-h-[650px] rounded-full bg-rose-950/30 blur-[130px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full bg-[#360718]/40 blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-pink-950/20 blur-[160px]" />

      {/* Floating Canvas Hearts */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* Subtle Star Sparkles Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px] opacity-40" />
    </div>
  );
};
