"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "DentClinicAI completely transformed our scheduling. We went from chaos to complete automation in just two weeks.",
    author: "Dr. Sarah Mitchell",
    title: "Pacific Dental Group",
    rating: 5
  },
  {
    text: "Our no-show rate dropped by 40% in the first month. The AI assistant is like having a dedicated receptionist 24/7.",
    author: "Dr. Michael Chen",
    title: "SmileWorks Dentistry",
    rating: 5
  },
  {
    text: "The ROI was immediate. We're booking more appointments than ever before while spending less time on administrative tasks.",
    author: "Dr. Jennifer Rodriguez",
    title: "Elite Dental Care",
    rating: 5
  },
  {
    text: "Patients love the convenience of booking anytime. Our Google reviews improved significantly since implementation.",
    author: "Dr. James Thompson",
    title: "Modern Family Dental",
    rating: 5
  },
  {
    text: "Finally, a system that actually understands dental scheduling complexities. Worth every penny.",
    author: "Dr. Lisa Wang",
    title: "Premier Orthodontics",
    rating: 5
  },
  {
    text: "Our staff can now focus on patient care instead of answering booking calls all day. Game changer!",
    author: "Dr. Robert Miller",
    title: "Cornerstone Dental",
    rating: 5
  },
  {
    text: "The intelligent reminders feature alone has saved us thousands in lost revenue from missed appointments.",
    author: "Dr. Amanda Foster",
    title: "Bright Smile Clinic",
    rating: 5
  }
];

export default function Testimonials3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const width = mount.clientWidth;
    const height = 360;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6); 
    dir.position.set(2,2,3); 
    scene.add(dir);

    // cards
    const group = new THREE.Group(); 
    scene.add(group);
    const cardGeo = new THREE.PlaneGeometry(2.4, 1.4, 4, 4);
    const baseColors = [0x14181f, 0x171b23, 0x1a1f27, 0x1d2229, 0x20252c];

    const makeCard = (i: number) => {
      const mat = new THREE.MeshBasicMaterial({ 
        color: baseColors[i % baseColors.length], 
        transparent: true 
      });
      const mesh = new THREE.Mesh(cardGeo, mat);
      mesh.position.set((i-3)*2.7, 0, -Math.abs(i-3)*0.5);
      mesh.scale.set(1 - Math.abs(i-3)*0.04, 1 - Math.abs(i-3)*0.04, 1);
      mesh.userData = { testimonialIndex: i };
      return mesh;
    };

    for (let i=0; i<testimonials.length; i++) group.add(makeCard(i));

    // text display logic
    let currentIndex = 0;
    const updateText = () => {
      if (textRef.current) {
        const testimonial = testimonials[currentIndex];
        textRef.current.innerHTML = `
          <div class="space-y-4">
            <div class="flex items-center gap-1 text-teal">
              ${'★'.repeat(testimonial.rating)}
            </div>
            <blockquote class="text-lg md:text-xl text-white leading-relaxed">
              "${testimonial.text}"
            </blockquote>
            <div class="text-white/60">
              <div class="font-semibold">${testimonial.author}</div>
              <div class="text-sm">${testimonial.title}</div>
            </div>
          </div>
        `;
      }
    };
    updateText();

    // mouse parallax
    const onMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.2;
      const y = (e.clientY / window.innerHeight - 0.5) * -0.1;
      gsap.to(group.rotation, { y: x, x: y, duration: 0.6, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMouse);

    // GSAP + ScrollTrigger scrub to move the strip
    const st = ScrollTrigger.create({
      trigger: mount,
      start: 'top 80%', 
      end: 'bottom 20%', 
      scrub: 1,
      onUpdate: self => {
        const p = self.progress;
        group.position.x = gsap.utils.mapRange(0,1,-2,2,p);
        // Update testimonial text based on progress
        const newIndex = Math.floor(p * (testimonials.length - 1));
        if (newIndex !== currentIndex) {
          currentIndex = newIndex;
          updateText();
        }
      }
    });

    let raf = 0; 
    const animate = () => { 
      group.children.forEach((obj) => {
        const c = obj as THREE.Mesh;
        c.position.x += 0.008; 
        if (c.position.x > 7) c.position.x = -7;
        const depth = Math.abs(c.position.x) / 8; 
        (c.material as THREE.MeshBasicMaterial).opacity = 0.5 + 0.5*(1-depth); 
        c.position.z = -depth*1.5;
      });
      renderer.render(scene, camera); 
      raf = requestAnimationFrame(animate); 
    };
    animate();

    const onResize = () => { 
      const w=mount.clientWidth; 
      const h=360; 
      renderer.setSize(w,h); 
      camera.aspect=w/h; 
      camera.updateProjectionMatrix(); 
    };
    const ro = new ResizeObserver(onResize); 
    ro.observe(mount);

    return () => { 
      window.removeEventListener('mousemove', onMouse); 
      st.kill(); 
      ro.disconnect(); 
      cancelAnimationFrame(raf); 
      renderer.dispose(); 
      mount.innerHTML=''; 
    };
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div 
        className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl" 
        ref={mountRef} 
      />
      <div ref={textRef} className="space-y-4">
        {/* Content populated by JavaScript */}
      </div>
    </div>
  );
}