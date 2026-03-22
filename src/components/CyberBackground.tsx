import React, { useEffect, useRef } from 'react';

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(59, 130, 246, 0.3)',
      'rgba(139, 92, 246, 0.3)',
      'rgba(6, 182, 212, 0.3)',
      'rgba(16, 185, 129, 0.3)',
    ];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const binaryStrings: Array<{
      x: number;
      y: number;
      speed: number;
      text: string;
      opacity: number;
    }> = [];

    for (let i = 0; i < 15; i++) {
      const binaryText = Array.from({ length: 20 }, () =>
        Math.random() > 0.5 ? '1' : '0'
      ).join('');
      binaryStrings.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.3 + 0.1,
        text: binaryText,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    const hexagons: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 12; i++) {
      hexagons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        opacity: Math.random() * 0.1 + 0.05,
      });
    }

    const drawHexagon = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = size * Math.cos(angle);
        const hy = size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      binaryStrings.forEach((bin) => {
        ctx.font = '12px monospace';
        ctx.fillStyle = `rgba(6, 182, 212, ${bin.opacity})`;
        ctx.fillText(bin.text, bin.x, bin.y);

        bin.y += bin.speed;
        if (bin.y > canvas.height) {
          bin.y = -20;
          bin.x = Math.random() * canvas.width;
        }
      });

      hexagons.forEach((hex) => {
        drawHexagon(hex.x, hex.y, hex.size, hex.rotation, hex.opacity);
        hex.rotation += hex.rotationSpeed;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};
