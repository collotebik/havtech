import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SiDiscord, SiDropbox, SiFigma, SiGithub, SiGoogle, SiLinear, SiNotion, SiSlackware, SiSpotify, SiStripe, SiTypescript, SiTwitch, SiVercel, SiX, SiYoutube } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { useEffect, useRef } from 'react';

type IconItem = { id: number; Icon: IconType; className: string; delay: number; color: string };

const icons: IconItem[] = [
  { id: 1, Icon: SiGoogle, color: '#4285f4', className: 'left-[8%] top-[12%]', delay: 0 },
  { id: 2, Icon: SiGithub, color: '#f1f1f1', className: 'left-[22%] top-[28%]', delay: .08 },
  { id: 3, Icon: SiVercel, color: '#f1f1f1', className: 'right-[20%] top-[12%]', delay: .16 },
  { id: 4, Icon: SiSlackware, color: '#36c5f0', className: 'right-[8%] top-[30%]', delay: .24 },
  { id: 5, Icon: SiTypescript, color: '#3178c6', className: 'left-[10%] bottom-[16%]', delay: .32 },
  { id: 6, Icon: SiFigma, color: '#a259ff', className: 'left-[26%] bottom-[9%]', delay: .4 },
  { id: 7, Icon: SiSpotify, color: '#1ed760', className: 'right-[25%] bottom-[10%]', delay: .48 },
  { id: 8, Icon: SiDiscord, color: '#5865f2', className: 'right-[8%] bottom-[18%]', delay: .56 },
  { id: 9, Icon: SiStripe, color: '#635bff', className: 'left-[4%] top-[52%]', delay: .64 },
  { id: 10, Icon: SiYoutube, color: '#ff0000', className: 'right-[4%] top-[54%]', delay: .72 },
  { id: 11, Icon: SiNotion, color: '#f1f1f1', className: 'left-[16%] top-[6%]', delay: .8 },
  { id: 12, Icon: SiX, color: '#f1f1f1', className: 'right-[16%] top-[6%]', delay: .88 },
  { id: 13, Icon: SiDropbox, color: '#0061ff', className: 'left-[15%] bottom-[30%]', delay: .96 },
  { id: 14, Icon: SiTwitch, color: '#9146ff', className: 'right-[14%] bottom-[30%]', delay: 1.04 },
  { id: 15, Icon: SiLinear, color: '#8b5cf6', className: 'left-[36%] top-[14%]', delay: 1.12 },
  { id: 16, Icon: SiGithub, color: '#f1f1f1', className: 'right-[36%] top-[14%]', delay: 1.2 },
];

function FloatingIcon({ item, pointer }: { item: IconItem; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect(); const dx = pointer.current.x - (r.left + r.width / 2); const dy = pointer.current.y - (r.top + r.height / 2); const distance = Math.hypot(dx, dy);
        if (distance < 150 && distance > 0) { const force = (1 - distance / 150) * 46; x.set((-dx / distance) * force); y.set((-dy / distance) * force); } else { x.set(0); y.set(0); }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [pointer, x, y]);
  const Icon = item.Icon;
  return <motion.div ref={ref} style={{ x: springX, y: springY }} className={`absolute ${item.className}`} initial={{ opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: item.delay, duration: .6, ease: [0.22, 1, 0.36, 1] }}>
    <motion.div className="grid h-14 w-14 place-items-center rounded-3xl border border-white/[.08] bg-[#151515] p-3 shadow-[0_14px_30px_rgba(0,0,0,.35)] md:h-20 md:w-20" animate={{ y: [0, -8, 0, 8, 0], x: [0, 6, 0, -6, 0], rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: item.delay }}><Icon className="h-7 w-7 md:h-9 md:w-9" style={{ color: item.color }} /></motion.div>
  </motion.div>;
}

export function FloatingIconsHero({ cta = false }: { cta?: boolean }) {
  const pointer = useRef({ x: -9999, y: -9999 });
  return <section className="relative mx-auto flex min-h-[520px] w-full flex-col items-center gap-8 overflow-hidden rounded-[28px] border border-sky-200/20 bg-[#111c2d] px-4 pb-12 pt-14 text-center text-white shadow-[0_24px_70px_rgba(3,15,30,.25)] sm:px-8 lg:px-24">
    <div className="pointer-events-none absolute -top-32 left-1/2 z-0 h-80 w-[780px] -translate-x-1/2 opacity-35" style={{ background: 'linear-gradient(90deg,#8b5cf6 0%,#38bdf8 50%,#14b8a6 100%)', filter: 'blur(180px)' }} />
    <div className="relative z-10 flex max-w-full flex-wrap items-center justify-center rounded-full border border-white/10 bg-white/[.04] px-2 py-1 shadow-sm"><span className="px-2.5 py-1.5 text-xs text-white/60 sm:text-sm">Founder-led</span><span className="h-3.5 w-px bg-white/15" /><span className="px-2.5 py-1.5 text-xs text-white/60 sm:text-sm">Clear quotes</span><span className="h-3.5 w-px bg-white/15" /><span className="px-2.5 py-1.5 text-xs text-white/60 sm:text-sm">Kenya + worldwide</span></div>
    <div className="relative z-10 flex w-full flex-col items-center gap-5"><h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">{cta ? <>Have a project <span className="block text-sky-300">in mind?</span></> : 'Technology that moves business forward.'}</h2><p className="max-w-2xl text-base text-white/65 md:text-lg md:leading-7">{cta ? 'Let’s discuss how Havtek can help your business move forward.' : 'Websites, software and IT solutions from Kenya, for businesses everywhere.'}</p></div>
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4"><a href="#contact" className="inline-flex h-11 items-center rounded-lg bg-white px-6 font-medium text-black transition hover:bg-white/90">{cta ? 'Start a project' : 'Start a project'}</a><a href={cta ? '#pricing' : '#services'} className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 bg-white/[.04] px-6 font-medium text-white transition hover:bg-white/[.1]">{cta ? 'View pricing' : 'Explore services'} <ArrowUpRight className="h-4 w-4" /></a></div>
    <div className="relative z-10 flex items-center justify-center gap-3 text-white/60">{icons.slice(0, 6).map(({ Icon, id, color }) => <span key={id} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.03]" title="Technology partner"><Icon className="h-5 w-5" style={{ color }} /></span>)}</div>
  </section>;
}
