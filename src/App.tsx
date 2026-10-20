import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Sections from './Sections';
import { Photo, HERO } from './shared';
import { useScrollFx } from './fx';

const NAV_LINKS = ['About', 'Work', 'Services', 'Packages', 'Contact'];

function Chars({ t }: { t: string }) {
  return (<>{t.split('').map((c, i) => (
    <span key={i} className="char-wrap inline-block overflow-hidden py-[0.14em] -my-[0.14em] pr-[0.03em] align-bottom"><span className="char inline-block">{c}</span></span>
  ))}</>);
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  useScrollFx(root);
  const linkCls = 'text-sm font-light text-ink/70 transition-colors hover:text-ink';

  return (
    <div ref={root} className="min-h-screen overflow-x-clip bg-ivory font-body text-ink">
      <div className="loader fixed inset-0 z-[100] flex items-end justify-between bg-ink p-8 text-ivory" aria-hidden="true">
        <span className="font-heading text-lg italic">The Crownx Studios</span>
        <span className="loader-num font-heading text-[22vw] font-light italic leading-none">0</span>
      </div>
      <div className="cursor pointer-events-none fixed left-0 top-0 z-[95] flex h-5 w-5 items-center justify-center rounded-full bg-clay text-[11px] font-medium text-ivory opacity-0" aria-hidden="true">
        <span className="cursor-t opacity-0">View</span>
      </div>
      <div className="lamp" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[60] text-white mix-blend-difference" aria-hidden="true">
        <i className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-current" />
        <i className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-current" />
        <i className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-current" />
        <i className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-current" />
        <div className="absolute left-6 top-16 hidden font-mono text-[11px] tracking-widest md:block"><span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-current" />REC <span className="tc">00:00:00</span></div>
        <div className="absolute right-6 top-16 hidden font-mono text-[11px] tracking-widest md:block">RAW · 4K · 24FPS</div>
        <div className="absolute bottom-7 left-8 hidden font-mono text-[11px] tracking-widest md:block">FRAME <span className="hud-frame">01</span> / 36</div>
        <div className="absolute bottom-7 right-8 hidden font-mono text-[11px] tracking-widest md:block">F/<span className="hud-f">1.4</span> · 1/<span className="hud-s">125</span> · ISO <span className="hud-iso">100</span></div>
      </div>
      <div className="focus pointer-events-none fixed left-0 top-0 z-[61] h-16 w-16 text-white opacity-0 mix-blend-difference" aria-hidden="true">
        <i className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-current" /><i className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-current" />
        <i className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-current" /><i className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-current" />
      </div>

      <header>
        <nav aria-label="Main navigation" className="fixed left-1/2 top-5 z-50 -translate-x-1/2 whitespace-nowrap">
          <div className="glass flex items-center gap-6 rounded px-5 py-2.5">
            <a href="#top" aria-label="The Crownx Studios home" className="font-heading text-lg italic">Crownx Studios</a>
            <div className="hidden items-center gap-5 md:flex">
              {NAV_LINKS.map((l) => (<a key={l} href={`#${l.toLowerCase()}`} className={linkCls}>{l}</a>))}
            </div>
            <a href="#contact" className="rounded bg-ink px-4 py-1.5 text-sm font-medium text-ivory">Book a shoot</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero relative h-screen min-h-[640px] overflow-hidden" aria-label="Introduction">
          <div className="hero-meta absolute inset-x-0 top-24 z-10 text-center text-xs font-light uppercase tracking-[0.35em] text-ink/60">
            Photography Studio · Weddings · Portraits · Stories
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
            <h1 className="hero-title select-none text-center" aria-label="The Crownx Studios">
              <span className="block pb-6 text-center font-body text-sm font-light not-italic uppercase tracking-[0.6em] text-ink/60" aria-hidden="true">The</span>
              <span className="hl-1 block" aria-hidden="true"><Chars t="Crownx" /></span>
              <span className="hl-2 -mt-[0.02em] block text-clay" aria-hidden="true"><Chars t="Studios" /></span>
            </h1>
          </div>
          {HERO.map((h, i) => (
            <div key={i} data-scroll={h.scroll} data-sx={h.sx} className={`absolute ${h.far ? 'z-[5]' : 'z-20'} ${h.cls}`}>
              <div data-mouse={h.mouse} className="h-full w-full">
                <div className="relative h-full w-full overflow-hidden rounded-[28px] shadow-2xl shadow-ink/30" style={{ transform: `rotate(${h.rot}deg)`, filter: h.far ? 'blur(3px)' : undefined, opacity: h.far ? 0.8 : 1 }}>
                  <Photo src={h.src} g={h.g} alt="Photography by The Crownx Studios" />
                </div>
              </div>
            </div>
          ))}
          <div className="hero-meta absolute inset-x-0 bottom-8 z-30 flex items-end justify-center px-6 md:px-10">
            <div className="mx-auto flex items-center gap-3 md:absolute md:left-1/2 md:-translate-x-1/2">
              <a href="#contact" data-magnet className="inline-flex items-center gap-2 rounded bg-ink px-6 py-3 text-sm font-medium text-ivory">Book your shoot <ArrowRight size={16} aria-hidden="true" /></a>
              <a href="#work" data-magnet className="glass inline-block rounded px-6 py-3 text-sm font-medium">View portfolio</a>
            </div>
          </div>
        </section>
        <Sections />
      </main>
    </div>
  );
}
