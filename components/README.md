# Sign-in modal (React + Tailwind)

`SignInModal.tsx` is a controlled dialog that matches the static homepage tokens: **DM Sans**, **#e91e63** primary, **#faf6f8** surface, soft borders, ~16px radii.

## Setup

1. **Tailwind** — merge `tailwind.preset.cjs` into `theme.extend` (see file header), or copy the `extend` object into your `tailwind.config.js`.

2. **Fonts** — load DM Sans + Playfair (same as `index.html`):

   ```html
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
   ```

3. **Usage**

   ```tsx
   import { useState } from 'react';
   import { SignInModal } from './components/SignInModal';

   export function App() {
     const [open, setOpen] = useState(false);
     return (
       <>
         <button type="button" onClick={() => setOpen(true)}>Sign in</button>
         <SignInModal
           open={open}
           onClose={() => setOpen(false)}
           onSubmit={async ({ email, password }) => {
             // your auth
           }}
         />
       </>
     );
   }
   ```

4. **Next.js App Router** — mark the parent as `'use client'` if it holds `useState`, or keep modal in a client wrapper. See `SignInHeaderExample.tsx`.

## Behaviour

- Body scroll lock while open  
- **Escape** and **backdrop** close  
- Basic email/password validation + error text  
- Focus moves to email when opened  
- `motion-reduce:` variants for accessibility  

The live marketing site (`index.html`) is vanilla JS; wire this component when you move the page to React (Vite, Next, etc.).
