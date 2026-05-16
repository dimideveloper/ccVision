import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const LOGOS = [
  'Logoipsum', 'Visionary', 'Creative', 'Motion', 'Studio', 'Pulse', 'Flow', 'Spark'
];

export function StatsSection() {
  return (
    <section className="bg-white py-20 overflow-hidden border-y border-black/5">
      <div className="mx-auto max-w-[1100px] px-8 mb-12">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-black/20">
          Trusted by world-class teams
        </p>
      </div>
      
      <div className="relative">
        {/* Optical fade at edges */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <Marquee speed={40} gradient={false}>
          <div className="flex items-center gap-24 pr-24">
            {LOGOS.map((logo, i) => (
              <div key={i} className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center border border-black/5">
                   <div className="w-5 h-5 bg-black/10 rounded-full" />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-black">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
