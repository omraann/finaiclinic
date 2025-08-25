"use client";
const LOGO = 'https://customer-assets.emergentagent.com/job_dental-booking-5/artifacts/euliuisc_ChatGPT%20Image%20Aug%2024%2C%202025%2C%2002_26_08%20AM.png';
export default function UAEPage() {
  const service = { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Booking Agents — United Arab Emirates', serviceType: 'Dental appointment booking automation', areaServed: { '@type': 'Country', name: 'United Arab Emirates' }, provider: { '@type': 'Organization', name: 'DentClinicAI', url: 'https://dentclinicai.com/' } };
  return (
    <main className="min-h-screen bg-onyx text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="container flex items-center justify-between py-5">
          <a href="/" className="flex items-center gap-3"><img src={LOGO} alt="DentClinicAI logo" className="h-7 w-auto" /><span className="sr-only">DentClinicAI</span></a>
          <a href="https://calendly.com/omraanalshibany/new-meeting-1" className="btn btn-primary">Book Demo</a>
        </div>
      </header>
      <section className="container py-20 space-y-12">
        <div className="space-y-6">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold">AI Booking Agents for UAE Dental Practices</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Modernize your dental practice in the UAE with intelligent appointment automation. Perfect for multi-lingual patient communication and Gulf region scheduling.
          </p>
          <div className="flex gap-4">
            <a href="https://calendly.com/omraanalshibany/new-meeting-1" className="btn btn-primary px-8 py-4">Book Your Demo</a>
            <a href="/roi/" className="btn btn-outline px-8 py-4">Calculate ROI</a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 pt-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-3 text-teal">Multi-Language Support</h3>
            <p className="text-white/70">AI agents communicate fluently in Arabic, English, and other regional languages.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-3 text-teal">Gulf Time Zones</h3>
            <p className="text-white/70">Optimized for UAE business hours and cultural appointment preferences.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-3 text-teal">Regional Expertise</h3>
            <p className="text-white/70">Dedicated Middle East support team with local market knowledge.</p>
          </div>
        </div>
      </section>
    </main>
  );
}