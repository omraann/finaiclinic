"use client";
const LOGO = 'https://customer-assets.emergentagent.com/job_dental-booking-5/artifacts/euliuisc_ChatGPT%20Image%20Aug%2024%2C%202025%2C%2002_26_08%20AM.png';
export default function USPage() {
  const service = { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Booking Agents — United States', serviceType: 'Dental appointment booking automation', areaServed: { '@type': 'Country', name: 'United States' }, provider: { '@type': 'Organization', name: 'DentClinicAI', url: 'https://dentclinicai.com/' } };
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
          <h1 className="font-poppins text-4xl md:text-5xl font-bold">AI Booking Agents for US Dental Practices</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Leading dental practices across America trust our AI booking agents to automate appointments, reduce no-shows, and increase revenue by up to 35%.
          </p>
          <div className="flex gap-4">
            <a href="https://calendly.com/omraanalshibany/new-meeting-1" className="btn btn-primary px-8 py-4">Book Your Demo</a>
            <a href="/roi/" className="btn btn-outline px-8 py-4">Calculate ROI</a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 pt-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-3 text-teal">HIPAA Compliant</h3>
            <p className="text-white/70">Full compliance with US healthcare privacy regulations and security standards.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-3 text-teal">All Time Zones</h3>
            <p className="text-white/70">Intelligent scheduling across all US time zones with local number support.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-3 text-teal">US-Based Support</h3>
            <p className="text-white/70">Expert support team located in the US, available during your practice hours.</p>
          </div>
        </div>
      </section>
    </main>
  );
}