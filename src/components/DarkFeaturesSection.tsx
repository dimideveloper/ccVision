import { motion } from 'framer-motion';
import { Reveal } from './motion/Reveal';

export function DarkFeaturesSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32 rounded-[60px] mx-4 my-12 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-8">
        <div className="text-center mb-20 space-y-4">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Power up your workflow with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">next-gen features</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <Reveal>
            <div className="group relative bg-[#111] rounded-[40px] p-12 border border-white/5 hover:border-white/10 transition-all overflow-hidden h-[400px]">
               <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19l-5-5-5 5M17.5 10l-5-5-5 5"/></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white">Faster than ever.</h3>
                  <p className="text-white/40 text-lg font-medium leading-relaxed">
                     Optimized rendering engine ensures your exports are ready in seconds, not minutes.
                  </p>
               </div>
               
               {/* Decorative graphic */}
               <div className="absolute bottom-[-50px] right-[-20px] w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full" />
            </div>
          </Reveal>

          {/* Feature 2 */}
          <Reveal delay={0.1}>
            <div className="group relative bg-[#111] rounded-[40px] p-12 border border-white/5 hover:border-white/10 transition-all overflow-hidden h-[400px]">
               <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white">Infinite expansion.</h3>
                  <p className="text-white/40 text-lg font-medium leading-relaxed">
                     A plugin system designed for creators. Add new tools as you grow.
                  </p>
               </div>
               
               {/* Decorative graphic */}
               <div className="absolute bottom-[-50px] right-[-20px] w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
