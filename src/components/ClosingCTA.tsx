import { motion } from 'framer-motion';
import { Reveal } from './motion/Reveal';
import { GradientButton } from './GradientButton';
import { ProductMockup } from './ProductMockup';

export function ClosingCTA() {
  return (
    <section className="bg-white pt-24 pb-0 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-8 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-8 leading-tight">
            Take your creative workflow <br /> to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">next level.</span>
          </h2>
        </Reveal>
        
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <GradientButton to="/register" variant="fancy">Try it for free</GradientButton>
            <GradientButton to="/pricing" variant="secondary">View all plans ›</GradientButton>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative mx-auto max-w-5xl translate-y-20 group">
             <div className="absolute inset-0 bg-amber-500/10 blur-[120px] rounded-full group-hover:bg-amber-500/20 transition-colors duration-700" />
             <ProductMockup variant="editor" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
