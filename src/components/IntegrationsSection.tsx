import { motion } from 'framer-motion';
import { Reveal } from './motion/Reveal';
import { GradientButton } from './GradientButton';

const ICONS = [
  { name: 'Discord', color: 'bg-[#5865F2]' },
  { name: 'Slack', color: 'bg-[#4A154B]' },
  { name: 'Figma', color: 'bg-[#F24E1E]' },
  { name: 'Motion', color: 'bg-black' },
  { name: 'Adobe', color: 'bg-[#FF0000]' },
  { name: 'Zapier', color: 'bg-[#FF4F00]' },
];

export function IntegrationsSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Visual representation of integrations */}
            <div className="aspect-square bg-[#fbfbfa] rounded-[48px] border border-black/5 flex items-center justify-center p-12 relative overflow-hidden">
               <div className="absolute inset-0 bg-amber-500/5 blur-[80px]" />
               
               {/* Center Node */}
               <motion.div 
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                 className="w-24 h-24 bg-white rounded-3xl shadow-2xl z-10 flex items-center justify-center border border-black/5"
               >
                  <div className="w-12 h-12 bg-amber-500 rounded-xl" />
               </motion.div>

               {/* Orbital Icons */}
               {ICONS.map((icon, i) => {
                 const angle = (i / ICONS.length) * Math.PI * 2;
                 const radius = 140;
                 const x = Math.cos(angle) * radius;
                 const y = Math.sin(angle) * radius;

                 return (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, scale: 0 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1, type: 'spring' }}
                     className={`absolute w-14 h-14 ${icon.color} rounded-2xl shadow-lg flex items-center justify-center z-20`}
                     style={{ x, y }}
                   >
                     <div className="w-6 h-6 bg-white/20 rounded-md" />
                     
                     {/* Connector lines (mocked with simple div) */}
                     <div 
                       className="absolute bg-amber-500/10 h-px origin-left"
                       style={{ 
                         width: radius, 
                         left: '50%',
                         top: '50%',
                         transform: `rotate(${angle + Math.PI}rad)`
                       }}
                     />
                   </motion.div>
                 );
               })}
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
                One platform, <br /> unlimited integrations.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <GradientButton to="/register" variant="fancy">
                Start linking now
              </GradientButton>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#86868b] font-medium leading-relaxed max-w-md">
                Connect your workspace to the tools you love. ccVision fits perfectly into your existing ecosystem.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
