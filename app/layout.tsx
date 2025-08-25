import './globals.scss';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-poppins', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://dentclinicai.com'),
  title: 'DentClinicAI — AI Booking Agents for Dental Offices',
  description: 'Automate appointments, reduce no-shows, and save hours instantly with AI booking agents built for dental practices.',
  openGraph: {
    type: 'website',
    url: 'https://dentclinicai.com/',
    title: 'DentClinicAI',
    description: 'AI booking agents for dental offices',
    images: [{ url: '/og/home.png' }],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-onyx text-white antialiased">{children}</body>
    </html>
  );
}