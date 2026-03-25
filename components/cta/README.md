# Unified CTA modal system (React + Tailwind)

## UI structure

| Zone | Content |
|------|--------|
| **Header** | Playfair title + optional subcopy (from context) + trust line: *Takes less than 30 seconds · We’ll get back within 24 hours* |
| **Body** | 2×2 grid (name / school, email / phone) → full-width interest `<select>` → optional message → primary submit |
| **Footer** | One-line privacy reassurance |

**Modal chrome:** blurred dim backdrop, sheet on mobile (`rounded-t-2xl`), centered card from `sm`, fade + scale (honours `motion-reduce`).

**Context:** Each CTA calls `openModal({ headline, subcopy?, defaultInterest, messagePreset?, submitLabel?, source? })` so dropdown + message are pre-seeded without extra user effort.

## Files

| File | Role |
|------|------|
| `ctaTypes.ts` | `CTAContext`, `CTAFormValues`, `INTEREST_OPTIONS`, `CTA_PRESETS` |
| `CTAModal.tsx` | Controlled dialog + form + validation |
| `CTAButton.tsx` | Primary / secondary / ghost styles aligned to the marketing site |
| `useCTAModal.ts` | `open`, `context`, `openModal`, `closeModal`, `modalProps` |
| `CTAExamples.tsx` | Copy-paste patterns for header, FAQ, use cases |

## Usage

```tsx
import { CTAModal } from '@/components/cta/CTAModal';
import { CTAButton } from '@/components/cta/CTAButton';
import { CTA_PRESETS } from '@/components/cta/ctaTypes';
import { useCTAModal } from '@/components/cta/useCTAModal';

export function Header() {
  const cta = useCTAModal();

  return (
    <>
      <CTAButton variant="primary" onClick={() => cta.openModal(CTA_PRESETS.headerDemo)}>
        Book a Free Demo →
      </CTAButton>
      <CTAModal
        {...cta.modalProps}
        onSubmit={async (v) => {
          await fetch('/api/lead', { method: 'POST', body: JSON.stringify(v) });
        }}
      />
    </>
  );
}
```

Custom context (no preset):

```tsx
cta.openModal({
  headline: 'NEO lab enquiry',
  subcopy: 'Tell us about your space and grades.',
  defaultInterest: 'neo',
  messagePreset: 'We are evaluating hardware bundles for Grades 6–10.',
  submitLabel: 'Request call',
  source: 'product-neo-card',
});
```

## Tailwind

Reuse `components/tailwind.preset.cjs` (`brand`, `shadow-modal`, `rounded-btn`, etc.).

## Static site note

The live `index.html` prototype does not load these components. Add them when you move to Vite/Next.
