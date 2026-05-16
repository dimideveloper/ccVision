import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import searchAnimation from '../assets/lottie/search-card.json';

type Props = {
  type: 'editing' | 'dragdrop' | 'presets' | 'export' | 'search';
};

export function FeaturePreview({ type }: Props) {
  if (type === 'search') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#ffffff] group-hover:scale-[1.02] transition-transform duration-500">
        <div className="w-full h-full max-w-[600px] flex items-center justify-center">
          <Lottie 
            animationData={searchAnimation} 
            loop={true} 
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    );
  }

  if (type === 'editing') {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-[80%] h-[60%] bg-[#0f0f0f] rounded-lg border border-white/5 relative overflow-hidden">
          {/* Timeline lines */}
          <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-white/5 flex items-center px-4 gap-2">
            <div className="h-1 w-12 bg-yellow-400/20 rounded-full" />
            <div className="h-1 w-8 bg-white/10 rounded-full" />
            <div className="h-1 w-16 bg-white/10 rounded-full" />
          </div>
          {/* Playhead */}
          <motion.div 
            animate={{ x: [0, 160, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-8 left-10 w-[1px] bg-yellow-400 z-10"
          >
            <div className="absolute -top-1 -left-[3px] w-2 h-2 bg-yellow-400 rounded-full" />
          </motion.div>
          {/* Waves */}
          <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
             {[1,2,3,4,5,6,7,8].map(i => (
               <motion.div 
                 key={i}
                 animate={{ height: [10, 30, 10] }}
                 transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                 className="w-1 bg-white rounded-full"
               />
             ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'dragdrop') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
        <motion.div 
          animate={{ y: [0, 40, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-14 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </motion.div>
        <div className="w-[70%] h-1 bg-white/5 rounded-full relative">
           <motion.div 
             animate={{ scaleX: [0, 1, 0] }}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 bg-yellow-400 origin-left rounded-full" 
           />
        </div>
      </div>
    );
  }

  if (type === 'presets') {
    return (
      <div className="relative w-full h-full flex items-center justify-center gap-3">
        {[1,2,3,4].map(i => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -10, 0],
              boxShadow: i === 1 ? ['0 0 0px rgba(251,191,36,0)', '0 0 20px rgba(251,191,36,0.2)', '0 0 0px rgba(251,191,36,0)'] : 'none'
            }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            className={`w-12 h-16 rounded-xl border border-white/10 ${
              i === 1 ? 'bg-gradient-to-br from-yellow-400/20 to-amber-600/20 border-yellow-400/30' : 'bg-white/5'
            }`}
          />
        ))}
      </div>
    );
  }

  if (type === 'export') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center px-10">
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4">
          <motion.div 
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="h-full bg-yellow-400"
          />
        </div>
        <div className="flex gap-4">
          <div className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">4K Ultra HD</div>
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">60 FPS</div>
        </div>
      </div>
    );
  }

  return null;
}
