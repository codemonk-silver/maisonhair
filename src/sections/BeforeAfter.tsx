import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  {
    label: 'Wig Revamp',
    before: '/images/hero-card-2.jpg',
    after: '/images/hero-card-6.jpg',
  },
  {
    label: 'Full Install',
    before: '/images/hero-card-8.jpg',
    after: '/images/hero-card-1.jpg',
  },
  {
    label: 'Custom Color',
    before: '/images/hero-card-7.jpg',
    after: '/images/hero-card-3.jpg',
  },
];

function ComparisonCard({ before, after, label }: { before: string; after: string; label: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  function handleMove(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  }

  function handleMouseDown() { isDragging.current = true; }
  function handleMouseUp() { isDragging.current = false; }
  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging.current) handleMove(e.clientX);
  }
  function handleTouchMove(e: React.TouchEvent) {
    handleMove(e.touches[0].clientX);
  }

  return (
    <div
      ref={containerRef}
      className="relative cursor-ew-resize select-none"
      style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(26,17,16,0.08)', aspectRatio: '4/3' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After image (full) */}
      <img
        src={after}
        alt={`${label} after`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={before}
          alt={`${label} before`}
          className="absolute top-0 left-0 h-full object-cover"
          style={{ width: `${100 / (sliderPos / 100 || 0.01)}%`, maxWidth: 'none' }}
        />
      </div>
      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: `${sliderPos}%`,
          width: 2,
          background: '#D6B46A',
          transform: 'translateX(-50%)',
        }}
      />
      {/* Slider handle */}
      <div
        className="absolute top-1/2 flex items-center justify-center"
        style={{
          left: `${sliderPos}%`,
          transform: 'translate(-50%, -50%)',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#D6B46A',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 4L2 8L5 12M11 4L14 8L11 12" stroke="#1A1110" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Labels */}
      <div
        className="absolute bottom-4 left-4 px-3 py-1"
        style={{
          background: 'rgba(26,17,16,0.7)',
          borderRadius: 6,
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          color: '#FFF8EF',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Before
      </div>
      <div
        className="absolute bottom-4 right-4 px-3 py-1"
        style={{
          background: 'rgba(214,180,106,0.9)',
          borderRadius: 6,
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          color: '#1A1110',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        After
      </div>
      {/* Card label */}
      <div
        className="absolute top-4 left-4 px-3 py-1"
        style={{
          background: 'rgba(26,17,16,0.7)',
          borderRadius: 6,
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: '#FFF8EF',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ba-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.ba-card',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="transformations"
      ref={sectionRef}
      className="relative"
      style={{ background: '#FFF8EF', zIndex: 20, padding: '120px 5vw' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="label-accent ba-heading" style={{ marginBottom: 16 }}>TRANSFORMATIONS</div>
        <h2
          className="ba-heading"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            color: '#1A1110',
            marginBottom: 12,
          }}
        >
          Real Results, Real Confidence
        </h2>
        <p
          className="ba-heading"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#5C4A42',
            marginBottom: 48,
          }}
        >
          See the Maison difference. Drag to reveal the transformation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>
          {comparisons.map((comp, i) => (
            <div key={i} className="ba-card">
              <ComparisonCard before={comp.before} after={comp.after} label={comp.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
