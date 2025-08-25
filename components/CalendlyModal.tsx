"use client";
import { useEffect } from 'react';

type Props = { open: boolean; onClose: () => void; url?: string };

export default function CalendlyModal({ open, onClose, url }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[900px] h-[80vh] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10">
          <div className="font-semibold">Book Your Demo</div>
          <button onClick={onClose} className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20">Close</button>
        </div>
        <iframe
          src={url || 'https://calendly.com/omraanalshibany/new-meeting-1'}
          title="Calendly"
          className="w-full h-[calc(80vh-44px)] bg-white"
          loading="lazy"
        />
      </div>
    </div>
  );
}