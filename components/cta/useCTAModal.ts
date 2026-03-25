import { useCallback, useState } from 'react';
import type { CTAContext } from './ctaTypes';

const defaultCtx: CTAContext = {
  headline: 'Book a free demo',
  defaultInterest: 'general',
  submitLabel: 'Schedule Demo',
  source: 'default',
};

/**
 * Lightweight state for opening {@link CTAModal} with different contexts from any CTA.
 */
export function useCTAModal() {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<CTAContext>(defaultCtx);

  const openModal = useCallback((ctx: CTAContext) => {
    setContext(ctx);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  return {
    open,
    context,
    openModal,
    closeModal,
    /** Spread onto `<CTAModal />` */
    modalProps: {
      open,
      onClose: closeModal,
      context,
    } as const,
  };
}
