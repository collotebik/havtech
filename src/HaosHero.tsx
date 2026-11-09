import { useEffect, useRef, useState } from 'react';
import heroVideo from '../images/hero-panel.mp4';
import heroPoster from '../images/hero-panel.jpg';

const services = ['Websites', 'Software', 'Systems'];

export default function HaosHero() {
  const [typed, setTyped] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) { setTyped(services[index]); return; }
    const word = services[index];
    const delay = deleting ? 62 : typed === word ? 1400 : 105;
    const timer = window.setTimeout(() => {
      if (!deleting && typed === word) { setDeleting(true); return; }
      if (deleting && typed === '') { setDeleting(false); setIndex((current) => (current + 1) % services.length); return; }
      setTyped(deleting ? word.slice(0, typed.length - 1) : word.slice(0, typed.length + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [typed, deleting, index]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0; let active = true; let visible = true;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const pointer = { x: -9999, y: -9999 };
    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2), rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(64, Math.max(24, Math.round((rect.width * rect.height) / 22000)));
      particles = Array.from({ length: count }, () => ({ x: Math.random() * rect.width, y: Math.random() * rect.height, vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16, r: Math.random() * 1.2 + .5 }));
    };
    const draw = () => {
      if (!active) return;
      const rect = canvas.getBoundingClientRect(); ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach((particle) => {
        const dx = pointer.x - particle.x, dy = pointer.y - particle.y, distance = Math.hypot(dx, dy);
        if (distance < 130 && distance > 0) { particle.x -= (dx / distance) * ((130 - distance) / 130) * .25; particle.y -= (dy / distance) * ((130 - distance) / 130) * .25; }
        particle.x += particle.vx; particle.y += particle.vy;
        if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;
        ctx.beginPath(); ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(45,154,75,.3)'; ctx.fill();
      });
      for (let a = 0; a < particles.length; a += 1) for (let b = a + 1; b < particles.length; b += 1) {
        const dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y, distance = dx * dx + dy * dy;
        if (distance < 12000) { ctx.beginPath(); ctx.moveTo(particles[a].x, particles[a].y); ctx.lineTo(particles[b].x, particles[b].y); ctx.strokeStyle = `rgba(18,63,79,${Math.max(0, .09 - distance / 140000)})`; ctx.lineWidth = 1; ctx.stroke(); }
      }
      frame = window.requestAnimationFrame(draw);
    };
    const start = () => { if (visible && document.visibilityState === 'visible' && !frame) frame = window.requestAnimationFrame(draw); };
    const stop = () => { if (frame) window.cancelAnimationFrame(frame); frame = 0; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); }, { threshold: .05 });
    const move = (event: MouseEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; };
    const leave = () => { pointer.x = -9999; pointer.y = -9999; };
    const visibility = () => { if (document.visibilityState === 'hidden') stop(); else start(); };
    seed(); observer.observe(canvas); canvas.addEventListener('mousemove', move); canvas.addEventListener('mouseleave', leave); window.addEventListener('resize', seed); document.addEventListener('visibilitychange', visibility); start();
    return () => { active = false; stop(); observer.disconnect(); canvas.removeEventListener('mousemove', move); canvas.removeEventListener('mouseleave', leave); window.removeEventListener('resize', seed); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (media.matches) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  return <section className="haos-container" aria-label="Havtek technology solutions showcase">
    <div className="haos-glow" aria-hidden="true" /><canvas ref={canvasRef} className="haos-particles" aria-hidden="true" /><div className="haos-image" aria-hidden="true"><video ref={videoRef} src={heroVideo} poster={heroPoster} autoPlay muted loop playsInline preload="metadata" /></div>
    <div className="grid-item top-left"><span className="label">TECHNOLOGY</span><span className="value">DIGITAL PARTNER</span></div><div className="grid-item top-center"><span className="label">YEAR</span><span className="value">2026</span></div><div className="grid-item top-right"><span className="label">TECH SOLUTIONS</span><span className="value">WEB · SOFTWARE · SYSTEMS</span></div>
    <div className="grid-item main-content"><p className="haos-kicker">HAVTEK / NAIROBI</p><h1>HavTek</h1><h2>We build <span className="typing-service">{typed}<i aria-hidden="true" /></span><br />for businesses ready to move forward.</h2><div className="hero-actions"><a className="hero-primary" href="#contact">Start a project <span aria-hidden="true">↗</span></a><a className="hero-secondary" href="#services">Explore services</a></div></div>
    <div className="grid-item center-logo" aria-hidden="true"><div className="haos-logo">Your Haven for Tech Solutions</div></div><div className="grid-item bottom-right"><a className="action-icon" href="#contact" aria-label="Start a project">↗</a></div>
  </section>;
}
