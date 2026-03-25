# AI Ready School — Homepage Redesign

**Original:** [aireadyschool.com](https://www.aireadyschool.com)  
**Stack:** HTML · CSS · Vanilla JS (single file — fast to ship and review)

**Preview:** Open `index.html` in the browser, or serve the project root with any static file server if you want `http://` URLs.

---

## 1. Overview

The goal was to refocus the homepage for **school principals and academic heads** who evaluate AI in K-12 under time pressure: they need to grasp *what* you sell, *why* it’s different, and *why it’s safe for students*—without wading through dense navigation or abstract positioning.

This redesign treats the page as a **decision brief**, not a brochure: fewer choices up front, a hero that demonstrates product behaviour, and a visual system aligned with the brand mark so the experience feels intentional, not template-driven.

---

## 2. Key Problems Identified (Audit)

**Navigation overload**  
The live site exposes a very wide surface area (many top-level and nested paths, overlapping labels like “AI for Schools” vs “Our AI Platform,” weak wayfinding). Busy buyers don’t get a single obvious path: *products → proof → next step*.

**Hero didn’t show the product working**  
The headline described an “ecosystem” in the abstract; the primary story wasn’t *how* students and teachers actually experience AI. For a sceptical principal, “AI for schools” reads as risk until they see **moderation, pedagogy, and interaction style** implied in the UI.

**Weak product hierarchy**  
Five offerings appeared with similar weight. There was no clear “start here” (student companion vs infra vs labs), so scanning didn’t build a mental model of the stack.

**Social proof and stats felt disconnected**  
Trust signals existed but weren’t staged for *early* reassurance or paired with scannable structure (e.g. stats competing with the hero story instead of supporting it).

**No concrete “how we get started” story**  
Implementation time, onboarding steps, and de-risking language were easy to miss. That slows **committee-ready** conversations: principals need language they can repeat in a staff meeting.

---

## 3. Key Improvements Made

- **Simplified navigation** — Reduced to a small set of primary links plus a **single products dropdown** listing all five SKUs with short descriptors; **Sign in** and **Book a Demo** stay visible. Less paralysis, clearer funnel.

- **Lead / demo CTA (vanilla JS)** — All primary “Book a Free Demo” and related links use **`data-cta`** attributes. A single **`#cta-modal`** captures name, school, email, phone, interest, and message; copy and defaults vary by source (`header-demo`, `hero-demo`, `steps-cta`, `faq-30`, `bottom-cta`). Submit currently **validates client-side** and logs a payload to the console (ready to swap for an API or form endpoint). **Escape**, backdrop, and close button dismiss the modal; opening it closes the mobile nav if it is open.

- **Hero rebuilt around outcomes and demonstration** — Headline leads with the school-level outcome (*ready for the AI era*), supporting line names the five-product scope in one sentence, and CTAs are immediate. The right column is a **Cypher “live preview”**: a typed, looping dialogue that shows **question-first (Socratic) interaction**, visible **“thinking”** state, **school-control** messaging (moderation, exam-answer policy, teacher visibility themes), and **session reassurance**—so visitors *see* responsible AI, not only read claims.

- **Interactive Cypher demo (vanilla JS)** — Stacked thread, paced typing, non-scrollable preview panel with **auto-scroll-to-latest** behaviour, **sticky “School controls”** strip, and loop replay. Tuned for **readability** (slower character timing and pauses) so principals can actually follow the exchange.

- **Clearer product section** — **Cypher featured full-width** on a distinct band; remaining products in a **scannable grid** with product logos and tags so roles (student / teacher / school / lab / infra) parse quickly.

- **Visual hierarchy and spacing** — Editorial type (Playfair + DM Sans), **logo-led palette** (plum structure, magenta CTAs, blush surfaces, gold accents) so the UI and the mark read as one family—not a generic SaaS theme.

- **Stats repositioned** — Key numbers moved **below the hero** so the demo card stays the focal point; stats still land early on the page without crowding the value prop.

- **Structured proof and journey** — Testimonials as **cards** with ratings; **marquee of school names** after the hero; **“How it works”** step strip with a concrete **~6-week** timeline to answer “what happens if we say yes?”

- **FAQ sidebar CTA** — Replaced decorative emoji with a **small branded icon**; kept the “Still have questions?” card as a clean conversion anchor next to accordion FAQs.

- **Footer** — Same **AI Ready School logo** as the header for consistent brand closure.

---

## 4. Impact of Changes

**User clarity** — Fewer nav destinations and a hero that *shows* Cypher’s behaviour reduce the cognitive load to answer: “What am I buying, and how does it treat my students?” The product grid + dropdown make the **five-SKU story** legible in one pass.

**Engagement** — Motion in the hero is **purposeful** (dialogue + thinking state), not decorative. It invites a few extra seconds of attention—the window where a principal decides to scroll or bounce.

**Trust (critical for schools)** — Inline copy in the demo surfaces **moderation, exam-answer blocking, teacher-level themes, student privacy by default**, and anonymized session messaging. That maps directly to **safeguarding and governance** questions committees ask.

**Decision-making speed** — Clear CTAs, a visible **implementation timeline**, and FAQ + call booking sidecar shorten the path from “interesting” to **book a call** or **assessment**. Principals carry fewer unanswered objections into the first sales conversation.

---

## 5. What I Prioritized

In roughly **4–5 hours**, effort went to **highest leverage** above the fold and on the critical path to conversion:

1. **Hero** — Messaging, layout, and the interactive Cypher preview.  
2. **Navigation** — Cut noise; expose products once, clearly.  
3. **Product clarity** — Featured Cypher + structured grid + logo identity per product.

Deeper page types, motion systems, and full responsive polish were consciously deferred so these three could ship at quality.

---

## 6. What I Would Improve Next

1. **Dedicated product pages** — One URL per SKU with use cases, integrations, and safety detail so marketing depth doesn’t live only on the homepage.  
2. **Case studies and named outcomes** — Short “school + problem + rollout + quote” modules with metrics principals can cite internally.  
3. **Mobile hero** — Purpose-built small-screen layout (the two-column demo is hidden on narrow breakpoints today); alternate stack, shorter copy variants, and touch-tuned demo pacing.  
4. **CTA backend** — POST leads to CRM, email, or serverless function; optional success state inside the modal instead of only `console.info`.

---

## File Structure

```
/
├── index.html      ← Live redesign: HTML, CSS, vanilla JS (sign-in + CTA modals, Cypher demo)
├── assets/         ← Logos and product marks
├── components/     ← React reference implementations (not bundled into index.html)
│   ├── cta/        ← CTA modal/button hooks if you migrate to React
│   ├── SignInModal.tsx
│   └── …
├── reference/      ← Additional reference (e.g. Cypher hero in TSX)
└── README.md
```

For production: component framework (e.g. Astro/Next), split CSS, image optimisation, analytics on demo engagement and CTA submissions, and a full accessibility/contrast pass on dark bands.
