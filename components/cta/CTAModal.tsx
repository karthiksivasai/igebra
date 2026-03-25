import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import {
  INTEREST_OPTIONS,
  type CTAContext,
  type CTAFormValues,
  type InterestValue,
} from './ctaTypes';

export type CTAModalProps = {
  open: boolean;
  onClose: () => void;
  /** Context from the CTA that opened the modal */
  context: CTAContext;
  onSubmit?: (values: CTAFormValues) => void | Promise<void>;
};

function emptyForm(): Omit<CTAFormValues, 'source'> {
  return {
    name: '',
    school: '',
    email: '',
    phone: '',
    interest: 'general',
    message: '',
  };
}

export function CTAModal({ open, onClose, context, onSubmit }: CTAModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CTAFormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const syncFromContext = useCallback(() => {
    setForm({
      ...emptyForm(),
      interest: context.defaultInterest,
      message: context.messagePreset ?? '',
    });
    setErrors({});
    setSubmitting(false);
  }, [context.defaultInterest, context.messagePreset]);

  useEffect(() => {
    if (open) syncFromContext();
  }, [open, syncFromContext]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
  }, [open]);

  function validate(): boolean {
    const next: Partial<Record<keyof CTAFormValues, string>> = {};
    if (!form.name.trim()) next.name = 'Enter your name';
    if (!form.school.trim()) next.school = 'Enter your school name';
    if (!form.email.trim()) next.email = 'Enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email';
    if (!form.phone.trim()) next.phone = 'Enter a phone number';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit?.({
        name: form.name.trim(),
        school: form.school.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        interest: form.interest,
        message: form.message.trim(),
        source: context.source,
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  function onBackdropMouseDown(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  const submitLabel = context.submitLabel ?? 'Schedule Demo';

  const inputClass =
    'w-full rounded-[10px] border border-border-strong bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-faint/90 ' +
    'transition-[border-color,box-shadow] duration-150 ease-out hover:border-ink/20 ' +
    'focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-ring';

  return (
    <div
      className={[
        'fixed inset-0 z-[350] flex items-end justify-center p-0 sm:items-center sm:p-4',
        'transition-[visibility] duration-200',
        open ? 'visible' : 'invisible delay-200',
      ].join(' ')}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close"
        className={[
          'absolute inset-0 border-0 bg-ink/45 backdrop-blur-sm transition-opacity duration-200 ease-out',
          open ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onMouseDown={onBackdropMouseDown}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={(e: KeyboardEvent) => e.stopPropagation()}
        className={[
          'relative z-[1] flex max-h-[min(94vh,760px)] w-full max-w-[460px] flex-col overflow-hidden',
          'rounded-t-2xl border border-border-strong/80 bg-white shadow-modal sm:rounded-2xl',
          'transition-all duration-200 ease-out motion-reduce:transition-none',
          open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0 sm:translate-y-0',
        ].join(' ')}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-5">
          <div className="min-w-0 pr-2">
            <h2
              id={titleId}
              className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
            >
              {context.headline}
            </h2>
            {context.subcopy && (
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{context.subcopy}</p>
            )}
            <p className="mt-2 text-xs font-medium text-ink-faint">
              Takes less than 30 seconds · We&apos;ll get back within 24 hours
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={[
              '-mr-1 -mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-input text-ink-muted',
              'transition-colors hover:bg-surface hover:text-ink',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              'active:scale-95 motion-reduce:active:scale-100',
            ].join(' ')}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-5 py-4 sm:gap-4 sm:px-6 sm:py-5"
          noValidate
        >
          <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
            <Field
              label="Full name"
              error={errors.name}
              input={
                <input
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, name: e.target.value }));
                    if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
                  }}
                  className={inputClass}
                  placeholder="Priya Sharma"
                />
              }
            />
            <Field
              label="School name"
              error={errors.school}
              input={
                <input
                  name="school"
                  autoComplete="organization"
                  value={form.school}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, school: e.target.value }));
                    if (errors.school) setErrors((er) => ({ ...er, school: undefined }));
                  }}
                  className={inputClass}
                  placeholder="Springfield International School"
                />
              }
            />
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
            <Field
              label="Work email"
              error={errors.email}
              input={
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, email: e.target.value }));
                    if (errors.email) setErrors((er) => ({ ...er, email: undefined }));
                  }}
                  className={inputClass}
                  placeholder="you@school.edu"
                />
              }
            />
            <Field
              label="Phone"
              error={errors.phone}
              input={
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, phone: e.target.value }));
                    if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
                  }}
                  className={inputClass}
                  placeholder="+91 …"
                />
              }
            />
          </div>

          <Field
            label="What are you interested in?"
            input={
              <select
                name="interest"
                value={form.interest}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    interest: e.target.value as InterestValue,
                  }));
                }}
                className={
                  inputClass +
                  ' cursor-pointer appearance-none bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10'
                }
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                }}
              >
                {INTEREST_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            }
          />

          <Field
            label="Message (optional)"
            error={undefined}
            input={
              <textarea
                name="message"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={inputClass + ' min-h-[88px] resize-y py-2.5'}
                placeholder="Anything we should know before we call?"
              />
            }
          />

          <button
            type="submit"
            disabled={submitting}
            className={[
              'mt-1 w-full rounded-btn bg-brand py-3.5 text-[15px] font-semibold text-white shadow-btn-primary',
              'transition-all duration-150 ease-out',
              'hover:bg-brand-hover hover:shadow-btn-primary-hover hover:-translate-y-0.5',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              'active:translate-y-0',
              'disabled:pointer-events-none disabled:opacity-60',
              'motion-reduce:hover:translate-y-0',
            ].join(' ')}
          >
            {submitting ? 'Sending…' : submitLabel}
          </button>

          <p className="text-center text-[11px] leading-relaxed text-ink-faint">
            No spam — we only use this to schedule your conversation. Your data stays private.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-ink-faint">
        {label}
      </span>
      {input}
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </label>
  );
}

export default CTAModal;
