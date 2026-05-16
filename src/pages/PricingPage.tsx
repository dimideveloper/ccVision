import { Link } from 'react-router-dom';
import { GradientButton } from '../components/GradientButton';
import { PageHero } from '../components/PageHero';
import { PricingSection } from '../components/PricingSection';
import { Section } from '../components/Section';
import { TestimonialsSection } from '../components/TestimonialsSection';

const COMPARE = [
  { feature: 'Animation library', essential: '100+', plus: '200+', ultimate: '300+' },
  { feature: 'Monthly downloads', essential: '40', plus: '100', ultimate: '150' },
  { feature: 'Max resolution', essential: '1080p', plus: '4K', ultimate: '4K' },
  { feature: 'Preview cooldown', essential: '30s', plus: '15s', ultimate: '5s' },
  { feature: 'Presets', essential: '90', plus: '1500', ultimate: 'Unlimited' },
  { feature: 'Themes', essential: '2', plus: '3', ultimate: 'All' },
];

import { usePageTitle } from '../lib/usePageTitle';

export function PricingPage() {
  usePageTitle('Pricing Plans');
  return (
    <main>
      <PageHero
        title="Pricing"
        highlight="that scales"
        description="Annual billing saves 17%. Switch or cancel anytime."
      />
      <PricingSection variant="page" />

      <Section tone="muted" className="pb-12">
        <div className="mx-auto max-w-5xl overflow-x-auto px-4 md:px-8">
          <p className="label mb-4">Full comparison</p>
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-300">
                <th className="py-3 pr-4 font-medium text-neutral-500">Feature</th>
                <th className="py-3 px-4 font-medium text-neutral-950">Essential</th>
                <th className="py-3 px-4 font-medium text-neutral-950">Plus</th>
                <th className="py-3 pl-4 font-medium text-neutral-950">Ultimate</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.feature} className="border-b border-neutral-200">
                  <td className="py-3 pr-4 text-neutral-600">{row.feature}</td>
                  <td className="py-3 px-4 text-neutral-950">{row.essential}</td>
                  <td className="py-3 px-4 text-neutral-950">{row.plus}</td>
                  <td className="py-3 pl-4 text-neutral-950">{row.ultimate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <TestimonialsSection />

      <Section className="pb-20 text-center">
        <GradientButton to="/register">Get started</GradientButton>
        <p className="mt-4 text-sm text-neutral-500">
          <Link to="/login" className="underline-offset-2 hover:underline">
            Already have an account?
          </Link>
        </p>
      </Section>
    </main>
  );
}
