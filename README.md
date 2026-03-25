# AI Ready School — Homepage Redesign

**Original site:** [aireadyschool.com](https://www.aireadyschool.com)  
**This repo:** Single `index.html` (HTML, CSS, vanilla JS). Open it in a browser or serve the project root to preview.

---

## Summary

**Problems identified**

- Too many nav paths and overlapping labels, so busy principals never got a single clear line: products → proof → next step.
- The hero described an “ecosystem” in the abstract instead of showing *how* students and teachers actually experience the product and its safeguards.
- Five SKUs looked equally important, so scanning didn’t build a mental model of the stack.
- Trust signals and a concrete “how we get started” story were easy to miss, which weakens committee-ready conversations.

**What I prioritized**

- **Hero and nav** — Tighter navigation, one products dropdown, headline focused on the school outcome, and an interactive preview (Socratic-style dialogue, “thinking” state, school-control messaging).
- **Product story** — Featured student row plus a scannable grid with clear role-oriented labels; sign-in and unified demo/lead modal on key CTAs (form validates in-browser; ready to wire to an endpoint).

**What I’d do next with more time**

- Dedicated page per product (use cases, safety, integrations) and short case studies principals can reuse internally.
- Mobile-first hero (the two-column demo is constrained on small breakpoints today).
- Backend for lead capture (CRM/email/API), analytics on demo engagement, and a full accessibility/contrast pass.
