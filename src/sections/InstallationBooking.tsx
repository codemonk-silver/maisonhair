import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: 'Wig Installation', desc: 'Full lace-front install with melt and style', price: '$85' },
  { name: 'Wig Revamp', desc: 'Restore, wash, and restyle your existing unit', price: '$65' },
  { name: 'Custom Coloring', desc: 'Balayage, ombre, or full color transformation', price: 'From $120' },
  { name: 'Lace Customization', desc: 'Bleach knots, pluck hairline, cut lace', price: '$45' },
];

export default function InstallationBooking() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', service: '', date: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ib-left',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.ib-form',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const serviceNames: Record<string, string> = {
      install: 'Wig Installation',
      revamp: 'Wig Revamp',
      color: 'Custom Coloring',
      lace: 'Lace Customization',
    };
    const subject = `Booking Request: ${serviceNames[formData.service] || 'Wig Service'}`;
    const body = `Hello Maison Hair Team,%0D%0A%0D%0AI would like to book an appointment for the following service:%0D%0A%0D%0A` +
      `Service: ${serviceNames[formData.service] || 'Not specified'}%0D%0A` +
      `Name: ${formData.name}%0D%0A` +
      `Phone: ${formData.phone}%0D%0A` +
      `Preferred Date: ${formData.date}%0D%0A` +
      `Notes: ${formData.notes || 'None'}%0D%0A%0D%0A` +
      `Please confirm my appointment. Thank you!`;
    window.location.href = `mailto:hello@maisonhair.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section
      id="installation"
      ref={sectionRef}
      className="relative"
      style={{ background: '#E8D8C3', zIndex: 20, padding: '120px 5vw' }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-12"
        style={{ maxWidth: 1200, margin: '0 auto', gap: 48 }}
      >
        <div className="lg:col-span-7 ib-left">
          <div className="label-accent" style={{ marginBottom: 16 }}>OUR SERVICES</div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              color: '#1A1110',
              marginBottom: 24,
            }}
          >
            Professional Installation &amp; Styling
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#5C4A42',
              maxWidth: 440,
              marginBottom: 48,
            }}
          >
            From lace melting to custom coloring, our certified stylists bring your vision to life in our private studio suites.
          </p>

          <div className="flex flex-col" style={{ gap: 24 }}>
            {services.map((service, i) => (
              <div
                key={i}
                className="flex items-start justify-between"
                style={{ paddingBottom: 24, borderBottom: '1px solid rgba(26,17,16,0.1)' }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 18,
                      fontWeight: 500,
                      color: '#1A1110',
                      marginBottom: 4,
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 300,
                      color: '#5C4A42',
                    }}
                  >
                    {service.desc}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: '#D6B46A',
                    whiteSpace: 'nowrap',
                    marginLeft: 16,
                  }}
                >
                  {service.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 ib-form">
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 48,
              boxShadow: '0 8px 40px rgba(26,17,16,0.08)',
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 24,
                fontWeight: 500,
                color: '#1A1110',
                marginBottom: 32,
              }}
            >
              Book Your Appointment
            </h3>
            {submitted ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 0',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: '#D6B46A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1110" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 500, color: '#1A1110' }}>
                  Appointment Requested!
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 300, color: '#5C4A42' }}>
                  We will contact you shortly to confirm.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 20 }}>
                <div>
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#5C4A42',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: '1px solid rgba(26,17,16,0.15)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: '#1A1110',
                      outline: 'none',
                      background: '#FAFAFA',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#5C4A42',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: '1px solid rgba(26,17,16,0.15)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: '#1A1110',
                      outline: 'none',
                      background: '#FAFAFA',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#5C4A42',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Select Service
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: '1px solid rgba(26,17,16,0.15)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: '#1A1110',
                      outline: 'none',
                      background: '#FAFAFA',
                      appearance: 'none',
                    }}
                  >
                    <option value="">Choose a service</option>
                    <option value="install">Wig Installation</option>
                    <option value="revamp">Wig Revamp</option>
                    <option value="color">Custom Coloring</option>
                    <option value="lace">Lace Customization</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#5C4A42',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: '1px solid rgba(26,17,16,0.15)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: '#1A1110',
                      outline: 'none',
                      background: '#FAFAFA',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#5C4A42',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: '1px solid rgba(26,17,16,0.15)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: '#1A1110',
                      outline: 'none',
                      background: '#FAFAFA',
                      resize: 'vertical',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full transition-all duration-300"
                  style={{
                    background: '#D6B46A',
                    color: '#1A1110',
                    borderRadius: 12,
                    padding: 16,
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3B162D';
                    e.currentTarget.style.color = '#FFF8EF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#D6B46A';
                    e.currentTarget.style.color = '#1A1110';
                  }}
                >
                  Book Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
