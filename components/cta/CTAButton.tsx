import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type CTAButtonVariant = 'primary' | 'secondary' | 'ghost';

export type CTAButtonProps = {
  variant?: CTAButtonVariant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-semibold font-sans ' +
  'transition-all duration-150 ease-out focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.98] ' +
  'motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<CTAButtonVariant, string> = {
  primary:
    'bg-brand px-6 py-3 text-[15px] text-white shadow-btn-primary hover:bg-brand-hover ' +
    'hover:-translate-y-0.5 hover:shadow-btn-primary-hover motion-reduce:hover:translate-y-0',
  secondary:
    'border border-border-strong bg-white px-6 py-3 text-[15px] text-ink ' +
    'hover:border-ink/25 hover:bg-surface',
  ghost:
    'border border-transparent bg-transparent px-4 py-2.5 text-[14px] font-medium text-ink-muted ' +
    'hover:bg-black/[0.04] hover:text-ink',
};

/**
 * Use for any in-page CTA that should feel identical (hover, radius, focus).
 * Wire `onClick` to your modal opener, e.g. `() => openModal(CTA_PRESETS.headerDemo)`.
 */
export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  function CTAButton({ variant = 'primary', className = '', children, type = 'button', ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={[base, variants[variant], className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default CTAButton;
