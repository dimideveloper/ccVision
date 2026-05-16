import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../data/content';
import { Reveal } from './motion/Reveal';
import { Stagger, StaggerDivItem } from './motion/Stagger';
import { Section } from './Section';

export function TestimonialsSection() {
  return (
    <Section tone="muted" className="py-20 md:py-28">
      <div className="mx-auto max-w-[980px] px-5 md:px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Vision Testimonials</p>
          <h2 className="heading-display mx-auto mt-2 max-w-xl text-3xl md:text-5xl">
            Bringing your vision.
            <br />
            To the next level.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerDivItem key={t.name}>
              <motion.article
                className="card flex h-full flex-col p-6"
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}
              >
                <p className="flex-1 text-[15px] leading-relaxed text-[#6e6e73]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-black/5 pt-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d1d1f] text-[10px] font-bold text-white">
                    {t.avatar}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[#1d1d1f]">{t.name}</p>
                    <p className="text-xs text-[#86868b]">{t.subs}</p>
                  </div>
                </div>
              </motion.article>
            </StaggerDivItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
