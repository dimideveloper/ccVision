import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { appleEase } from '../lib/motion';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col hero-mesh">
      <header className="site-nav px-5 py-4 md:px-6">
        <Logo />
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: appleEase }}
          className="w-full max-w-[400px]"
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="py-6 text-center text-xs text-[#86868b]">
        Secure sign-in · ccLeaf
      </footer>
    </div>
  );
}
