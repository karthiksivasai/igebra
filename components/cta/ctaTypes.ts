/**
 * Shared types + interest options for the CTA modal system.
 * `defaultInterest` must match an `INTEREST_OPTIONS[].value`.
 */

export type InterestValue =
  | 'general'
  | 'cypher'
  | 'morpheus'
  | 'zion'
  | 'neo'
  | 'matrix'
  | 'ai-lab'
  | 'other';

export const INTEREST_OPTIONS: { value: InterestValue; label: string }[] = [
  { value: 'general', label: 'General platform demo' },
  { value: 'cypher', label: 'Student AI Companion (Cypher)' },
  { value: 'morpheus', label: 'AI teaching & lesson tools (Morpheus)' },
  { value: 'zion', label: 'AI tool suite for students (Zion)' },
  { value: 'neo', label: 'Innovation / AI lab (NEO)' },
  { value: 'matrix', label: 'On-premise infrastructure (Matrix)' },
  { value: 'ai-lab', label: 'Use case: AI lab rollout' },
  { value: 'other', label: 'Other / quick question' },
];

export type CTAContext = {
  /** Modal title */
  headline: string;
  /** Optional line under title (context from page section) */
  subcopy?: string;
  /** Pre-selected interest dropdown */
  defaultInterest: InterestValue;
  /** Optional seed for the message field (user can edit) */
  messagePreset?: string;
  /** Primary button label */
  submitLabel?: string;
  /** Analytics / CRM source tag */
  source?: string;
};

/** Sensible defaults for common placements */
export const CTA_PRESETS = {
  headerDemo: {
    headline: 'Book a free demo',
    subcopy: 'See how AI Ready School fits your campus — no obligation.',
    defaultInterest: 'general' as InterestValue,
    submitLabel: 'Schedule Demo',
    source: 'header',
  },
  heroSecondary: {
    headline: 'Talk to our team',
    subcopy: 'Tell us what you’re exploring — we’ll tailor the conversation.',
    defaultInterest: 'general' as InterestValue,
    submitLabel: 'Schedule Demo',
    source: 'hero',
  },
  useCaseClassroom: {
    headline: 'AI for your classrooms',
    subcopy: 'We’ll focus on teaching workflows and student-safe AI.',
    defaultInterest: 'cypher' as InterestValue,
    messagePreset: 'Interested in AI for classrooms and responsible student use.',
    submitLabel: 'Schedule call',
    source: 'use-case-classroom',
  },
  useCaseLab: {
    headline: 'Plan your AI lab',
    subcopy: 'Hardware, curriculum alignment, and rollout — we’ll map it with you.',
    defaultInterest: 'ai-lab' as InterestValue,
    messagePreset: 'Interested in setting up an AI / innovation lab at our school.',
    submitLabel: 'Book a 30-min call',
    source: 'use-case-lab',
  },
  faqSidebar: {
    headline: 'Still have questions?',
    subcopy: 'Drop a note — a school specialist will reply shortly.',
    defaultInterest: 'other' as InterestValue,
    messagePreset: 'I’d like to know more about: ',
    submitLabel: 'Send request',
    source: 'faq-cta',
  },
  ctaBottom: {
    headline: 'Start your journey',
    subcopy: 'Book a demo or ask for a pilot — we respond fast.',
    defaultInterest: 'general' as InterestValue,
    submitLabel: 'Schedule Demo',
    source: 'cta-bottom',
  },
} satisfies Record<string, CTAContext>;

export type CTAFormValues = {
  name: string;
  school: string;
  email: string;
  phone: string;
  interest: InterestValue;
  message: string;
  source?: string;
};
