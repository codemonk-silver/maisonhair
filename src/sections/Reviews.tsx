import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    quote: "The lace melted so perfectly, my boyfriend asked if it was my real hair. Three washes in and it still looks brand new. Maison Hair is the only brand I trust now.",
    name: "Aisha M.",
    badge: "Verified Buyer",
  },
  {
    quote: "I drove three hours for my install appointment and I'd do it again in a heartbeat. The studio is gorgeous, the stylist understood exactly what I wanted, and I left feeling like a queen.",
    name: "Tiffany R.",
    badge: "Verified Buyer",
  },
  {
    quote: "I've bought wigs from every major brand. Nothing compares to the quality of Maison's bone straight collection. No tangling, no shedding, just pure luxury.",
    name: "Chiamaka O.",
    badge: "Verified Buyer",
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rv-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.rv-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative"
      style={{ background: '#E8D8C3', zIndex: 20, padding: '120px 5vw' }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="label-accent rv-heading" style={{ marginBottom: 16 }}>TESTIMONIALS</div>
        <h2
          className="rv-heading"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            color: '#1A1110',
            marginBottom: 48,
          }}
        >
          Loved by Thousands
        </h2>

        <div className="flex flex-col" style={{ gap: 32 }}>
          {reviews.map((review, i) => (
            <div
              key={i}
              className="rv-card"
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '40px 48px',
                boxShadow: '0 4px 24px rgba(26,17,16,0.06)',
                maxWidth: 800,
                margin: '0 auto',
                width: '100%',
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 18,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: '#1A1110',
                  marginBottom: 24,
                }}
              >
                "{review.quote}"
              </p>
              <div className="flex items-center" style={{ gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: '#1A1110',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#D6B46A',
                  }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#1A1110',
                    }}
                  >
                    {review.name}
                  </div>
                  <div className="label-accent" style={{ fontSize: 10 }}>
                    {review.badge}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
