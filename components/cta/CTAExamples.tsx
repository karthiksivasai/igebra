'use client';

import { CTAButton } from './CTAButton';
import { CTAModal } from './CTAModal';
import { CTA_PRESETS } from './ctaTypes';
import { useCTAModal } from './useCTAModal';
import type { CTAFormValues } from './ctaTypes';

/**
 * Example page wiring: duplicate the patterns you need in Header, UseCaseSection, FAQ, etc.
 */
export function CTAExamples() {
  const cta = useCTAModal();

  async function handleSubmit(values: CTAFormValues) {
    console.info('CTA submit', values);
    await new Promise((r) => setTimeout(r, 600));
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex flex-wrap gap-3">
        <CTAButton variant="primary" onClick={() => cta.openModal(CTA_PRESETS.headerDemo)}>
          Book a Free Demo →
        </CTAButton>

        <CTAButton variant="secondary" onClick={() => cta.openModal(CTA_PRESETS.heroSecondary)}>
          See our products
        </CTAButton>

        <CTAButton variant="primary" onClick={() => cta.openModal(CTA_PRESETS.useCaseLab)}>
          Book a 30-min call
        </CTAButton>

        <CTAButton variant="primary" onClick={() => cta.openModal(CTA_PRESETS.useCaseClassroom)}>
          AI for classrooms
        </CTAButton>

        <CTAButton variant="secondary" onClick={() => cta.openModal(CTA_PRESETS.faqSidebar)}>
          Book a Free 30-min Call →
        </CTAButton>

        <CTAButton variant="primary" onClick={() => cta.openModal(CTA_PRESETS.ctaBottom)}>
          Start your journey
        </CTAButton>
      </div>

      <CTAModal {...cta.modalProps} onSubmit={handleSubmit} />
    </div>
  );
}

export default CTAExamples;
