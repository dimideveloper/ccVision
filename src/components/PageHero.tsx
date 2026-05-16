import { motion } from 'framer-motion';
import { appleEase } from '../lib/motion';

type Props = {
  title: string;
  highlight?: string;
  description?: string;
};

export function PageHero({ title, highlight, description }: Props) {
  return (
    <section className="hero-mesh border-b border-black/5 pt-11">
      <div className="mx-auto max-w-[980px] px-5 pb-14 pt-16 text-center md:pb-16 md:pt-20">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
        >
          ccLeaf
        </motion.p>
        <motion.h1
          className="heading-hero mt-3 text-4xl text-[#1d1d1f] md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
        >
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-[#86868b]">{highlight}</span>
            </>
          )}
        </motion.h1>
        {description && (
          <motion.p
            className="subhead mx-auto mt-4 max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: appleEase }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
