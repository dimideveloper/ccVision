import { motion } from 'framer-motion';
import { ProductMockup } from './ProductMockup';
import { TiltWrapper } from './TiltWrapper';

export function HeroShowcase() {
  return (
    <div className="relative mt-20 md:mt-32">
      {/* Glow behind mockup */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-4 lg:px-0">
        <TiltWrapper>
          <div className="relative group">
            {/* The main window shadow (dynamic) */}
            <div className="absolute -inset-4 bg-black/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <ProductMockup variant="editor" />

            {/* Floating Tooltips/Panels with 3D Offset */}
            <motion.div
              style={{ translateZ: 50 }}
              className="absolute -left-12 top-20 hidden w-52 rounded-3xl border border-black/[0.03] bg-white/80 backdrop-blur-xl p-5 shadow-2xl md:block"
            >
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-lg">A</div>
                <div>
                  <p className="text-[13px] font-bold text-black">Dynamic Text</p>
                  <p className="text-[11px] font-medium text-black/30">Auto-scaling</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ translateZ: 80 }}
              className="absolute -right-16 top-40 hidden w-60 rounded-3xl border border-black/[0.03] bg-white/80 backdrop-blur-xl p-5 shadow-2xl md:block"
            >
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">Color Palette</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                 </div>
                 <div className="flex gap-2.5">
                    {['#f59e0b', '#fbbf24', '#fcd34d', '#fb923c'].map(c => (
                      <div key={c} className="w-9 h-9 rounded-xl shadow-inner border border-black/5" style={{ background: c }} />
                    ))}
                 </div>
              </div>
            </motion.div>

            <motion.div
              style={{ translateZ: 30 }}
              className="absolute -bottom-8 -right-8 hidden w-44 rounded-3xl border border-black/[0.03] bg-[#1d1d1f] p-5 shadow-2xl md:block"
            >
              <div className="space-y-3">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 text-center">Exporting Asset</p>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]" 
                    />
                 </div>
              </div>
            </motion.div>
          </div>
        </TiltWrapper>
      </div>
    </div>
  );
}
