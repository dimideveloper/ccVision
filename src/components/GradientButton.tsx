import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { springSnappy } from '../lib/motion';

type Variant = 'primary' | 'secondary' | 'ghost' | 'invert' | 'fancy';

type Props = {
  children: ReactNode;
  href?: string;
  to?: string;
  variant?: Variant;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
};

const variantClass: Record<Variant, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-ghost',
  invert: 'btn btn-invert',
  fancy: 'btn-fancy',
};

const MotionLink = motion(Link);
const MotionAnchor = motion.a;
const MotionButton = motion.button;

const motionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: springSnappy,
};

export function GradientButton({
  children,
  href,
  to,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
}: Props) {
  const combined = `${variantClass[variant]} ${className}`;
  const content = variant === 'fancy' ? <span>{children}</span> : children;

  if (to) {
    return (
      <MotionLink to={to} className={combined} onClick={onClick} {...motionProps}>
        {content}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <MotionAnchor href={href} className={combined} onClick={onClick} {...motionProps}>
        {content}
      </MotionAnchor>
    );
  }

  return (
    <MotionButton type={type} className={combined} onClick={onClick} {...motionProps}>
      {content}
    </MotionButton>
  );
}
