import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const looks = [
  { name: 'Soft Glam Waves', image: '/images/hero-card-3.jpg', span: 'col-span-2 row-span-2' },
  { name: 'Boss Lady Bob', image: '/images/hero-card-5.jpg', span: 'col-span-1 row-span-1' },
  { name: 'Bridal Elegance', image: '/images/hero-card-1.jpg', span: 'col-span-1 row-span-1' },
  { name: 'Birthday Bounce', image: '/images/hero-card-9.jpg', span: 'col-span-2 row-span-2' },
  { name: 'Vacation Curls', image: '/images/hero-card-6.jpg', span: 'col-span-1 row-span-1' },
  { name: 'Everyday Sleek', image: '/images/hero-card-4.jpg', span: 'col-span-1 row-span-1' },
];

export default function Lookbook() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.lb-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
      gsap.fromTo(
        '.lb-item',
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="relative"
      style={{ background: '#1A1110', zIndex: 20, padding: '120px 5vw' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="label-accent lb-heading" style={{ marginBottom: 16, color: '#D6B46A' }}>LOOKBOOK</div>
        <h2
          className="lb-heading"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            color: '#FFF8EF',
            marginBottom: 48,
          }}
        >
          Find Your Signature Look
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 16 }}>
          {looks.map((look, i) => (
            <div
              key={i}
              className={`lb-item relative overflow-hidden group ${look.span}`}
              style={{ borderRadius: 12, minHeight: look.span.includes('row-span-2') ? 400 : 190 }}
            >
              <img
                src={look.image}
                alt={look.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ position: 'absolute', inset: 0 }}
              />
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  padding: '40px 16px 16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#FFF8EF',
                    textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                  }}
                >
                  {look.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
