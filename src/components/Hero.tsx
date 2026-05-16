import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { GradientButton } from './GradientButton';
import { HeroShowcase } from './HeroShowcase';

/* ── Senior Polish: Staggered reveal headline ── */
const words1 = ['Bring', 'ideas', 'to', 'life'];
const words2 = ['in', 'just', 'a', 'few', 'clicks.'];

function AnimatedHeadline() {
  return (
    <motion.h1
      className="mx-auto mt-0 max-w-4xl text-[2.8rem] md:text-[4.5rem] lg:text-[6rem] font-bold tracking-tight text-[#1d1d1f]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
      }}
    >
      <span className="block leading-[1.05]">
        {words1.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            variants={{
              hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
          </motion.span>
        ))}
      </span>
      <span className="block leading-[1.05]">
        {words2.map((w, i) => (
          <motion.span
            key={i}
            className={`inline-block mr-[0.25em] ${w === 'clicks.' ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500' : ''}`}
            variants={{
              hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-48 md:pb-32 hero-mesh">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-40">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-200/20 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/20 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-50/50 backdrop-blur-sm px-4 py-2"
        >
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[13px] font-bold text-amber-700 uppercase tracking-widest">Version 2.0 is live</span>
        </motion.div>

        <AnimatedHeadline />

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg md:text-2xl font-medium leading-relaxed text-[#1d1d1f]/40"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ccVision is the high-performance browser editor built for modern creative teams.
          Experience studio-quality results in seconds.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <GradientButton to="/register" variant="fancy" className="px-10 h-16 text-lg">
            Start creating now
          </GradientButton>
          <GradientButton to="/pricing" variant="secondary" className="px-10 h-16 text-lg">
            View pricing
          </GradientButton>
        </motion.div>

        {/* Showcase */}
        <HeroShowcase />
      </div>
    </section>
  );
}
