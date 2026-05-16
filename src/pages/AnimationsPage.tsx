import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { ANIMATIONS, ANIMATION_CATEGORIES } from '../data/content';
import { LottiePlayer } from '../components/LottiePlayer';

import { usePageTitle } from '../lib/usePageTitle';

export function AnimationsPage() {
  usePageTitle('Animation Templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Templates');

  const filteredAnimations = ANIMATIONS.filter(anim => {
    const matchesSearch = anim.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Templates' || anim.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FBFBFA] pt-32 pb-20 font-sans">
      <div className="max-w-[1400px] mx-auto px-8">
        
        {/* Main Layout Grid */}
        <div className="flex gap-12">
          
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 space-y-10">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">Categories</h3>
              <nav className="flex flex-col gap-1">
                <button
                  onClick={() => setSelectedCategory('All Templates')}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedCategory === 'All Templates' ? 'bg-black text-white shadow-lg' : 'text-black/40 hover:bg-black/5 hover:text-black'
                  }`}
                >
                  All Templates
                  {selectedCategory === 'All Templates' && <motion.div layoutId="dot" className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                </button>
                {ANIMATION_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory === cat.name ? 'bg-black text-white shadow-lg' : 'text-black/40 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    {cat.name}
                    {selectedCategory === cat.name && <motion.div layoutId="dot" className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 space-y-8">
            {/* Search and Filter Bar */}
            <div className="flex items-center gap-4 bg-white rounded-2xl p-2 shadow-sm border border-black/5">
              <div className="flex-1 relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-black/20" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent pl-12 pr-4 py-3 text-sm font-bold outline-none placeholder:text-black/20 text-[#1d1d1f]"
                />
              </div>
              <div className="h-8 w-[1px] bg-black/5" />
              <button className="px-6 py-2 text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">
                Newest
              </button>
            </div>

            {/* Animation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredAnimations.map((anim) => (
                  <motion.div
                    layout
                    key={anim.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link
                      to={`/editor/${anim.id}`}
                      className="group block bg-white rounded-[32px] border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    >
                      {/* Live Preview Container */}
                      <div className="aspect-[4/3] bg-[#111] relative overflow-hidden flex items-center justify-center p-8">
                        {/* Status Badges */}
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                           <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-[0.15em] ${
                             anim.type === 'Studio' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 
                             anim.type === 'Pro' ? 'bg-white/10 text-white backdrop-blur-md border border-white/10' : 
                             'bg-white/90 text-black backdrop-blur-sm shadow-sm'
                           }`}>
                             {anim.type}
                           </span>
                        </div>
                        
                        {/* Lottie Player as Live Preview */}
                        <div className="w-full h-full transform transition-transform duration-700 group-hover:scale-110">
                           {anim.lottie ? (
                             <LottiePlayer src={anim.lottie} loop autoplay hideControls className="w-full h-full pointer-events-none" />
                           ) : (
                             <img src={anim.image} alt={anim.title} className="w-full h-full object-cover rounded-2xl" />
                           )}
                        </div>

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                           <div className="px-6 py-3 rounded-full bg-white text-black text-[11px] font-black uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                             Open in Editor
                           </div>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-8 flex justify-between items-center bg-white">
                        <div>
                          <h4 className="font-bold text-[#1d1d1f] text-base leading-tight mb-1">{anim.title}</h4>
                          <p className="text-[10px] font-black uppercase tracking-widest text-black/20">{anim.category}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#F5F5F7] group-hover:bg-amber-500 flex items-center justify-center transition-colors">
                          <ChevronRight className="w-5 h-5 text-black" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredAnimations.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-black/20 font-bold">No templates found for this search.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
