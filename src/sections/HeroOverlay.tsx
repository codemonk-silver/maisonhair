import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroOverlayProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function HeroOverlay({ lenisRef }: HeroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      overlayRef.current.querySelector('.hero-label'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        overlayRef.current.querySelector('.hero-heading-line1'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        overlayRef.current.querySelector('.hero-heading-line2'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(
        overlayRef.current.querySelector('.hero-subheading'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        overlayRef.current.querySelector('.hero-cta'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 5vw 8vh 5vw',
          background: 'linear-gradient(to top, rgba(26,17,16,0.6) 0%, transparent 60%)',
        }}
      >
        <div className="label-accent hero-label" style={{ opacity: 0, marginBottom: 16 }}>
          LUXURY HAIR ATELIER
        </div>
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#FFF8EF',
            textShadow: '0 2px 40px rgba(0,0,0,0.3)',
            margin: 0,
          }}
        >
          <span className="hero-heading-line1 block" style={{ opacity: 0 }}>
            Where Every Strand
          </span>
          <span className="hero-heading-line2 block" style={{ opacity: 0 }}>
            Tells a Story
          </span>
        </h1>
        <p
          className="hero-subheading"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'rgba(255,248,239,0.8)',
            maxWidth: 480,
            marginTop: 20,
            opacity: 0,
          }}
        >
          Premium human hair wigs and expert installation for the woman who knows her worth.
        </p>
        <button
          className="hero-cta pointer-events-auto transition-all duration-300 mt-8"
          style={{
            opacity: 0,
            border: '1px solid rgba(255,248,239,0.4)',
            background: 'transparent',
            color: '#FFF8EF',
            borderRadius: 24,
            padding: '14px 36px',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#D6B46A';
            e.currentTarget.style.color = '#1A1110';
            e.currentTarget.style.borderColor = '#D6B46A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#FFF8EF';
            e.currentTarget.style.borderColor = 'rgba(255,248,239,0.4)';
          }}
          onClick={() => lenisRef.current?.scrollTo('#best-sellers', { duration: 1.2 })}
        >
          Explore Collection
        </button>
      </div>
    </div>
  );
}
