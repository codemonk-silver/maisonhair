import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import HeroScene from './sections/HeroScene';
import HeroOverlay from './sections/HeroOverlay';
import BestSellers from './sections/BestSellers';
import WhyChooseUs from './sections/WhyChooseUs';
import InstallationBooking from './sections/InstallationBooking';
import BeforeAfter from './sections/BeforeAfter';
import Lookbook from './sections/Lookbook';
import Reviews from './sections/Reviews';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import ProgressBar from './components/ProgressBar';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const heroSpacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Progress bar
    const progressBar = document.getElementById('progress-bar');
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }
    });

    // Hero canvas fade on scroll past
    if (heroSpacerRef.current) {
      gsap.to('.hero-canvas-container', {
        opacity: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: heroSpacerRef.current,
          start: '85% top',
          end: '100% top',
          scrub: true,
        },
      });

      // Also fade the overlay
      gsap.to('.hero-overlay-container', {
        opacity: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: heroSpacerRef.current,
          start: '70% top',
          end: '90% top',
          scrub: true,
        },
      });
    }

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div>
      <CustomCursor />
      <ProgressBar />
      <Navigation lenisRef={lenisRef as React.MutableRefObject<any>} />

      {/* Fixed hero canvas */}
      <div
        className="hero-canvas-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          maxWidth: '100vw',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Ambient video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.15,
          }}
        >
          <source src="/videos/hero-ambient.mp4" type="video/mp4" />
        </video>
        <HeroScene heroSpacerRef={heroSpacerRef as React.RefObject<HTMLDivElement>} />
      </div>

      {/* Fixed hero text overlay */}
      <div
        className="hero-overlay-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          maxWidth: '100vw',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <HeroOverlay lenisRef={lenisRef as React.MutableRefObject<any>} />
      </div>

      {/* Tall hero spacer to create scroll distance for the 3D effect */}
      <div ref={heroSpacerRef} style={{ height: '300vh', position: 'relative', zIndex: 0 }} />

      {/* Content sections */}
      <div className="relative" style={{ zIndex: 20 }}>
        <BestSellers />
        <WhyChooseUs />
        <InstallationBooking />
        <BeforeAfter />
        <Lookbook />
        <Reviews />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}

export default App;