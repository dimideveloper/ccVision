import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { GradientButton } from './GradientButton';
import { Magnetic } from './Magnetic';

const NAV = [
  { label: 'Animations', to: '/animations' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Pricing', to: '/pricing', badge: 'New' },
];

const navStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
};

const navItem: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

function NavLink({ label, to, badge }: { label: string; to: string; badge?: string }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  const [hovered, setHovered] = useState(false);

  return (
    <Magnetic>
      <motion.li
        variants={navItem}
        className="relative"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Link
          to={to}
          className={`relative flex items-center gap-1.5 text-[14px] font-semibold transition-all duration-200 ${
            isActive ? 'text-[#1d1d1f]' : 'text-[#1d1d1f]/45 hover:text-[#1d1d1f]'
          }`}
        >
          {label}
          {badge && (
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600"
            >
              {badge}
            </motion.span>
          )}
        </Link>

        {/* Animated underline glow */}
        <AnimatePresence>
          {(hovered || isActive) && (
            <motion.span
              layoutId="nav-underline"
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.5 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
              style={{ boxShadow: '0 0 6px rgba(251,191,36,0.6)' }}
            />
          )}
        </AnimatePresence>
      </motion.li>
    </Magnetic>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 60],
    ['rgba(255,255,255,0.55)', 'rgba(255,255,255,0.88)'],
  );
  const navShadow = useTransform(
    scrollY,
    [0, 60],
    ['0 0 0 rgba(0,0,0,0)', '0 8px 40px rgba(0,0,0,0.06), 0 1px 0 rgba(0,0,0,0.04)'],
  );
  const navBorder = useTransform(
    scrollY,
    [0, 60],
    ['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.08)'],
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        className="flex h-[58px] w-full max-w-[1100px] items-center justify-between rounded-[28px] px-8"
        style={{
          background: navBg,
          boxShadow: navShadow,
          backdropFilter: 'saturate(200%) blur(20px)',
          WebkitBackdropFilter: 'saturate(200%) blur(20px)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: navBorder,
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left: Logo + search + nav links */}
        <div className="flex items-center gap-8">
          <Magnetic>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Logo />
            </motion.div>
          </Magnetic>

          {/* Divider */}
          <motion.div
            className="h-5 w-px bg-black/10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />

          {/* Search icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="group cursor-pointer"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black/30 transition-all duration-200 group-hover:text-black/70 group-hover:scale-110"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </motion.div>

          {/* Nav items */}
          <motion.ul
            className="hidden items-center gap-8 md:flex"
            variants={navStagger}
            initial="hidden"
            animate="visible"
          >
            {NAV.map((item) => (
              <NavLink key={item.label} {...item} />
            ))}
          </motion.ul>
        </div>

        {/* Right: Login + CTA */}
        <div className="flex items-center gap-6">
          <Magnetic>
            <Link
              to="/login"
              className="text-[14px] font-semibold text-[#1d1d1f]/45 transition-all duration-200 hover:text-[#1d1d1f]"
            >
              Login
            </Link>
          </Magnetic>
          <GradientButton to="/register" variant="fancy">
            Try for free
          </GradientButton>
        </div>
      </motion.nav>
    </header>
  );
}
