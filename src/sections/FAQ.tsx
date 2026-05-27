import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Is the hair 100% human hair?',
    a: 'Absolutely. Every strand in our collection is ethically sourced, cuticle-aligned human hair. We never use synthetic blends. Each bundle undergoes our proprietary gentle processing to maintain the cuticle direction, ensuring tangle-free longevity of 2+ years with proper care.',
  },
  {
    q: 'Can I choose my wig length and density?',
    a: 'Yes. Our wigs are available in lengths from 10 to 30 inches and densities from 150% to 250%. During checkout, you can select your preferred combination. For custom requests beyond our standard range, contact us via WhatsApp and our team will craft a bespoke unit just for you.',
  },
  {
    q: 'Do you offer professional installation?',
    a: 'We do. Our certified stylists offer full lace-front installation including lace cutting, knot bleaching, hairline plucking, and melt-down. Appointments are available at our flagship studio. Book through the form above or call us directly.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard shipping takes 3-5 business days nationwide. Express delivery (1-2 business days) is available at checkout. Local clients in Lagos can opt for same-day pickup from our studio. International shipping is available to select countries with delivery in 7-10 business days.',
  },
  {
    q: 'Can I pay on delivery or before pickup?',
    a: 'We accept Paystack and bank transfer for all orders. For local pickups, payment is required before collection to secure your unit. For delivery orders, full payment confirms your order and triggers shipping.',
  },
  {
    q: 'Do you revamp old wigs?',
    a: "Yes, our revamp service breathes new life into tired units. We deep-clean, condition, re-curl or re-straighten, replace worn lace, and restyle. Pricing starts at $65 depending on the unit's condition and desired outcome.",
  },
];

function FAQItem({ item }: { item: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="faq-item"
      style={{ borderBottom: '1px solid rgba(26,17,16,0.1)' }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer' }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            color: '#1A1110',
            paddingRight: 16,
          }}
        >
          {item.q}
        </span>
        <ChevronDown
          size={18}
          style={{
            color: '#D6B46A',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#5C4A42',
            paddingBottom: 24,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative"
      style={{ background: '#FFF8EF', zIndex: 20, padding: '120px 5vw' }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="label-accent faq-heading" style={{ marginBottom: 16 }}>FAQ</div>
        <h2
          className="faq-heading"
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
          Questions? We Have Answers.
        </h2>

        <div>
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
