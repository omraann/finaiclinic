"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web';
import Timeline from '@/components/Timeline';
import Testimonials3D from '@/components/Testimonials3D';
import CalendlyModal from '@/components/CalendlyModal';

gsap.registerPlugin(ScrollTrigger);

const LOGO = 'https://customer-assets.emergentagent.com/job_dental-booking-5/artifacts/euliuisc_ChatGPT%20Image%20Aug%2024%2C%202025%2C%2002_26_08%20AM.png';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const roiLottieRef = useRef<HTMLDivElement>(null);
  const [openCal, setOpenCal] = useState(false);

  useEffect(() => {
    // Lottie: AI agent - Professional AI/healthcare animation
    let animAgent: any;
    if (lottieRef.current) {
      animAgent = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg', loop: true, autoplay: true,
        path: 'https://lottie.host/27e1a1b2-8c25-4c4d-bbf2-6a1d5b7b3e43/VuOjE0nUIY.json'
      });
    }
    // Lottie: ROI financial growth animation
    let animRoi: any;
    if (roiLottieRef.current) {
      animRoi = lottie.loadAnimation({
        container: roiLottieRef.current,
        renderer: 'svg', loop: true, autoplay: true,
        path: 'https://lottie.host/bbc4b2b7-8c25-4c4d-bbf2-6a1d5b7b3e43/RoiKbcnUIY.json'
      });
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo('.hero-h1', { yPercent: 30, filter: 'blur(8px)', opacity: 0.001 }, { yPercent: 0, filter: 'blur(0px)', opacity: 1, duration: 1.2 })
      .fromTo('.hero-h2', { xPercent: -20, opacity: 0.001 }, { xPercent: 0, opacity: 1, duration: 0.9 }, '<0.15')
      .fromTo('.hero-ctas', { yPercent: 20, opacity: 0.001 }, { yPercent: 0, opacity: 1, duration: 0.8 }, '<0.1');

    ScrollTrigger.create({
      trigger: heroRef.current, start: 'top top', end: '+=120%', scrub: 1.2,
      onUpdate: self => { gsap.to('.hero-gradient', { backgroundPosition: `${self.progress*200}% 0%` }); }
    });

    gsap.utils.toArray('.feature-card-anim').forEach((el: any, i) => {
      gsap.fromTo(el, { y: 40, rotateZ: i%2?1.2:-1.2, opacity: 0.001 }, { y: 0, rotateZ: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });

    return () => { animAgent?.destroy(); animRoi?.destroy(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const openCalendly = (e?: React.MouseEvent) => { e?.preventDefault(); setOpenCal(true); };

  const localBusiness = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name: 'DentClinicAI', url: 'https://dentclinicai.com/',
    image: 'https://dentclinicai.com/og/home.png',
    telephone: '+963996905457',
    address: { '@type': 'PostalAddress', addressCountry: 'US' },
    sameAs: ['https://www.instagram.com/dentclinicai?igsh=MXNsNnVrZmpsbXll']
  };
  const service = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'AI Booking Agents for Dental Offices', serviceType: 'Dental appointment booking automation',
    provider: { '@type': 'Organization', name: 'DentClinicAI', url: 'https://dentclinicai.com/' },
    areaServed: ['United Kingdom','United States','United Arab Emirates']
  };
  const howto = {
    '@context': 'https://schema.org', '@type': 'HowTo', name: 'How DentClinicAI works',
    step: [
      { '@type': 'HowToStep', name: 'Connect', text: 'Calendar, forms, telephony' },
      { '@type': 'HowToStep', name: 'AI', text: 'Understands rules and intent' },
      { '@type': 'HowToStep', name: 'Calendar', text: 'Books and reschedules' },
      { '@type': 'HowToStep', name: 'Patient', text: 'Reminders and confirmations' }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howto) }} />
      <CalendlyModal open={openCal} onClose={() => setOpenCal(false)} />
      <main>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
          <div className="container flex items-center justify-between py-5">
            <a href="/" className="flex items-center gap-3"><img src={LOGO} alt="DentClinicAI logo" className="h-7 w-auto" /><span className="sr-only">DentClinicAI</span></a>
            <div className="flex gap-3">
              <a href="#" onClick={openCalendly} className="btn btn-primary">Book Your Demo</a>
              <a href="/roi/" className="btn btn-outline">Try ROI Calculator</a>
            </div>
          </div>
        </header>

        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 hero-gradient" style={{ background: 'linear-gradient(120deg, rgba(0,194,178,0.08), transparent 50%, rgba(0,194,178,0.08))', backgroundSize: '200% 100%' }} />
          <div className="container h-full grid md:grid-cols-2 gap-6 items-center relative">
            <div className="space-y-6">
              <h1 className="hero-h1 font-poppins text-5xl md:text-6xl font-bold text-white leading-tight">
                AI Booking Agents for <span className="text-teal">Dental Offices</span>
              </h1>
              <h2 className="hero-h2 text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
                Automate patient scheduling, eliminate phone tag, and increase revenue by up to 35%. 
                Your AI receptionist never sleeps, never misses a call, and books appointments 24/7.
              </h2>
              <div className="hero-ctas flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#" onClick={openCalendly} className="btn btn-primary text-lg px-8 py-4">
                  Book Your Free Demo
                </a>
                <a href="/roi/" className="btn btn-outline text-lg px-8 py-4">
                  Calculate Your ROI
                </a>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <span className="text-teal">✓</span> 2-week implementation
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal">✓</span> No setup fees
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal">✓</span> 30-day money back
                </div>
              </div>
            </div>
            <div className="relative">
              <div ref={lottieRef} className="w-full h-[420px] md:h-[520px]" aria-label="Animated AI agent" />
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-teal">↓</div>
        </section>

        <section className="bg-white text-black py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-stretch">
              {[
                { 
                  title: '24/7 Intelligent Scheduling', 
                  text: 'AI-powered assistant that handles complex appointment bookings, cancellations, and rescheduling while you sleep. Never miss another booking opportunity.',
                  icon: '🤖'
                },
                { 
                  title: 'Smart Patient Reminders', 
                  text: 'Reduce no-shows by up to 45% with intelligent, personalized reminders sent via SMS, email, and voice calls at optimal times.',
                  icon: '📱'
                },
                { 
                  title: 'Real-Time ROI Analytics', 
                  text: 'Track revenue impact, appointment conversion rates, and cost savings with detailed dashboards and automated reporting.',
                  icon: '📊'
                },
                { 
                  title: 'Seamless PMS Integration', 
                  text: 'Works perfectly with all major Practice Management Systems including Dentrix, Eaglesoft, Open Dental, and 50+ others.',
                  icon: '🔄'
                },
              ].map((f, i) => (
                <div key={i} className="feature-card-anim group w-[min(100%,400px)] p-8 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 will-change-transform hover:-translate-y-2 hover:border-teal">
                  <div className="h-12 w-12 rounded-lg bg-teal/10 text-2xl grid place-items-center mb-6 group-hover:bg-teal/20 transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-teal transition-colors">{f.title}</h3>
                  <p className="text-gray-600 text-[16px] leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-onyx text-white py-24">
          <div className="container">
            <Timeline />
          </div>
        </section>

        <section id="roi" className="bg-white text-black py-24">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-[42px] font-bold leading-tight">
                See Your <span className="text-teal">Revenue Impact</span> in Real Time
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our dental practices see an average ROI of 400% within the first 6 months. 
                Calculate your potential savings based on your current patient volume.
              </p>
              <ROIWidget />
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="text-center p-4 bg-teal/5 rounded-lg">
                  <div className="text-2xl font-bold text-teal">45%</div>
                  <div className="text-sm text-gray-600">Reduction in no-shows</div>
                </div>
                <div className="text-center p-4 bg-teal/5 rounded-lg">
                  <div className="text-2xl font-bold text-teal">35%</div>
                  <div className="text-sm text-gray-600">Increase in bookings</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl p-6 h-[400px] grid place-items-center">
              <div ref={roiLottieRef} className="w-full h-full" aria-label="Animated ROI graphic" />
            </div>
          </div>
        </section>

        <section className="bg-platinum text-black py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What dentists say</h2>
            <Testimonials3D />
          </div>
        </section>

        <section className="bg-white/5 py-16">
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-white/60 text-sm font-medium">TRUSTED BY LEADING DENTAL PRACTICES</p>
            </div>
            <div className="flex items-center justify-center gap-12 flex-wrap opacity-60">
              <img src={LOGO} alt="DentClinicAI" className="h-8 grayscale hover:grayscale-0 transition-all" />
              <div className="h-8 px-6 bg-white/10 rounded-lg flex items-center text-white/50 text-sm font-medium">SmileCare Group</div>
              <div className="h-8 px-6 bg-white/10 rounded-lg flex items-center text-white/50 text-sm font-medium">Premier Dental</div>
              <div className="h-8 px-6 bg-white/10 rounded-lg flex items-center text-white/50 text-sm font-medium">Modern Dentistry</div>
              <div className="h-8 px-6 bg-white/10 rounded-lg flex items-center text-white/50 text-sm font-medium">Elite Dental Care</div>
            </div>
          </div>
        </section>

        <section className="py-32" style={{ background: 'linear-gradient(135deg, #00C2B2, #008080)' }}>
          <div className="container text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join 500+ dental practices already using AI to automate their booking process. 
              Implementation takes just 2 weeks, and you'll see results from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a href="#" onClick={openCalendly} className="btn bg-black text-white hover:bg-white hover:text-black px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300">
                Schedule Your Free Demo
              </a>
              <div className="text-white/70 text-sm">
                ⭐ Rated 4.9/5 by dental professionals
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-black text-white py-16">
          <div className="container grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <a href="/" className="flex items-center gap-3"><img src={LOGO} alt="DentClinicAI logo" className="h-7 w-auto" /></a>
              <p className="opacity-70 mt-2">AI booking for modern dental teams.</p>
            </div>
            <div>
              <div className="font-semibold mb-2">Quick Links</div>
              <ul className="space-y-1 opacity-80">
                <li><a href="/uk/">United Kingdom</a></li>
                <li><a href="/us/">United States</a></li>
                <li><a href="/uae/">United Arab Emirates</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2">Contact</div>
              <ul className="space-y-1 opacity-80">
                <li><a href="mailto:omraanalshibany@gmail.com">omraanalshibany@gmail.com</a></li>
                <li><a href="tel:+963 996 905 457">+963 996 905 457</a></li>
                <li><a href="https://www.instagram.com/dentclinicai?igsh=MXNsNnVrZmpsbXll">Instagram</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

function ROIWidget() {
  const patientsRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const annualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const patients = Number(patientsRef.current?.value || 120);
      const valuePerVisit = 200;
      const noShowReduction = 0.45; // 45% reduction in no-shows
      const bookingIncrease = 0.35; // 35% increase in bookings
      
      const noShowSavings = Math.round(patients * valuePerVisit * noShowReduction);
      const bookingRevenue = Math.round(patients * valuePerVisit * bookingIncrease);
      const totalMonthly = noShowSavings + bookingRevenue;
      const totalAnnual = totalMonthly * 12;
      
      if (outputRef.current && annualRef.current) {
        outputRef.current.textContent = `$${totalMonthly.toLocaleString()}`;
        annualRef.current.textContent = `$${totalAnnual.toLocaleString()}`;
        
        gsap.fromTo(outputRef.current, { scale: 0.98 }, { scale: 1, duration: 0.3, ease: 'power1.out' });
        gsap.fromTo(annualRef.current, { scale: 0.98 }, { scale: 1, duration: 0.3, ease: 'power1.out', delay: 0.1 });
      }
    };
    update();
    patientsRef.current?.addEventListener('input', update);
    return () => patientsRef.current?.removeEventListener('input', update);
  }, []);

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-2xl">
      <div className="space-y-3">
        <label className="text-sm text-gray-600 font-medium">Monthly Patients</label>
        <input 
          ref={patientsRef} 
          type="range" 
          min={50} 
          max={1000} 
          defaultValue={120} 
          className="w-full accent-teal h-2 rounded-lg appearance-none bg-gray-200" 
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>50</span>
          <span>1000</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Monthly Revenue Impact</div>
          <div className="text-3xl font-bold text-teal" ref={outputRef}></div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Annual Revenue Impact</div>
          <div className="text-3xl font-bold text-green-600" ref={annualRef}></div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        * Based on average $200 appointment value, 45% no-show reduction, and 35% booking increase
      </div>
    </div>
  );
}