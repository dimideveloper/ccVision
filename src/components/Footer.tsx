import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { label: 'Animations', to: '/animations' },
      { label: 'Editor', to: '/animations' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'New Templates', to: '/animations' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/faq' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact', to: '/faq' },
      { label: 'Status', to: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Privacy', to: '/' },
      { label: 'Terms', to: '/' },
      { label: 'Licensing', to: '/' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[#ffffff] pt-20 pb-10">
      <div className="mx-auto max-w-[1100px] px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Logo & Info */}
          <div className="md:col-span-4 space-y-6">
            <Logo />
            <p className="text-sm text-[#86868b] leading-relaxed max-w-[240px]">
              The ultimate browser-based animation editor for professional creators. Create, customize, and export with ease.
            </p>
            <div className="flex gap-4">
              {['twitter', 'instagram', 'github'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-black/30 hover:text-black transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm opacity-20" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-[13px] font-semibold text-[#86868b] hover:text-black transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-black/30">
            Copyright © {new Date().getFullYear()} ccVision Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/" className="text-[11px] font-bold text-black/30 hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-[11px] font-bold text-black/30 hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
