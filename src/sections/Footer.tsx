import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer
        id="contact"
        className="relative"
        style={{ background: '#1A1110', zIndex: 20, padding: '80px 5vw 40px' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: 40, paddingBottom: 48 }}
          >
            <div>
              <div className="label-accent" style={{ marginBottom: 12, color: '#D6B46A' }}>
                MAISON HAIR
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: 'rgba(255,248,239,0.5)',
                }}
              >
                Luxury hair for the modern woman.
              </p>
            </div>

            <div>
              <div className="label-accent" style={{ marginBottom: 16, color: '#D6B46A' }}>
                COLLECTION
              </div>
              <ul className="flex flex-col" style={{ gap: 10 }}>
                {['Bone Straight', 'Deep Wave', 'Curly Units', 'Bob Wigs', 'Custom Color'].map((item) => (
                  <li key={item}>
                    <span
                      className="cursor-pointer transition-colors duration-300"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        fontWeight: 300,
                        color: 'rgba(255,248,239,0.6)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#D6B46A'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,248,239,0.6)'; }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="label-accent" style={{ marginBottom: 16, color: '#D6B46A' }}>
                SERVICES
              </div>
              <ul className="flex flex-col" style={{ gap: 10 }}>
                {['Wig Install', 'Wig Revamp', 'Custom Color', 'Lace Customization'].map((item) => (
                  <li key={item}>
                    <span
                      className="cursor-pointer transition-colors duration-300"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        fontWeight: 300,
                        color: 'rgba(255,248,239,0.6)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#D6B46A'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,248,239,0.6)'; }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="label-accent" style={{ marginBottom: 16, color: '#D6B46A' }}>
                CONTACT
              </div>
              <ul className="flex flex-col" style={{ gap: 10 }}>
                <li>
                  <a
                    href="https://wa.me/2348001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 300,
                      color: 'rgba(255,248,239,0.6)',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#D6B46A'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,248,239,0.6)'; }}
                  >
                    WhatsApp: +234 800 123 4567
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/maisonhair"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 300,
                      color: 'rgba(255,248,239,0.6)',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#D6B46A'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,248,239,0.6)'; }}
                  >
                    Instagram: @maisonhair
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@maisonhair.com"
                    className="transition-colors duration-300"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 300,
                      color: 'rgba(255,248,239,0.6)',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#D6B46A'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,248,239,0.6)'; }}
                  >
                    Email: hello@maisonhair.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255,248,239,0.1)',
              paddingTop: 24,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: 'rgba(255,248,239,0.3)',
              }}
            >
              2026 Maison Hair Atelier. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/2348001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed flex items-center justify-center transition-all duration-300"
        style={{
          bottom: 24,
          right: 24,
          zIndex: 40,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#25D366',
          boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,211,102,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.4)';
        }}
      >
        <MessageCircle size={28} color="#FFFFFF" fill="#FFFFFF" />
      </a>
    </>
  );
}
