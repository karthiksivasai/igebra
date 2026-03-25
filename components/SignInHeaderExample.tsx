'use client';

import { useState } from 'react';
import { SignInModal } from './SignInModal';

/**
 * Drop-in pattern: keep modal state next to your header (or lift to a small auth context).
 */
export function SignInHeaderExample() {
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[100] flex h-[82px] items-center justify-between border-b border-border bg-surface/90 px-6 backdrop-blur-md">
        <a href="/" className="font-display text-lg font-bold text-ink">
          AI Ready School
        </a>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setSignInOpen(true)}
            className={[
              'rounded-btn border border-border-strong px-[18px] py-2 text-[13.5px] font-semibold text-ink',
              'transition-colors duration-150 hover:bg-black/[0.04]',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              'active:scale-[0.98]',
            ].join(' ')}
          >
            Sign in
          </button>
          <a
            href="#demo"
            className={[
              'rounded-btn bg-brand px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-btn-primary',
              'transition-all duration-150 hover:bg-brand-hover hover:shadow-btn-primary-hover hover:-translate-y-px',
            ].join(' ')}
          >
            Book a Free Demo →
          </a>
        </div>
      </header>

      <SignInModal
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSubmit={async ({ email }) => {
          // Replace with your API / Supabase / Clerk / etc.
          console.info('Sign in', email);
          await new Promise((r) => setTimeout(r, 600));
        }}
      />
    </>
  );
}

export default SignInHeaderExample;
