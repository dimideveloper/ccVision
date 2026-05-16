import { motion, useInView, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { fadeUp } from '../../lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  once?: boolean;
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  variants = fadeUp,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-12% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
