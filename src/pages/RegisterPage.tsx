import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';

import { usePageTitle } from '../lib/usePageTitle';

export function RegisterPage() {
  usePageTitle('Register');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-[#ffffff] text-[#1d1d1f] flex flex-col selection:bg-yellow-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <header className="p-8 lg:p-12 flex justify-center">
        <Logo large />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-[32px] font-semibold tracking-tight leading-tight">
              Create your ccVision account
            </h1>
            <p className="text-[#86868b] text-lg font-medium tracking-tight">
              Join 30,000+ creators today.
            </p>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-4">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-[#f5f5f7] border-2 border-transparent rounded-xl py-4 px-5 text-[17px] focus:bg-white focus:border-[#0066cc]/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full bg-[#f5f5f7] border-2 border-transparent rounded-xl py-4 px-5 text-[17px] focus:bg-white focus:border-[#0066cc]/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password"
                  className="w-full bg-[#f5f5f7] border-2 border-transparent rounded-xl py-4 px-5 text-[17px] focus:bg-white focus:border-[#0066cc]/20 transition-all outline-none pr-12"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            <button className="w-full bg-[#1d1d1f] text-white py-4 rounded-xl font-semibold text-[17px] hover:bg-[#323235] transition-all active:scale-[0.98] mt-2">
              Sign Up
            </button>

            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#d2d2d7]"></div>
              </div>
              <span className="relative bg-white px-4 text-[13px] font-medium text-[#86868b]">or</span>
            </div>

            <button 
              type="button"
              className="w-full bg-white border-2 border-[#d2d2d7] text-[#1d1d1f] py-4 rounded-xl font-semibold text-[17px] flex items-center justify-center gap-3 hover:bg-[#f5f5f7] transition-all active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </form>

          <p className="text-center text-[15px] font-medium text-[#86868b]">
            Already have an account? <Link to="/login" className="text-[#0066cc] hover:underline">Log in here.</Link>
          </p>
        </motion.div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-[12px] text-[#86868b] max-w-sm mx-auto leading-relaxed">
          By signing up, you agree to our <a href="#" className="text-[#1d1d1f] hover:underline font-medium">Terms & Conditions</a> and acknowledge that you have read our <a href="#" className="text-[#1d1d1f] hover:underline font-medium">Privacy Policy</a>.
        </p>
      </footer>
    </div>
  );
}
