export const WHATSAPP = 'https://wa.me/910000000000';
export const EMAIL = 'hello@thecrownxstudios.in';

// Drop jpgs into /public/photos with these names. Gradients show until then.
// scroll = vertical fly speed, sx = sideways scatter, mouse = mouse depth, far = blurred background layer
export const HERO = [
  { src: '/photos/hero-1.jpg', g: 'from-amber-300 to-rose-700', cls: 'left-[3vw] top-[14vh] h-[26vh] w-[30vw] md:h-[34vh] md:w-[17vw]', scroll: -160, sx: -220, mouse: 40, rot: -4, far: false },
  { src: '/photos/hero-2.jpg', g: 'from-sky-300 to-indigo-800', cls: 'right-[4vw] top-[12vh] h-[30vh] w-[32vw] md:h-[42vh] md:w-[16vw]', scroll: -380, sx: 240, mouse: 70, rot: 3, far: false },
  { src: '/photos/hero-3.jpg', g: 'from-emerald-300 to-teal-800', cls: 'left-[8vw] bottom-[12vh] h-[26vh] w-[34vw] md:h-[38vh] md:w-[20vw]', scroll: -260, sx: -260, mouse: 30, rot: 2, far: false },
  { src: '/photos/hero-4.jpg', g: 'from-orange-300 to-red-800', cls: 'right-[7vw] bottom-[14vh] h-[24vh] w-[28vw] md:h-[32vh] md:w-[15vw]', scroll: -100, sx: 200, mouse: 50, rot: -3, far: false },
  { src: '/photos/hero-5.jpg', g: 'from-yellow-200 to-amber-700', cls: 'left-[42vw] top-[5vh] hidden h-[22vh] w-[12vw] md:block', scroll: -520, sx: 0, mouse: 90, rot: 5, far: false },
  { src: '/photos/hero-6.jpg', g: 'from-rose-200 to-fuchsia-800', cls: 'left-[28vw] bottom-[4vh] hidden h-[16vh] w-[9vw] md:block', scroll: -60, sx: -90, mouse: 15, rot: -6, far: true },
  { src: '/photos/hero-7.jpg', g: 'from-cyan-200 to-blue-900', cls: 'right-[27vw] top-[8vh] hidden h-[18vh] w-[10vw] md:block', scroll: -480, sx: 100, mouse: 15, rot: 6, far: true },
];

// mode "y": vertical scroll parallax inside frame. mode "x": shift inside the horizontal gallery.
export function Photo({ src, g, alt, mode = 'y' }: { src: string; g: string; alt: string; mode?: 'x' | 'y' }) {
  const pos = mode === 'y' ? 'absolute inset-x-0 -top-[35%] h-[170%]' : 'absolute inset-y-0 -left-[18%] w-[136%]';
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div {...(mode === 'y' ? { 'data-parallax': '20' } : { 'data-hx': '1' })} className={`${pos} bg-gradient-to-br ${g}`}>
        <img src={src} alt={alt} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
