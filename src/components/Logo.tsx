import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { springSnappy } from '../lib/motion';
import logoImg from '../assets/logo.png';

export function Logo({ className = '', invert = false, large = false }: { className?: string; invert?: boolean; large?: boolean }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
      <Link to="/" className={`flex items-center gap-3 ${className}`}>
        <img 
          src={logoImg} 
          alt="ccVision" 
          className={large ? "w-16 h-16 object-contain" : "w-10 h-10 object-contain"}
          style={{ filter: invert ? 'invert(1)' : 'none' }}
        />
        <span
          className={`${large ? 'text-5xl' : 'text-3xl'} font-bold tracking-tight ${invert ? 'text-white' : 'text-[#1d1d1f]'}`}
          style={{ letterSpacing: '-0.04em' }}
        >
          ccVision
        </span>
      </Link>
    </motion.div>
  );
}
