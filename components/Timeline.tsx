"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const wrap = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!wrap.current || !pathRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      }
    });
    tl.to(path, { strokeDashoffset: 0, ease: 'none' });
    gsap.utils.toArray('.timeline-step').forEach((el: any, i) => {
      tl.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, i * 0.1);
    });
    return () => tl.scrollTrigger?.kill();
  }, []);

  return (
    <div ref={wrap} className="relative">
      <svg className="w-full h-24 md:h-32" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden>
        <path ref={pathRef} d="M0,60 C200,20 300,100 500,60 C700,20 800,100 1000,60" stroke="#00C2B2" strokeWidth="3" fill="none" />
      </svg>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {[
          { t: 'Connect', d: 'Calendar, forms, telephony' },
          { t: 'AI', d: 'Understands rules and intent' },
          { t: 'Calendar', d: 'Books and reschedules' },
          { t: 'Patient', d: 'Reminders and confirmations' },
        ].map((s, i) => (
          <div key={i} className="timeline-step p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="h-10 w-10 rounded-lg bg-teal/10 text-teal grid place-items-center mb-2">{i+1}</div>
            <div className="font-semibold">{s.t}</div>
            <div className="opacity-70 text-sm">{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}