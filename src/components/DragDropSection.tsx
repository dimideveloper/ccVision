import { motion } from 'framer-motion';
import { ProductMockup } from './ProductMockup';
import { Reveal } from './motion/Reveal';

const STEPS = [
  { title: 'Link accounts', desc: 'Connect your favorite tools in one click.', icon: '🔗' },
  { title: 'Drag & Drop', desc: 'Move assets directly into your timeline.', icon: '✨' },
  { title: 'Auto-sync', desc: 'Everything stays up to date, everywhere.', icon: '🔄' },
];

export function DragDropSection() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
                Simplify your <br /> workflow.
              </h2>
            </Reveal>

            <div className="space-y-8">
              {STEPS.map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black mb-1">{step.title}</h3>
                      <p className="text-[#86868b] font-medium leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.3}>
            <div className="relative">
               <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full" />
               <ProductMockup variant="editor" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
