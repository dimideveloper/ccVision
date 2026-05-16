import { motion } from 'framer-motion';
import { GradientButton } from './GradientButton';
import { Reveal } from './motion/Reveal';

const PLANS = [
  {
    name: 'Essential',
    price: '19',
    desc: 'For individual creators.',
    features: ['100+ Templates', '1080p Exports', 'Standard Support'],
    highlight: false,
  },
  {
    name: 'Plus',
    price: '49',
    desc: 'For growing teams.',
    features: ['450+ Templates', '4K Exports', 'Priority Support', 'Team Collaboration'],
    highlight: true,
  },
  {
    name: 'Ultimate',
    price: '79',
    desc: 'For production studios.',
    features: ['Unlimited Everything', 'Custom Presets', '24/7 Dedicated Support', 'API Access'],
    highlight: false,
  },
];

export function PricingSection({ variant = 'home' }: { variant?: 'home' | 'page' }) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-8">
        <div className="text-center mb-20 space-y-4">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
              Flexible pricing plans
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-black/40 font-medium">
              Choose the plan that fits your vision. Save 17% with annual billing.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`relative p-10 rounded-[40px] border transition-all hover:shadow-2xl ${
                plan.highlight 
                ? 'bg-amber-600 border-amber-500 shadow-xl shadow-amber-500/20 text-white translate-y-[-16px]' 
                : 'bg-[#fbfbfa] border-black/5 text-black'
              }`}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-amber-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    Popular
                  </div>
                )}
                
                <div className="mb-8">
                   <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-black'}`}>{plan.name}</h3>
                   <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black">${plan.price}</span>
                      <span className={plan.highlight ? 'text-white/60' : 'text-black/40'}>/mo</span>
                   </div>
                   <p className={`mt-4 font-medium ${plan.highlight ? 'text-white/80' : 'text-black/60'}`}>{plan.desc}</p>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 font-medium">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-white/20' : 'bg-black/5'}`}>
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span className="text-sm opacity-90">{f}</span>
                    </li>
                  ))}
                </ul>

                <GradientButton 
                  to="/register" 
                  variant={plan.highlight ? 'fancy' : 'secondary'} 
                  className="w-full"
                >
                  Get started
                </GradientButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
