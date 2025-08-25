"use client";
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  src: string; // URL to Lottie JSON
  height?: number | string;
  scrubStart?: string;
  scrubEnd?: string;
  ariaLabel?: string;
};

export default function LottieScrub({ src, height = 420, scrubStart = 'top 80%', scrubEnd = 'bottom 20%', ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    const anim = lottie.loadAnimation({ container: ref.current, renderer: 'svg', loop: false, autoplay: false, path: src });
    animRef.current = anim;
    let st: ScrollTrigger | null = null;

    anim.addEventListener('DOMLoaded', () => {
      const total = anim.getDuration(true);
      st = ScrollTrigger.create({
        trigger: ref.current,
        start: scrubStart,
        end: scrubEnd,
        scrub: true,
        onUpdate: self => {
          const frame = Math.floor(self.progress * total);
          anim.goToAndStop(frame, true);
        }
      });
    });

    return () => { st?.kill(); anim.destroy(); };
  }, [src, scrubStart, scrubEnd]);

  return <div ref={ref} style={{ height }} aria-label={ariaLabel} />;
}