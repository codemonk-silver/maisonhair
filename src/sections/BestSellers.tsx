import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: '13x4 Bone Straight Frontal',
    details: 'HD Lace / 18-26 inches',
    price: 'From $285',
    image: '/images/product-bone-straight.jpg',
    orderLink: 'https://wa.me/2348001234567?text=Hi%20Maison%20Hair%2C%20I%27m%20interested%20in%20the%2013x4%20Bone%20Straight%20Frontal%20Wig',
  },
  {
    name: 'Deep Wave Luxury Unit',
    details: '200% Density / 20-28 inches',
    price: 'From $320',
    image: '/images/product-deep-wave.jpg',
    orderLink: 'https://wa.me/2348001234567?text=Hi%20Maison%20Hair%2C%20I%27m%20interested%20in%20the%20Deep%20Wave%20Luxury%20Unit',
  },
  {
    name: 'Chocolate Brown Closure',
    details: '5x5 Lace / 16-24 inches',
    price: 'From $245',
    image: '/images/product-chocolate.jpg',
    orderLink: 'https://wa.me/2348001234567?text=Hi%20Maison%20Hair%2C%20I%27m%20interested%20in%20the%20Chocolate%20Brown%20Closure%20Wig',
  },
  {
    name: 'Blonde Highlight Body Wave',
    details: 'Custom Color / 18-26 inches',
    price: 'From $395',
    image: '/images/hero-card-3.jpg',
    orderLink: 'https://www.instagram.com/maisonhair',
  },
  {
    name: 'Jet Black Bob Wig',
    details: 'Blunt Cut / 10-16 inches',
    price: 'From $195',
    image: '/images/hero-card-5.jpg',
    orderLink: 'https://wa.me/2348001234567?text=Hi%20Maison%20Hair%2C%20I%27m%20interested%20in%20the%20Jet%20Black%20Bob%20Wig',
  },
  {
    name: 'Curly Human Hair Unit',
    details: 'Kinky Curly / 18-26 inches',
    price: 'From $310',
    image: '/images/hero-card-6.jpg',
    orderLink: 'https://wa.me/2348001234567?text=Hi%20Maison%20Hair%2C%20I%27m%20interested%20in%20the%20Curly%20Human%20Hair%20Unit',
  },
];

export default function BestSellers() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bs-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.bs-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="best-sellers"
      ref={sectionRef}
      className="relative"
      style={{ background: '#FFF8EF', zIndex: 20, padding: '120px 5vw' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="label-accent" style={{ marginBottom: 16 }}>BEST SELLERS</div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ marginBottom: 48 }}>
          <h2
            className="bs-heading"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              color: '#1A1110',
            }}
          >
            Crowns Our Clients Love
          </h2>
          <p
            className="bs-heading"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#5C4A42',
              maxWidth: 560,
              marginTop: 16,
            }}
          >
            Hand-selected premium wigs that fly off our shelves. Each piece is crafted from 100% human hair for a natural, flawless finish.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 32 }}>
          {products.map((product, i) => (
            <div
              key={i}
              className="bs-card group cursor-pointer transition-all duration-[400ms]"
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(26,17,16,0.06)',
                overflow: 'hidden',
                padding: '0 0 24px 0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26,17,16,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,17,16,0.06)';
              }}
            >
              <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div style={{ padding: '20px 24px 0' }}>
                <div className="label-accent" style={{ fontSize: 10, marginBottom: 8 }}>
                  HUMAN HAIR WIG
                </div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#1A1110',
                    marginBottom: 4,
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 300,
                    color: '#5C4A42',
                    marginBottom: 12,
                  }}
                >
                  {product.details}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 20,
                      fontWeight: 600,
                      color: '#D6B46A',
                    }}
                  >
                    {product.price}
                  </span>
                  <a
                    href={product.orderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300"
                    style={{
                      background: '#1A1110',
                      color: '#FFF8EF',
                      borderRadius: 20,
                      padding: '8px 20px',
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase' as const,
                      cursor: 'pointer',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#D6B46A';
                      e.currentTarget.style.color = '#1A1110';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#1A1110';
                      e.currentTarget.style.color = '#FFF8EF';
                    }}
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
