import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GradientButton } from '../components/GradientButton';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <span className="text-[120px] font-black text-black/5 select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 bg-amber-500 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl shadow-amber-500/20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
             </div>
          </div>
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#1d1d1f]">Lost in space?</h1>
          <p className="text-[#86868b] max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GradientButton to="/">Back to Home</GradientButton>
        </motion.div>
      </div>
    </div>
  );
}
