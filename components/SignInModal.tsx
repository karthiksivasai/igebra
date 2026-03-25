import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

export type SignInModalProps = {
  open: boolean;
  onClose: () => void;
  /** Optional: called after successful client-side validation (wire to your auth) */
  onSubmit?: (payload: { email: string; password: string }) => void | Promise<void>;
};

/**
 * Sign-in dialog aligned with AI Ready School visual system:
 * DM Sans, brand magenta, blush surface, soft borders, 16px-scale radii.
 */
export function SignInModal({ open, onClose, onSubmit }: SignInModalProps) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setErrors({});
    setSubmitting(false);
  }, []);

  useEffect(() => {
    if (!open) {
      resetForm();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, resetForm]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLInputElement>('input[type="email"]')?.focus();
  }, [open]);

  function validate() {
    const next: typeof errors = {};
    if (!email.trim()) next.email = 'Enter your school email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email';
    if (!password) next.password = 'Enter your password';
    else if (password.length < 8) next.password = 'At least 8 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit?.({ email: email.trim(), password });
    } finally {
      setSubmitting(false);
    }
  }

  function onBackdropMouseDown(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  function onPanelKeyDown(e: KeyboardEvent) {
    e.stopPropagation();
  }

  return (
    <div
      className={[
        'fixed inset-0 z-[300] flex items-end justify-center p-0 sm:items-center sm:p-4',
        'transition-[visibility] duration-200',
        open ? 'visible' : 'invisible delay-200',
      ].join(' ')}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close sign in"
        className={[
          'absolute inset-0 border-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-200 ease-out',
          open ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onMouseDown={onBackdropMouseDown}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        onKeyDown={onPanelKeyDown}
        className={[
          'relative z-[1] flex max-h-[min(92vh,720px)] w-full max-w-[420px] flex-col overflow-hidden',
          'rounded-t-2xl bg-white shadow-modal sm:rounded-2xl',
          'border border-border-strong/80',
          'transition-all duration-200 ease-out motion-reduce:transition-none',
          open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0 sm:translate-y-0',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 pb-4 pt-5">
          <div>
            <h2
              id={titleId}
              className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
            >
              Sign in
            </h2>
            <p id={descId} className="mt-1.5 text-sm leading-relaxed text-ink-muted">
              Access your school dashboard
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={[
              '-mr-1 -mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-input',
              'text-ink-muted transition-colors duration-150 ease-out',
              'hover:bg-surface hover:text-ink',
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
          className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-6"
          noValidate
        >
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-faint">
                Email
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((o) => ({ ...o, email: undefined }));
                }}
                className={[
                  'w-full rounded-input border bg-white px-3.5 py-3 text-[15px] text-ink',
                  'placeholder:text-ink-faint/80',
                  'transition-shadow duration-150 ease-out',
                  'focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-ring',
                  errors.email
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                    : 'border-border-strong hover:border-ink/20',
                ].join(' ')}
                placeholder="you@school.edu"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </label>

            <label className="block">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  Password
                </span>
                <a
                  href="#forgot-password"
                  className="text-xs font-semibold text-brand transition-colors hover:text-brand-hover"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((o) => ({ ...o, password: undefined }));
                }}
                className={[
                  'w-full rounded-input border bg-white px-3.5 py-3 text-[15px] text-ink',
                  'placeholder:text-ink-faint/80',
                  'transition-shadow duration-150 ease-out',
                  'focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-ring',
                  errors.password
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                    : 'border-border-strong hover:border-ink/20',
                ].join(' ')}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600" role="alert">
                  {errors.password}
                </p>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={submitting}
              className={[
                'w-full rounded-btn bg-brand py-3.5 text-[15px] font-semibold text-white shadow-btn-primary',
                'transition-all duration-150 ease-out',
                'hover:bg-brand-hover hover:shadow-btn-primary-hover hover:-translate-y-0.5',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                'active:translate-y-0 active:shadow-btn-primary',
                'disabled:pointer-events-none disabled:opacity-60',
                'motion-reduce:hover:translate-y-0',
              ].join(' ')}
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>

            <div className="relative py-1 text-center">
              <span className="relative z-[1] bg-white px-3 text-xs font-medium text-ink-faint">
                or
              </span>
              <div
                className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border-strong"
                aria-hidden
              />
            </div>

            <button
              type="button"
              className={[
                'flex w-full items-center justify-center gap-2 rounded-btn border border-border-strong',
                'bg-white py-3 text-[15px] font-semibold text-ink',
                'transition-all duration-150 ease-out',
                'hover:border-ink/25 hover:bg-surface',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                'active:scale-[0.99] motion-reduce:active:scale-100',
              ].join(' ')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-xs leading-relaxed text-ink-faint">
            By signing in you agree to your school&apos;s data and acceptable-use policies.
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInModal;
