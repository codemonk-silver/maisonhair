import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    function onMouseMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseOver(e: MouseEvent) {
      const el = e.target as HTMLElement;
      const isInteractive =
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.closest('button') ||
        el.closest('a') ||
        el.classList.contains('cursor-pointer');

      if (isInteractive && cursorRef.current) {
        cursorRef.current.classList.add('hover');
      }
    }

    function onMouseOut() {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('hover');
      }
    }

    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return <div ref={cursorRef} className="custom-cursor" />;
}
