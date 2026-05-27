import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

const navLinks = [
  { label: 'COLLECTION', target: '#best-sellers' },
  { label: 'INSTALLATION', target: '#installation' },
  { label: 'LOOKBOOK', target: '#lookbook' },
  { label: 'REVIEWS', target: '#reviews' },
];

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 100);
      if (y > lastScrollY.current && y > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id: string) {
    setMobileOpen(false);
    lenisRef.current?.scrollTo(id, { duration: 1.2 });
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full flex items-center justify-between px-[5vw] transition-all"
        style={{
          zIndex: 50,
          height: 72,
          background: scrolled ? 'rgba(26, 17, 16, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transform: hidden && !mobileOpen ? 'translateY(-100%)' : 'translateY(0)',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDuration: '400ms',
        }}
      >
        <div className="label-accent" style={{ color: '#D6B46A' }}>
          MAISON HAIR
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.label} onClick={() => scrollTo(link.target)} className="nav-link">
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop Book Now */}
        <button
          onClick={() => scrollTo('#installation')}
          className="hidden md:block text-xs font-medium uppercase transition-all duration-300 hover:scale-105"
          style={{
            background: '#D6B46A',
            color: '#1A1110',
            borderRadius: 24,
            padding: '10px 28px',
          }}
        >
          Book Now
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center"
          style={{ color: '#FFF8EF', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="md:hidden fixed inset-0 transition-opacity duration-300"
        style={{
          zIndex: 60,
          background: 'rgba(26, 17, 16, 0.95)',
          backdropFilter: 'blur(16px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-[5vw]" style={{ height: 72 }}>
          <div className="label-accent" style={{ color: '#D6B46A' }}>
            MAISON HAIR
          </div>
          <button
            style={{ color: '#FFF8EF', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div
          className="flex flex-col items-center justify-center"
          style={{ height: 'calc(100vh - 72px)', gap: 32 }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                color: '#FFF8EF',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#installation')}
            className="transition-all duration-300"
            style={{
              marginTop: 16,
              background: '#D6B46A',
              color: '#1A1110',
              borderRadius: 24,
              padding: '14px 40px',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
