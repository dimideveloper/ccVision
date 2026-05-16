import { motion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '../../lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Stagger({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerDivItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
