"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web';
import Timeline from '@/components/Timeline';
import Testimonials3D from '@/components/Testimonials3D';
import FilloutModal from '@/components/FilloutModal';

gsap.registerPlugin(ScrollTrigger);

const LOGO = 'https://customer-assets.emergentagent.com/job_dental-booking-5/artifacts/euliuisc_ChatGPT%20Image%20Aug%2024%2C%202025%2C%2002_26_08%20AM.png';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const roiLottieRef = useRef<HTMLDivElement>(null);
  const [openForm, setOpenForm] = useState(false);

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

    // Enhanced Hero Animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero-h1', { 
      yPercent: 40, 
      filter: 'blur(12px)', 
      opacity: 0,
      scale: 0.95 
    }, { 
      yPercent: 0, 
      filter: 'blur(0px)', 
      opacity: 1,
      scale: 1, 
      duration: 1.4 
    })
    .fromTo('.hero-h2', { 
      xPercent: -30, 
      opacity: 0,
      filter: 'blur(8px)'
    }, { 
      xPercent: 0, 
      opacity: 1,
      filter: 'blur(0px)', 
      duration: 1.1 
    }, '<0.2')
    .fromTo('.hero-ctas', { 
      yPercent: 30, 
      opacity: 0,
      scale: 0.9
    }, { 
      yPercent: 0, 
      opacity: 1,
      scale: 1, 
      duration: 1.0 
    }, '<0.15')
    .fromTo('.hero-features', { 
      opacity: 0,
      y: 20
    }, { 
      opacity: 1,
      y: 0, 
      duration: 0.8,
      stagger: 0.1
    }, '<0.3');

    // Enhanced Scroll Trigger for Hero
    ScrollTrigger.create({
      trigger: heroRef.current, 
      start: 'top top', 
      end: '+=150%', 
      scrub: 1.5,
      onUpdate: self => { 
        const progress = self.progress;
        gsap.to('.hero-gradient-enhanced', { 
          backgroundPosition: `${progress * 400}% ${progress * 200}%`,
          opacity: 1 - progress * 0.3
        });
        gsap.to('.hero-lottie', {
          scale: 1 + progress * 0.1,
          rotateY: progress * 10
        });
      }
    });

    // Enhanced Feature Cards Animation
    gsap.utils.toArray('.feature-card-anim').forEach((el: any, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      tl.fromTo(el, { 
        y: 60, 
        rotateX: 15,
        opacity: 0,
        scale: 0.95
      }, { 
        y: 0, 
        rotateX: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8, 
        ease: 'power3.out',
        delay: i * 0.1
      });
    });

    // Stats Cards Animation
    gsap.utils.toArray('.stats-card').forEach((el: any, i) => {
      gsap.fromTo(el, {
        scale: 0.8,
        opacity: 0,
        y: 30
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        },
        delay: i * 0.1
      });
    });

    return () => { 
      animAgent?.destroy(); 
      animRoi?.destroy(); 
      ScrollTrigger.getAll().forEach(t => t.kill()); 
    };
  }, []);

  const openDemoForm = (e?: React.MouseEvent) => { e?.preventDefault(); setOpenForm(true); };

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
      <FilloutModal open={openForm} onClose={() => setOpenForm(false)} />
      <main>
        {/* Enhanced Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/10">
          <div className="container flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-3 group">
              <img src={LOGO} alt="DentClinicAI logo" className="h-8 w-auto group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-lg gradient-text">DentClinicAI</span>
            </a>
            <div className="flex gap-4">
              <button onClick={openDemoForm} className="btn btn-primary">
                🚀 Get Demo
              </button>
              <a href="/roi/" className="btn btn-outline">
                📊 ROI Calculator
              </a>
            </div>
          </div>
        </header>

        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center">
          <div className="absolute inset-0 hero-gradient-enhanced" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="container grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
            <div className="space-y-8">
              <h1 className="hero-h1 hero-title font-poppins text-5xl lg:text-7xl font-bold leading-tight">
                AI Booking Agents for <span className="gradient-text">Dental Offices</span>
              </h1>
              <h2 className="hero-h2 text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                Automate patient scheduling, eliminate phone tag, and increase revenue by up to 
                <span className="gradient-text font-bold"> 35%</span>. 
                Your AI receptionist never sleeps, never misses a call, and books appointments 24/7.
              </h2>
              
              <div className="hero-ctas flex flex-col sm:flex-row gap-4 pt-6">
                <button onClick={openDemoForm} className="btn btn-primary text-lg">
                  🚀 Get Your Free Demo
                </button>
                <a href="/roi/" className="btn btn-outline text-lg">
                  📊 Calculate ROI
                </a>
              </div>
              
              <div className="hero-features grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="flex items-center gap-3 glass-card p-4">
                  <span className="text-teal text-2xl">⚡</span>
                  <div>
                    <div className="font-semibold text-white">2-Week Setup</div>
                    <div className="text-white/60 text-sm">Quick implementation</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 glass-card p-4">
                  <span className="text-teal text-2xl">💰</span>
                  <div>
                    <div className="font-semibold text-white">No Setup Fees</div>
                    <div className="text-white/60 text-sm">Start saving immediately</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 glass-card p-4">
                  <span className="text-teal text-2xl">🛡️</span>
                  <div>
                    <div className="font-semibold text-white">30-Day Guarantee</div>
                    <div className="text-white/60 text-sm">Risk-free trial</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="hero-lottie floating">
                <div ref={lottieRef} className="w-full h-[500px] lg:h-[600px]" aria-label="Animated AI agent" />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-teal rounded-full flex justify-center">
              <div className="w-1 h-3 bg-teal rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Why <span className="gradient-text">500+ Practices</span> Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Revolutionary AI technology that transforms your practice operations and patient experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                { 
                  title: '24/7 Intelligent Scheduling', 
                  text: 'AI-powered assistant that handles complex appointment bookings, cancellations, and rescheduling while you sleep. Never miss another booking opportunity with intelligent conflict resolution.',
                  icon: '🤖',
                  color: 'from-blue-500 to-cyan-500'
                },
                { 
                  title: 'Smart Patient Reminders', 
                  text: 'Reduce no-shows by up to 45% with intelligent, personalized reminders sent via SMS, email, and voice calls at optimal times based on patient behavior patterns.',
                  icon: '📱',
                  color: 'from-green-500 to-emerald-500'
                },
                { 
                  title: 'Real-Time ROI Analytics', 
                  text: 'Track revenue impact, appointment conversion rates, and cost savings with detailed dashboards, automated reporting, and predictive insights for practice growth.',
                  icon: '📊',
                  color: 'from-purple-500 to-pink-500'
                },
                { 
                  title: 'Seamless PMS Integration', 
                  text: 'Works perfectly with all major Practice Management Systems including Dentrix, Eaglesoft, Open Dental, and 50+ others with one-click setup and real-time sync.',
                  icon: '🔄',
                  color: 'from-orange-500 to-red-500'
                },
              ].map((f, i) => (
                <div key={i} className="feature-card-anim feature-card group">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${f.color} text-3xl grid place-items-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-teal transition-colors">{f.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-onyx text-white py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Simple 4-step process to transform your practice
              </p>
            </div>
            <Timeline />
          </div>
        </section>

        {/* Enhanced ROI Section */}
        <section id="roi" className="py-24 bg-gradient-to-br from-white to-gray-50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  See Your <span className="gradient-text">Revenue Impact</span> in Real Time
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our dental practices see an average ROI of <span className="font-bold text-teal">400%</span> within the first 6 months. 
                  Calculate your potential savings based on your current patient volume.
                </p>
                <ROIWidget />
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="stats-card text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">45%</div>
                    <div className="text-gray-600 font-medium">Reduction in no-shows</div>
                  </div>
                  <div className="stats-card text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">35%</div>
                    <div className="text-gray-600 font-medium">Increase in bookings</div>
                  </div>
                </div>
                
                <button onClick={openDemoForm} className="btn btn-primary text-lg w-full sm:w-auto">
                  🚀 Start Free Trial
                </button>
              </div>
              
              <div className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-xl p-8 shadow-2xl">
                <div ref={roiLottieRef} className="w-full h-[400px]" aria-label="Animated ROI graphic" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-50 py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                What <span className="gradient-text">Dentists</span> Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real results from real practices using our AI booking system
              </p>
            </div>
            <Testimonials3D />
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="social-proof py-16">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-white/60 text-sm font-medium uppercase tracking-wider">
                Trusted by Leading Dental Practices
              </p>
            </div>
            <div className="flex items-center justify-center gap-12 flex-wrap opacity-60">
              <img src={LOGO} alt="DentClinicAI" className="h-10 grayscale hover:grayscale-0 transition-all duration-300" />
              <div className="h-10 px-8 glass-card flex items-center text-white/50 font-medium">SmileCare Group</div>
              <div className="h-10 px-8 glass-card flex items-center text-white/50 font-medium">Premier Dental</div>
              <div className="h-10 px-8 glass-card flex items-center text-white/50 font-medium">Modern Dentistry</div>
              <div className="h-10 px-8 glass-card flex items-center text-white/50 font-medium">Elite Dental Care</div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="cta-gradient py-32 relative">
          <div className="container text-center space-y-8 relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join <span className="font-bold">500+ dental practices</span> already using AI to automate their booking process. 
              Implementation takes just <span className="font-bold">2 weeks</span>, and you'll see results from day one.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button onClick={openDemoForm} className="btn bg-white text-black hover:bg-gray-100 hover:scale-105 px-12 py-5 text-xl font-bold shadow-2xl">
                🚀 Get Your Free Demo Now
              </button>
              <div className="text-white/80 text-lg font-medium">
                ⭐ Rated 4.9/5 by 500+ dental professionals
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-12">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-white font-semibold">2-Week Setup</div>
                <div className="text-white/70 text-sm">Fast implementation</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-white font-semibold">400% ROI</div>
                <div className="text-white/70 text-sm">Average return</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <div className="text-white font-semibold">Risk-Free</div>
                <div className="text-white/70 text-sm">30-day guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-black text-white py-20">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="space-y-6">
                <a href="/" className="flex items-center gap-3">
                  <img src={LOGO} alt="DentClinicAI logo" className="h-8 w-auto" />
                  <span className="gradient-text font-bold text-xl">DentClinicAI</span>
                </a>
                <p className="text-white/70 leading-relaxed">
                  AI booking automation for modern dental practices. Increase revenue, reduce no-shows, and delight patients.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/dentclinicai?igsh=MXNsNnVrZmpsbXll" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal transition-colors">
                    📷
                  </a>
                </div>
              </div>
              
              <div>
                <div className="font-bold text-lg mb-4 gradient-text">Quick Links</div>
                <ul className="space-y-3 text-white/80">
                  <li><a href="/uk/" className="hover:text-teal transition-colors">🇬🇧 United Kingdom</a></li>
                  <li><a href="/us/" className="hover:text-teal transition-colors">🇺🇸 United States</a></li>
                  <li><a href="/uae/" className="hover:text-teal transition-colors">🇦🇪 United Arab Emirates</a></li>
                  <li><a href="/roi/" className="hover:text-teal transition-colors">📊 ROI Calculator</a></li>
                </ul>
              </div>
              
              <div>
                <div className="font-bold text-lg mb-4 gradient-text">Contact</div>
                <ul className="space-y-3 text-white/80">
                  <li><a href="mailto:omraanalshibany@gmail.com" className="hover:text-teal transition-colors">📧 Email Support</a></li>
                  <li><a href="tel:+963996905457" className="hover:text-teal transition-colors">📞 +963 996 905 457</a></li>
                </ul>
              </div>
              
              <div>
                <div className="font-bold text-lg mb-4 gradient-text">Get Started</div>
                <div className="space-y-4">
                  <button onClick={openDemoForm} className="btn btn-primary w-full">
                    🚀 Book Demo
                  </button>
                  <a href="/roi/" className="btn btn-outline w-full">
                    📊 Calculate ROI
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 text-center text-white/60">
              <p>&copy; 2024 DentClinicAI. All rights reserved. Built with ❤️ for dental professionals worldwide.</p>
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
        
        gsap.fromTo(outputRef.current, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.fromTo(annualRef.current, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)', delay: 0.1 });
      }
    };
    update();
    
    const currentPatientsRef = patientsRef.current;
    currentPatientsRef?.addEventListener('input', update);
    return () => currentPatientsRef?.removeEventListener('input', update);
  }, []);

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 shadow-xl">
      <div className="space-y-4">
        <label className="text-lg text-gray-700 font-bold">Monthly Patients</label>
        <input 
          ref={patientsRef} 
          type="range" 
          min={50} 
          max={1000} 
          defaultValue={120} 
          className="w-full accent-teal h-3 rounded-lg appearance-none bg-gray-200 cursor-pointer" 
        />
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <span>50 patients</span>
          <span>1000 patients</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center p-6 bg-gradient-to-br from-teal/10 to-teal/5 rounded-2xl">
          <div className="text-sm font-medium text-gray-600 mb-2">Monthly Revenue Impact</div>
          <div className="text-4xl font-bold gradient-text" ref={outputRef}>$0</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl">
          <div className="text-sm font-medium text-gray-600 mb-2">Annual Revenue Impact</div>
          <div className="text-4xl font-bold text-green-600" ref={annualRef}>$0</div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 text-center bg-gray-50 p-4 rounded-xl">
        * Based on average $200 appointment value, 45% no-show reduction, and 35% booking increase from real customer data
      </div>
    </div>
  );
}