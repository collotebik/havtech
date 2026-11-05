import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Code2, Database, Globe2, LockKeyhole, Sparkles, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

type FloatingIcon = { Icon: LucideIcon; className: string; delay: number };

const icons: FloatingIcon[] = [
  { Icon: Sparkles, className: 'left-[10%] top-[18%]', delay: 0 },
  { Icon: ArrowUpRight, className: 'right-[10%] bottom-[20%]', delay: .6 },
];

function FloatingIcon({ item, pointer }: { item: FloatingIcon; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 22 });
  const springY = useSpring(y, { stiffness: 300, damping: 22 });

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const dx = pointer.current.x - (rect.left + rect.width / 2);
        const dy = pointer.current.y - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        if (distance < 170 && distance > 0) {
          const force = (1 - distance / 170) * 34;
          x.set((-dx / distance) * force);
          y.set((-dy / distance) * force);
        } else { x.set(0); y.set(0); }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [pointer, x, y]);

  const Icon = item.Icon;
  return <motion.div ref={ref} style={{ x: springX, y: springY }} className={`absolute ${item.className}`} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: item.delay, duration: 0.55 }}>
    <motion.div className="grid h-14 w-14 place-items-center rounded-2xl border border-sky-200/20 bg-white/10 text-sky-200 shadow-2xl backdrop-blur-md md:h-16 md:w-16" animate={{ y: [0, -8, 0, 8, 0], rotate: [0, 4, 0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}>
      <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
    </motion.div>
  </motion.div>;
}

export function FloatingIconsCta() {
  const pointer = useRef({ x: -9999, y: -9999 });
  return <section className="relative isolate mx-auto flex min-h-[480px] w-full max-w-[1100px] items-center justify-center overflow-hidden rounded-[28px] border border-sky-200/25 bg-[radial-gradient(ellipse_at_50%_0%,#203c58_0%,#16253a_52%,#111c2d_100%)] px-5 py-20 text-center text-sky-50 shadow-[0_28px_70px_rgba(3,15,30,.3)]" onMouseMove={(event) => { pointer.current = { x: event.clientX, y: event.clientY }; }}>
    {icons.map((item) => <FloatingIcon key={item.delay} item={item} pointer={pointer} />)}
    <div className="relative z-10 max-w-2xl">
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-sky-300/40 bg-sky-300/10 text-3xl font-bold text-sky-200 shadow-[0_0_0_8px_rgba(125,211,252,.05)]">H</div>
      <p className="mb-3 text-xs font-bold tracking-[.24em] text-sky-300">LET’S TALK</p>
      <h2 className="text-4xl font-bold tracking-tight text-sky-100 md:text-5xl">Have a project <em className="font-serif font-normal italic text-sky-300">in mind?</em></h2>
      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 md:text-lg">Let’s discuss how Havtek can help your business move forward.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><a className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-white" href="#contact">Start a project <ArrowUpRight className="h-4 w-4" /></a><a className="inline-flex items-center gap-2 rounded-full border border-sky-100/35 bg-white/5 px-6 py-3 text-sm font-bold text-sky-50 transition hover:bg-white/10" href="#pricing">View pricing</a></div>
    </div>
  </section>;
}
