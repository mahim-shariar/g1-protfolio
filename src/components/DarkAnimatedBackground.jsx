import React, { useEffect, useRef } from "react";

const DarkAnimatedBackground = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particles = [];
    const particleCount = 80; // Reduced for better performance

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles with glow effect
      particles.forEach((particle) => {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3
        );
        gradient.addColorStop(0, `rgba(34, 211, 238, ${particle.opacity})`);
        gradient.addColorStop(1, "rgba(34, 211, 238, 0)");

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity + 0.2})`;
        ctx.fill();

        // Move particles slowly downward
        particle.y += particle.speed;

        // Reset particles that go off screen
        if (particle.y > canvas.height + 10) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    animationFrameId = requestAnimationFrame(drawParticles);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Animated particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-transparent to-blue-900/10"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[size:50px_50px] bg-[linear-gradient(to_right,theme(colors.cyan.400)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.cyan.400)_1px,transparent_1px)]"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DarkAnimatedBackground;
