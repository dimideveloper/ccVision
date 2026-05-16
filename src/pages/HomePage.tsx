import { Hero } from '../components/Hero';
import { StatsSection } from '../components/StatsSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { DragDropSection } from '../components/DragDropSection';
import { IntegrationsSection } from '../components/IntegrationsSection';
import { PricingSection } from '../components/PricingSection';
import { ClosingCTA } from '../components/ClosingCTA';
import { DarkFeaturesSection } from '../components/DarkFeaturesSection';
import { ParallaxSection } from '../components/ParallaxSection';

export function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      
      <ParallaxSection offset={50}>
        <StatsSection />
      </ParallaxSection>

      <FeaturesSection />

      <div className="relative z-10 -mt-20">
         <ParallaxSection offset={100}>
            <DragDropSection />
         </ParallaxSection>
      </div>

      <DarkFeaturesSection />
      
      <ParallaxSection offset={80}>
        <IntegrationsSection />
      </ParallaxSection>

      <PricingSection />
      
      <div className="relative z-10 -mt-12">
        <ClosingCTA />
      </div>
    </div>
  );
}
