import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Shield, Scissors, Clock, Users, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Sparkles, title: '100% Human Hair', desc: 'Cuticle-aligned, tangle-free strands that last 2+ years with proper care.' },
  { icon: Shield, title: 'Tangle-Free Guarantee', desc: 'Our proprietary treatment ensures zero shedding and smooth combing every time.' },
  { icon: Scissors, title: 'Custom Fitting', desc: 'Every unit is tailored to your head measurements for a seamless, natural look.' },
  { icon: Clock, title: 'Same-Day Service', desc: 'Walk in for a consultation and walk out with your new look.' },
  { icon: Users, title: 'Expert Installers', desc: 'Certified stylists with 10+ years of lace-front installation experience.' },
  { icon: Star, title: '5-Star Rated', desc: 'Over 2,000 happy clients across the country trust Maison Hair.' },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wcu-left',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.wcu-item',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative"
      style={{ background: '#1A1110', zIndex: 20, padding: '120px 5vw' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1200, margin: '0 auto', gap: 64 }}>
        <div className="wcu-left">
          <div className="label-accent" style={{ marginBottom: 16 }}>WHY MAISON</div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              color: '#FFF8EF',
              marginBottom: 24,
            }}
          >
            Crafted for the Woman Who Deserves the Best
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255,248,239,0.7)',
              maxWidth: 440,
            }}
          >
            Every wig in our collection undergoes rigorous quality testing. We source only the finest cuticle-aligned human hair, hand-tie each unit, and inspect every strand before it reaches you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 24 }}>
          {features.map((feature, i) => (
            <div key={i} className="wcu-item" style={{ padding: 24 }}>
              <feature.icon size={24} style={{ color: '#D6B46A', marginBottom: 12 }} />
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#FFF8EF',
                  marginBottom: 8,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: 'rgba(255,248,239,0.6)',
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
