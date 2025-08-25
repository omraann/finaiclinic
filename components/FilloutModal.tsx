"use client";
import { useEffect } from 'react';

type Props = { open: boolean; onClose: () => void; url?: string };

export default function FilloutModal({ open, onClose, url }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[1000px] h-[85vh] rounded-3xl overflow-hidden border border-teal/20 bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal to-teal/80 text-white">
          <div className="font-bold text-lg">🚀 Get Your AI Booking Demo</div>
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 font-medium"
          >
            ✕ Close
          </button>
        </div>
        <iframe
          src={url || 'https://forms.fillout.com/t/wNTePVM9DPus'}
          title="AI Booking Demo Form"
          className="w-full h-[calc(85vh-64px)] bg-white"
          loading="lazy"
        />
      </div>
    </div>
  );
}