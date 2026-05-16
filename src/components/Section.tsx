import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  tone?: string; // kept for backwards compat, ignored
  className?: string;
  id?: string;
};

export function Section({ children, className = '', id }: Props) {
  return (
    <section id={id} className={`bg-white text-[#1d1d1f] ${className}`}>
      {children}
    </section>
  );
}
