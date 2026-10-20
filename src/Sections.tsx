import { useEffect, useRef, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import { Photo, WHATSAPP, EMAIL } from './shared';

/* ---------- EDIT ME ---------- */
const WORK = [
  { t: 'Golden Hour Vows', c: 'Wedding', src: '/photos/work-1.jpg', g: 'from-amber-300 to-rose-800' },
  { t: 'Monsoon Promise', c: 'Pre-wedding', src: '/photos/work-2.jpg', g: 'from-emerald-300 to-teal-900' },
  { t: 'Waiting for You', c: 'Maternity', src: '/photos/work-3.jpg', g: 'from-orange-200 to-pink-800' },
  { t: 'Studio Noir', c: 'Portrait', src: '/photos/work-4.jpg', g: 'from-zinc-300 to-zinc-800' },
  { t: 'Haldi Colours', c: 'Wedding', src: '/photos/work-5.jpg', g: 'from-yellow-300 to-orange-800' },
  { t: 'First Light', c: 'Newborn', src: '/photos/work-6.jpg', g: 'from-sky-200 to-indigo-900' },
];
const EXIF = ['f/1.8 · 1/250 · ISO 100', 'f/2.8 · 1/500 · ISO 200', 'f/1.4 · 1/125 · ISO 400', 'f/4 · 1/60 · ISO 100', 'f/2 · 1/1000 · ISO 160', 'f/1.2 · 1/200 · ISO 320'];
const SERVICES = [
  ['01', 'Wedding', 'Full-day candid and traditional coverage with a cinematic highlight film.', '/photos/service-1.jpg', 'from-amber-300 to-rose-700', 'bg-sand text-ink'],
  ['02', 'Pre-wedding', 'Outdoor and studio love stories shot at golden hour.', '/photos/service-2.jpg', 'from-emerald-300 to-teal-800', 'bg-clay text-ivory'],
  ['03', 'Maternity & Newborn', 'Soft light, slow moments, memories that grow with the family.', '/photos/service-3.jpg', 'from-orange-200 to-pink-700', 'bg-ink text-ivory'],
  ['04', 'Portraits & Fashion', 'Studio and editorial sessions for people, portfolios and brands.', '/photos/service-4.jpg', 'from-zinc-300 to-zinc-800', 'bg-[#D9B38C] text-ink'],
  ['05', 'Events & Products', 'Birthdays, corporate events and clean product shoots.', '/photos/service-5.jpg', 'from-sky-300 to-indigo-800', 'bg-[#6B3A2A] text-ivory'],
];
const PLANS = [
  { name: 'Essential', price: '₹25,000', note: 'Pre-wedding or portrait session', items: ['4 hour shoot', '40 edited photos', 'Online gallery'] },
  { name: 'Signature', price: '₹85,000', note: 'Wedding day coverage', items: ['Candid + traditional team', '400 edited photos', 'Cinematic teaser film', 'Premium album'], featured: true },
  { name: 'Cinematic', price: '₹1,60,000', note: 'Multi-day celebrations', items: ['2 photographers + videographer', 'Drone coverage', 'Full wedding film', 'Priority delivery'] },
];
/* ------------------------------ */

const STORY = 'We do not just click pictures. We stay for the nervous laughs, the quiet glances and the chaos in between, then frame them like scenes from a film you will want to watch for the rest of your life.';

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const sub = 'mt-6 max-w-md text-sm font-light leading-relaxed opacity-70';

export default function Sections() {
  return (
    <div className="relative z-30 bg-ivory">
      {/* Contact sheet: film strips sliding in opposite directions */}
      <div className="skewme overflow-hidden bg-ink py-12" aria-hidden="true">
        {[1, -1].map((d) => (
          <div key={d} className="film my-4 overflow-hidden">
            <div data-row={d} className="flex w-max gap-3">
              {Array.from({ length: 16 }, (_, i) => (
                <div key={i} className={`relative h-40 w-56 shrink-0 overflow-hidden bg-gradient-to-br ${WORK[(i + (d > 0 ? 0 : 3)) % 6].g}`}>
                  <img src={`/photos/work-${((i + (d > 0 ? 0 : 3)) % 6) + 1}.jpg`} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 left-2 font-mono text-[10px] text-ivory/80">{i + 1}A ▸</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Zoom reveal */}
      <section className="zoom relative h-screen overflow-hidden" aria-label="Showreel">
        <div className="zoom-lead absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-[28vw] font-light italic leading-none text-clay">Moments</span>
        </div>
        <div className="zoom-frame absolute inset-0 z-10">
          <div className="zoom-img absolute inset-0 bg-gradient-to-br from-amber-300 via-rose-600 to-deep">
            <img src="/photos/zoom.jpg" alt="Wedding moment" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-ink/35" />
          <div className="zoom-text absolute inset-0 flex items-center justify-center px-6 text-center text-ivory">
            <h2 className="section-title">Every frame<br />tells a story</h2>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-h" className="relative overflow-hidden px-6 py-32">
        <span data-float="320" aria-hidden="true" className="pointer-events-none absolute left-[-4vw] top-[8%] select-none font-heading text-[24vw] font-light italic leading-none text-ink/[0.05]">Weddings</span>
        <span data-float="-240" aria-hidden="true" className="pointer-events-none absolute bottom-[6%] right-[-6vw] select-none font-heading text-[24vw] font-light italic leading-none text-ink/[0.05]">Portraits</span>
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <div className="story">
            <h2 id="about-h" className="mb-8 text-sm font-light uppercase tracking-[0.3em] text-clay">About the studio</h2>
            <p className="font-heading text-4xl font-light italic leading-tight md:text-5xl">
              {STORY.split(' ').map((w, i) => (<span key={i} className="word mr-[0.25em] inline-block opacity-15">{w}</span>))}
            </p>
            <div className="mt-12 flex gap-10">
              {[['350+', 'Weddings'], ['8 yrs', 'Behind the lens'], ['2k+', 'Stories told']].map(([n, l]) => (
                <div key={l}><p className="font-heading text-4xl italic text-clay">{n}</p><p className="text-xs font-light opacity-60">{l}</p></div>
              ))}
            </div>
          </div>
          <div className="relative h-[80vh]">
            {[
              ['left-0 top-0 h-[55%] w-[55%]', 90, '/photos/about-1.jpg', 'from-amber-300 to-rose-800'],
              ['right-0 top-[15%] h-[48%] w-[42%]', 220, '/photos/about-2.jpg', 'from-sky-300 to-indigo-800'],
              ['bottom-0 left-[20%] h-[40%] w-[50%]', 40, '/photos/about-3.jpg', 'from-emerald-300 to-teal-800'],
            ].map(([c, f, s, g], i) => (
              <div key={i} data-float={f} data-spin={i % 2 ? -7 : 7} className={`absolute ${c}`}>
                <div data-wipe className="relative h-full w-full overflow-hidden rounded-[32px] shadow-2xl shadow-ink/25"><Photo src={s as string} g={g as string} alt="The Crownx Studios photography" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work: pinned horizontal gallery */}
      <section id="work" aria-labelledby="work-h" className="bg-deep text-ivory">
        <div className="hs-pin relative flex h-screen items-center overflow-hidden">
          <div className="absolute inset-x-[8vw] bottom-8 z-10 h-px bg-ivory/20"><div className="hs-bar h-full origin-left bg-clay" /></div>
          <div className="hs-track flex w-max items-center gap-6 px-[8vw]">
            <div className="w-[80vw] shrink-0 md:w-[34vw]">
              <h2 id="work-h" className="section-title !text-[clamp(64px,9vw,140px)]">Selected <span className="text-clay">work</span></h2>
              <p className={sub}>Keep scrolling. Every frame is a story we were lucky to be part of.</p>
            </div>
            {WORK.map((w, i) => (
              <figure key={w.t} data-cursor className={`hs-card relative w-[72vw] shrink-0 overflow-hidden rounded-[32px] md:w-[30vw] ${i % 2 ? 'mt-[14vh] h-[54vh]' : '-mt-[10vh] h-[64vh]'}`}>
                <Photo mode="x" src={w.src} g={w.g} alt={`${w.c} photography: ${w.t}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">{String(i + 1).padStart(2, '0')}A · {w.c}</p>
                  <p className="font-heading text-3xl font-light italic">{w.t}</p>
                  <p className="mt-1 font-mono text-[10px] opacity-60">{EXIF[i]}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Services: stacking cards */}
      <section id="services" aria-labelledby="services-h" className="px-6 py-32">
        <Reveal className="mb-20 text-center">
          <h2 id="services-h" className="section-title"><span className="mask"><span className="mask-in">Services</span></span></h2>
          <p className={`${sub} mx-auto`}>Whatever the occasion, we shoot it like it matters.</p>
        </Reveal>
        <div className="mx-auto max-w-6xl">
          {SERVICES.map(([n, t, d, src, g, bg], i) => (
            <article key={n} style={{ top: `${9 + i * 2}vh` }} className={`stack-card sticky mb-10 grid h-[72vh] overflow-hidden rounded-[40px] shadow-2xl shadow-ink/20 md:grid-cols-2 ${bg}`}>
              <div className="flex flex-col justify-between p-8 md:p-14">
                <span className="text-sm font-light opacity-60">{n} / 05</span>
                <div>
                  <h3 className="font-heading text-5xl font-light italic leading-none md:text-7xl">{t}</h3>
                  <p className="mt-6 max-w-sm text-sm font-light leading-relaxed opacity-80">{d}</p>
                </div>
              </div>
              <div data-wipe className="relative hidden md:block"><Photo src={src} g={g} alt={`${t} photography`} /></div>
            </article>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" aria-labelledby="packages-h" className="px-6 py-32">
        <Reveal className="text-center">
          <h2 id="packages-h" className="section-title"><span className="mask"><span className="mask-in">Packages</span></span></h2>
          <p className={`${sub} mx-auto`}>Starting prices. Every shoot is customised to your story.</p>
        </Reveal>
        <Reveal className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <article key={p.name} className={`rounded-[32px] p-8 ${p.featured ? 'bg-clay text-ivory' : 'border border-ink/15 bg-sand/50'}`}>
              <h3 className="font-heading text-3xl font-light italic">{p.name}</h3>
              <p className="mt-1 text-sm font-light opacity-70">{p.note}</p>
              <p className="mt-6 text-4xl font-light">{p.price}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {p.items.map((i) => (<li key={i} className="flex items-center gap-2"><Check size={16} aria-hidden="true" />{i}</li>))}
              </ul>
              <a href="#contact" className={`mt-8 inline-block rounded px-6 py-3 text-sm font-medium ${p.featured ? 'bg-ivory text-ink' : 'bg-ink text-ivory'}`}>Book {p.name}</a>
            </article>
          ))}
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-h" className="relative overflow-hidden bg-clay px-6 py-40 text-ivory">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 space-y-2">
          {[1, -1].map((d) => (
            <div key={d} className="overflow-hidden"><div data-row={d} className="flex w-max gap-10 whitespace-nowrap font-heading text-[14vw] font-light italic leading-none text-ivory/10">
              {Array.from({ length: 6 }, (_, i) => <span key={i}>Let’s shoot ✦</span>)}
            </div></div>
          ))}
        </div>
        <Reveal className="relative text-center">
          <h2 id="contact-h" className="section-title mt-24">Your story,<br />our lens</h2>
          <p className={`${sub} mx-auto`}>Tell us your date and your idea. We will take care of the rest.</p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a href={WHATSAPP} data-magnet className="inline-block rounded bg-ivory px-6 py-3 text-sm font-medium text-ink">Chat on WhatsApp</a>
            <a href={`mailto:${EMAIL}`} data-magnet className="inline-block rounded border border-ivory/50 px-6 py-3 text-sm font-medium">{EMAIL}</a>
          </div>
        </Reveal>
      </section>

      <footer className="bg-ink text-ivory/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm font-light md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} The Crownx Studios. All rights reserved.</p>
          <nav aria-label="Footer" className="flex gap-5">
            {['About', 'Work', 'Services', 'Packages', 'Contact'].map((l) => (<a key={l} href={`#${l.toLowerCase()}`} className="hover:text-ivory">{l}</a>))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
