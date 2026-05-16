import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { springSoft } from '../lib/motion';
import { GradientButton } from './GradientButton';
import { Reveal } from './motion/Reveal';
import { Section } from './Section';

const PREVIEWS = [
  { name: 'Light', className: 'bg-[#f5f5f7]' },
  { name: 'Dark', className: 'bg-[#1d1d1f]' },
  { name: 'Minimal', className: 'bg-white border border-black/10' },
  { name: 'Bold', className: 'bg-[#0071e3]' },
];

export function ThemesSection() {
  const [tab, setTab] = useState<'themes' | 'presets'>('themes');

  return (
    <Section tone="dark" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-[980px] gap-12 px-5 md:grid-cols-2 md:items-center md:px-6">
        <Reveal>
          <motion.div
            className="inline-flex rounded-full bg-gray-100/80 p-1"
            layout
          >
            {(['themes', 'presets'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`relative rounded-full px-4 py-1.5 text-sm capitalize ${
                  tab === key ? 'text-[#1d1d1f]' : 'text-[#86868b]'
                }`}
              >
                {tab === key && (
                  <motion.span
                    layoutId="theme-tab"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={springSoft}
                  />
                )}
                <span className="relative z-10">{key}</span>
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <h2 className="heading-display mt-8 text-3xl capitalize md:text-4xl">
                {tab}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-[#6e6e73]">
                Personalize your workspace — colors, layout, and mood that match your creative
                flow.
              </p>
            </motion.div>
          </AnimatePresence>

          <GradientButton to="/register" variant="primary" className="mt-8">
            Customize now
          </GradientButton>
        </Reveal>

        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {PREVIEWS.map((p, i) => (
            <motion.div
              key={p.name}
              className={`flex aspect-[4/3] items-end rounded-2xl p-4 ${p.className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <span
                className={`text-xs font-medium ${
                  p.name === 'Bold' || p.name === 'Dark' ? 'text-white/80' : 'text-[#1d1d1f]/80'
                }`}
              >
                {p.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
