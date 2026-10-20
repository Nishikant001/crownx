import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useScrollFx(root: RefObject<HTMLElement>) {
  useEffect(() => {
    const loader = document.querySelector<HTMLElement>('.loader');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll<HTMLElement>('.word').forEach((w) => (w.style.opacity = '1'));
      if (loader) loader.style.display = 'none';
      return;
    }
    const off: (() => void)[] = [];
    const on = (t: EventTarget, e: string, f: EventListener) => { t.addEventListener(e, f); off.push(() => t.removeEventListener(e, f)); };

    // Inertia scroll
    const lenis = new Lenis({ lerp: 0.075 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    on(document, 'click', (e) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      const id = a?.getAttribute('href');
      if (!id || id.length < 2) return;
      const el = document.querySelector<HTMLElement>(id);
      if (el) { e.preventDefault(); lenis.scrollTo(el); }
    });

    const fine = window.matchMedia('(pointer: fine)').matches;
    if (fine) document.documentElement.classList.add('has-cursor');

    const ctx = gsap.context(() => {
      // ---- Mouse: hero depth + custom cursor ----
      gsap.set('[data-mouse]', { transformPerspective: 900 });
      const mouse = gsap.utils.toArray<HTMLElement>('[data-mouse]').map((el) => ({
        x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }),
        ry: gsap.quickTo(el, 'rotationY', { duration: 1.2, ease: 'power3' }),
        rx: gsap.quickTo(el, 'rotationX', { duration: 1.2, ease: 'power3' }),
        d: Number(el.dataset.mouse) || 20,
      }));
      const cur = document.querySelector<HTMLElement>('.cursor');
      gsap.set(cur, { xPercent: -50, yPercent: -50 });
      const cx = cur ? gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' }) : null;
      const cy = cur ? gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' }) : null;
      const foc = document.querySelector<HTMLElement>('.focus');
      gsap.set(foc, { xPercent: -50, yPercent: -50 });
      const fxq = foc ? gsap.quickTo(foc, 'x', { duration: 0.7, ease: 'power3' }) : null;
      const fyq = foc ? gsap.quickTo(foc, 'y', { duration: 0.7, ease: 'power3' }) : null;
      let lock: gsap.core.Tween | null = null;
      on(window, 'mousemove', (ev) => {
        const e = ev as MouseEvent;
        document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
        document.documentElement.style.setProperty('--my', `${e.clientY}px`);
        const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
        mouse.forEach((m) => { m.x(-nx * m.d * 2); m.y(-ny * m.d * 2); m.ry(nx * 22); m.rx(-ny * 22); });
        if (fine && cur && cx && cy) {
          cx(e.clientX); cy(e.clientY);
          if (foc && fxq && fyq) {
            fxq(e.clientX); fyq(e.clientY); gsap.to(foc, { opacity: 1, duration: 0.3, overwrite: 'auto' });
            lock?.kill();
            lock = gsap.delayedCall(0.25, () => { gsap.fromTo(foc, { scale: 1.45 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' }); });
          }
          const hot = !!(e.target as HTMLElement).closest('[data-cursor]');
          gsap.to(cur, { width: hot ? 96 : 20, height: hot ? 96 : 20, opacity: 1, duration: 0.3, overwrite: 'auto' });
          gsap.to('.cursor-t', { opacity: hot ? 1 : 0, duration: 0.2 });
        }
      });
      // Magnetic buttons
      gsap.utils.toArray<HTMLElement>('[data-magnet]').forEach((el) => {
        on(el, 'mousemove', (ev) => {
          const e = ev as MouseEvent, r = el.getBoundingClientRect();
          gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 });
        });
        on(el, 'mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,.4)' }));
      });

      // ---- Hero scroll: cards scatter outward, letters wave, title splits ----
      const heroST = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
      gsap.utils.toArray<HTMLElement>('[data-scroll]').forEach((el) =>
        gsap.to(el, { y: Number(el.dataset.scroll) * 1.7, x: (Number(el.dataset.sx) || 0) * 1.5, rotate: (Number(el.dataset.sx) || 0) * 0.07, scale: 1.3, ease: 'none', scrollTrigger: heroST }));
      gsap.to('.hero .char-wrap', { y: (i: number) => -((i % 4) + 1) * 70, ease: 'none', scrollTrigger: heroST });
      gsap.to('.hl-1', { xPercent: -30, ease: 'none', scrollTrigger: heroST });
      gsap.to('.hl-2', { xPercent: 30, ease: 'none', scrollTrigger: heroST });
      gsap.to('.hero-meta', { opacity: 0, ease: 'none', scrollTrigger: { ...heroST, start: '10% top', end: '60% top' } });

      // ---- Generic depth helpers ----
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const s = Number(el.dataset.parallax) || 18;
        gsap.fromTo(el, { yPercent: -s }, { yPercent: s, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el) => {
        const s = Number(el.dataset.float) || 80;
        gsap.fromTo(el, { y: s }, { y: -s, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
      });
      gsap.utils.toArray<HTMLElement>('[data-spin]').forEach((el) => {
        const s = Number(el.dataset.spin) || 6;
        gsap.fromTo(el, { rotate: -s }, { rotate: s, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-wipe]').forEach((el) =>
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.4, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
      gsap.utils.toArray<HTMLElement>('.mask-in').forEach((el) =>
        gsap.from(el, { yPercent: 115, duration: 1.3, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 92%' } }));
      gsap.utils.toArray<HTMLElement>('[data-row]').forEach((el) => {
        const dir = Number(el.dataset.row);
        gsap.fromTo(el, { xPercent: dir > 0 ? -35 : 0 }, { xPercent: dir > 0 ? 0 : -35, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      // Camera HUD readouts follow scroll (frame counter, aperture, shutter, ISO) + REC timecode
      const q = (s: string) => document.querySelector<HTMLElement>(s);
      const put = (s: string, v: string) => { const el = q(s); if (el) el.textContent = v; };
      const shutters = [125, 250, 500, 1000, 2000, 4000];
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => {
        const p = self.progress, k = Math.min(5, Math.floor(p * 6));
        put('.hud-frame', String(Math.round(p * 35) + 1).padStart(2, '0'));
        put('.hud-f', (1.4 + p * 14.6).toFixed(1));
        put('.hud-s', String(shutters[k]));
        put('.hud-iso', String(100 * 2 ** k));
      } });
      const t0 = performance.now();
      const tc = () => {
        const s = (performance.now() - t0) / 1000, z = (n: number) => String(Math.floor(n)).padStart(2, '0');
        put('.tc', `${z(s / 60)}:${z(s % 60)}:${z((s % 1) * 24)}`);
      };
      gsap.ticker.add(tc);
      off.push(() => gsap.ticker.remove(tc));

      // Velocity: marquee + gallery cards skew
      ScrollTrigger.create({ onUpdate: (self) => {
        const v = gsap.utils.clamp(-10, 10, self.getVelocity() / -200);
        gsap.fromTo('.skewme', { skewX: v }, { skewX: 0, duration: 0.8, ease: 'power3.out', overwrite: true });
        gsap.fromTo('.hs-card', { skewX: v * 0.5 }, { skewX: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
      } });

      // Pinned zoom reveal
      gsap.timeline({ scrollTrigger: { trigger: '.zoom', start: 'top top', end: '+=160%', pin: true, scrub: true } })
        .fromTo('.zoom-frame', { clipPath: 'inset(24% 36% 24% 36% round 48px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' }, 0)
        .fromTo('.zoom-img', { scale: 1.6 }, { scale: 1, ease: 'none' }, 0)
        .to('.zoom-lead', { scale: 0.85, opacity: 0.3, ease: 'none' }, 0)
        .fromTo('.zoom-text', { opacity: 0, y: 80 }, { opacity: 1, y: 0, ease: 'none' }, 0.55);

      gsap.to('.word', { opacity: 1, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top 80%', end: 'bottom 55%', scrub: true } });

      // Pinned horizontal gallery + progress bar
      const t = document.querySelector<HTMLElement>('.hs-track');
      if (t) {
        const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
        const pinST = { trigger: '.hs-pin', start: 'top top', end: () => `+=${dist()}`, invalidateOnRefresh: true };
        const h = gsap.to(t, { x: () => -dist(), ease: 'none', scrollTrigger: { ...pinST, pin: true, scrub: 1 } });
        gsap.fromTo('.hs-bar', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { ...pinST, scrub: true } });
        gsap.utils.toArray<HTMLElement>('[data-hx]').forEach((el) =>
          gsap.fromTo(el, { xPercent: 8 }, { xPercent: -8, ease: 'none', scrollTrigger: { trigger: el.parentElement, containerAnimation: h, start: 'left right', end: 'right left', scrub: true } }));
      }

      // Stacking service cards (shrink + tilt)
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
      cards.forEach((c, i) => {
        if (i < cards.length - 1)
          gsap.to(c, { scale: 0.88, rotate: i % 2 ? 2 : -2, filter: 'brightness(0.65)', ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top 85%', end: 'top 15%', scrub: true } });
      });

      // ---- Intro: counter -> curtain -> letters rise -> cards pop ----
      lenis.stop();
      window.scrollTo(0, 0);
      const num = { v: 0 };
      gsap.timeline({ onComplete: () => lenis.start() })
        .to(num, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => { const n = document.querySelector('.loader-num'); if (n) n.textContent = String(Math.round(num.v)); } })
        .to('.loader', { yPercent: -100, duration: 1, ease: 'power4.inOut' })
        .set('.loader', { display: 'none' })
        .from('.hero .char', { yPercent: 120, duration: 1.3, ease: 'power4.out', stagger: 0.05 }, '-=0.5')
        .from('[data-scroll]', { scale: 0.5, opacity: 0, duration: 1.3, ease: 'power3.out', stagger: 0.1 }, '<0.1');
    }, root);

    return () => {
      ctx.revert();
      off.forEach((f) => f());
      document.documentElement.classList.remove('has-cursor');
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [root]);
}
