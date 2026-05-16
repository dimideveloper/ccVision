import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/motion';

const FEATURES = [
  {
    title: 'Intuitive Editor',
    desc: 'The browser editor built for speed. Customize every detail without touching code.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    ),
    bg: 'bg-amber-50',
    color: 'text-amber-600'
  },
  {
    title: 'Dynamic Templates',
    desc: '450+ premium presets ready for your vision. Just drag, drop, and export.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
    ),
    bg: 'bg-orange-50',
    color: 'text-orange-600'
  },
  {
    title: 'Studio Quality',
    desc: 'High-fidelity exports in 4K. Your animations will look perfect on any screen.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
    ),
    bg: 'bg-yellow-50',
    color: 'text-yellow-600'
  }
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-8">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
            The ultimate toolkit for <br className="hidden md:block" /> designers & teams.
          </h2>
          <p className="text-lg text-black/40 font-medium">
            Everything you need to create professional motion content.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {FEATURES.map((f, i) => (
            <motion.div 
              key={i} 
              variants={staggerItem}
              className="group p-10 rounded-[40px] bg-[#fbfbfa] border border-black/5 hover:border-black/10 transition-all hover:shadow-2xl hover:-translate-y-2"
            >
              <div className={`w-14 h-14 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">{f.title}</h3>
              <p className="text-[#86868b] leading-relaxed font-medium">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
