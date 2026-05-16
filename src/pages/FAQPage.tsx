import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FaqAccordion } from '../components/FaqAccordion';
import { GradientButton } from '../components/GradientButton';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/motion/Reveal';
import { Section } from '../components/Section';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '../data/faq';
import { springSoft } from '../lib/motion';

import { usePageTitle } from '../lib/usePageTitle';

export function FAQPage() {
  usePageTitle('Help & FAQ');
  const [category, setCategory] = useState<string>('All');

  const filtered = useMemo(() => {
    if (category === 'All') return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.category === category);
  }, [category]);

  return (
    <main>
      <PageHero
        title="Questions?"
        highlight="Answered."
        description="Everything about the editor, exports, and billing."
      />

      <Section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-2xl px-5 md:px-6">
          <Reveal className="mb-8 flex flex-wrap justify-center gap-2">
            {['All', ...FAQ_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`relative rounded-full px-4 py-2 text-sm ${
                  category === cat ? 'text-white' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {category === cat && (
                  <motion.span
                    layoutId="faq-filter"
                    className="absolute inset-0 rounded-full bg-[#1d1d1f]"
                    transition={springSoft}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <FaqAccordion items={filtered} />
          </Reveal>

          <Reveal delay={0.2} className="card mt-14 p-8 text-center">
            <h2 className="heading-display text-xl text-[#1d1d1f]">Still need help?</h2>
            <p className="mt-2 text-sm text-[#6e6e73]">Try the editor free or sign in.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <GradientButton to="/register">Start free</GradientButton>
              <GradientButton to="/login" variant="ghost">
                Log in
              </GradientButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
