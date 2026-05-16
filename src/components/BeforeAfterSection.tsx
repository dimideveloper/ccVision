import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback, useRef } from 'react';
import { GradientButton } from './GradientButton';
import { Reveal } from './motion/Reveal';
import { Section } from './Section';

export function BeforeAfterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionX = useMotionValue(50);
  const springX = useSpring(motionX, { stiffness: 300, damping: 35 });
  const clipPath = useTransform(springX, (v) => `inset(0 0 0 ${v}%)`);
  const handleLeft = useTransform(springX, (v) => `${v}%`);

  const updatePosition = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      motionX.set(Math.min(98, Math.max(2, x)));
    },
    [motionX],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    updatePosition(e.clientX);
  };

  return (
    <Section className="py-20 md:py-28">
      <div className="mx-auto max-w-[980px] px-5 md:px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Compare</p>
          <h2 className="heading-display mt-2 text-3xl text-[#1d1d1f] md:text-5xl">
            See the difference.
          </h2>
          <GradientButton to="/register" variant="secondary" className="mt-6">
            Try it yourself ›
          </GradientButton>
        </Reveal>

        <motion.div
          ref={containerRef}
          className="relative mt-12 aspect-video cursor-ew-resize select-none overflow-hidden rounded-2xl bg-white border border-black/5 shadow-xl"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="absolute left-4 top-4 z-20 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#1d1d1f] backdrop-blur shadow-sm">
            Before
          </span>
          <span className="absolute right-4 top-4 z-20 rounded-full bg-[#1d1d1f]/90 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur shadow-sm">
            After
          </span>

          <div className="absolute inset-0 bg-gradient-to-br from-[#e8e8ed] to-[#d2d2d7]" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#1d1d1f] to-[#424245]"
            style={{ clipPath }}
          />

          <motion.div
            className="absolute inset-y-0 z-10 w-0.5 bg-white"
            style={{ left: handleLeft }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-sm text-white backdrop-blur-md"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              ↔
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
