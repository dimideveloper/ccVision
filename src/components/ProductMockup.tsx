import { motion } from 'framer-motion';
import { appleEase } from '../lib/motion';

type Props = {
  variant?: 'editor' | 'browser';
};

export function ProductMockup({ variant = 'editor' }: Props) {
  return (
    <motion.div
      className="relative mx-auto w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: appleEase }}
    >
      {/* Main Window */}
      <div className="product-window aspect-[16/10] w-full overflow-hidden border border-white/10">
        <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3 bg-black/20">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            ccVision Studio
          </span>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="hidden w-48 border-r border-white/5 p-6 space-y-6 sm:block bg-black/10">
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="h-2 w-full bg-white/5 rounded-full" />
               ))}
            </div>
            <div className="pt-6 space-y-3">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="h-8 w-full bg-white/5 rounded-xl" />
               ))}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="relative flex flex-1 items-center justify-center p-12 bg-gradient-to-br from-[#1d1d1f] to-black">
             <div className="w-full h-full rounded-2xl border border-white/5 bg-black/40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/5 blur-[100px]" />
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-32 h-32 bg-amber-500 rounded-3xl shadow-2xl flex items-center justify-center"
                >
                   <div className="w-12 h-12 bg-white/20 rounded-xl" />
                </motion.div>
             </div>

             {/* Floating Panels */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
               className="absolute top-10 right-10 w-40 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
             >
                <div className="h-2 w-12 bg-amber-400 rounded-full mb-3" />
                <div className="space-y-2">
                   <div className="h-6 w-full bg-white/10 rounded-lg" />
                   <div className="h-6 w-full bg-white/10 rounded-lg" />
                </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
               className="absolute bottom-10 left-10 w-32 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
             >
                <div className="flex gap-2">
                   <div className="w-6 h-6 bg-green-500/40 rounded-md" />
                   <div className="w-6 h-6 bg-blue-500/40 rounded-md" />
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
