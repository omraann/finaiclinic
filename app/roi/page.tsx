"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LottieScrub from '@/components/LottieScrub';

const LOGO = 'https://customer-assets.emergentagent.com/job_dental-booking-5/artifacts/euliuisc_ChatGPT%20Image%20Aug%2024%2C%202025%2C%2002_26_08%20AM.png';

export default function ROIPage() {
  const nPatients = useRef<HTMLInputElement>(null);
  const valueVisit = useRef<HTMLInputElement>(null);
  const noShowRed = useRef<HTMLInputElement>(null);
  const bookingIncrease = useRef<HTMLInputElement>(null);
  const out = useRef<HTMLDivElement>(null);
  const [res, setRes] = useState({ monthly: 0, yearly: 0, noShowSavings: 0, bookingRevenue: 0 });

  useEffect(() => {
    const update = () => {
      const patients = Number(nPatients.current?.value || 150);
      const value = Number(valueVisit.current?.value || 200);
      const noshowPct = Number(noShowRed.current?.value || 45) / 100;
      const bookingPct = Number(bookingIncrease.current?.value || 35) / 100;
      
      const noShowSavings = Math.round(patients * value * noshowPct);
      const bookingRevenue = Math.round(patients * value * bookingPct);
      const monthly = noShowSavings + bookingRevenue;
      const yearly = monthly * 12;
      
      setRes({ monthly, yearly, noShowSavings, bookingRevenue });
      
      if (out.current) {
        out.current.textContent = `$${monthly.toLocaleString()}`;
        gsap.fromTo(out.current, { scale: 0.96 }, { scale: 1, duration: 0.3 });
      }
    };
    update();
    [nPatients.current, valueVisit.current, noShowRed.current, bookingIncrease.current].forEach(el => el?.addEventListener('input', update));
    return () => [nPatients.current, valueVisit.current, noShowRed.current, bookingIncrease.current].forEach(el => el?.removeEventListener('input', update));
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-200 z-10">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO} alt="DentClinicAI logo" className="h-6 w-auto" />
            <span className="font-semibold">DentClinicAI</span>
          </a>
          <a href="https://calendly.com/omraanalshibany/new-meeting-1" className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition">Book Demo</a>
        </div>
      </header>

      <section className="container py-20 grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Interactive ROI Calculator</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              See exactly how much revenue you could be adding to your practice with AI booking automation. 
              Adjust the inputs below to match your practice size and watch the results update in real-time.
            </p>
          </div>
          
          <div className="space-y-6">
            <Slider label="Monthly Patients" min={50} max={1000} def={150} inputRef={nPatients} />
            <Slider label="Average Visit Value ($)" min={100} max={800} def={200} inputRef={valueVisit} />
            <Slider label="No-Show Reduction (%)" min={10} max={60} def={45} inputRef={noShowRed} />
            <Slider label="Booking Increase (%)" min={10} max={50} def={35} inputRef={bookingIncrease} />
          </div>
          
          <div className="space-y-4">
            <div className="p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-teal-50 to-blue-50">
              <div className="text-sm uppercase tracking-wider text-gray-600 mb-2">Total Monthly Revenue Impact</div>
              <div ref={out} className="text-5xl font-bold text-teal mb-2">$0</div>
              <div className="text-lg text-gray-700">Annual Impact: <span className="font-bold text-green-600">${res.yearly.toLocaleString()}</span></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50">
                <div className="text-sm text-gray-600">No-Show Savings</div>
                <div className="text-2xl font-bold text-teal">${res.noShowSavings.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50">
                <div className="text-sm text-gray-600">New Bookings</div>
                <div className="text-2xl font-bold text-green-600">${res.bookingRevenue.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 text-center mt-4">
              * Results based on industry averages and real customer data from 500+ dental practices
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl p-6">
          <LottieScrub src="https://lottie.host/bbc4b2b7-8c25-4c4d-bbf2-6a1d5b7b3e43/RoiKbcnUIY.json" height={400} ariaLabel="Animated financial growth" />
        </div>
      </section>
    </main>
  );
}

function Slider({ label, min, max, def, inputRef }: { label: string; min: number; max: number; def: number; inputRef: any; }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input ref={inputRef} type="range" min={min} max={max} defaultValue={def} className="w-full accent-teal h-2 rounded-lg appearance-none bg-gray-200" />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}