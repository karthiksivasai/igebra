# Hero redesign — UX notes

## Task 1 — Interactive Cypher demo

**Shipped in `index.html` (vanilla JS):** a two-turn conversation with character-by-character typing, a **“Cypher is thinking”** beat between each pair (not an instant answer), then a Socratic follow-up. The sequence **loops** with a short fade so principals see the behaviour repeatedly without reloading.

**React + Tailwind reference:** `reference/CypherHeroDemo.tsx` — same script and timing pattern using `useEffect`, `setState`, and `sleep()` (no extra libraries). Wire it into a Vite + React + Tailwind app when you migrate off the single-file build.

**Reduced motion:** if `prefers-reduced-motion: reduce`, the full dialogue is shown statically (no typing loop).

## Task 2 — Stat cards vs focus (Option A)

**Choice: Option A** — remove floating stat cards from the hero column and **place them directly under the hero**, before the marquee.

**Why**

- The hero’s job is **value proposition + proof of product behaviour**. Floating metrics competed for attention and overlapped the demo.
- Moving stats **below** preserves credibility (numbers still appear “above the fold” on many viewports) but **after** the eye has locked onto the headline and Cypher preview.
- **Lower visual weight:** flat row, shared container, no overlap — clearer hierarchy than “badges on top of the UI mock”.

Options B/C are valid for other brands; here **A** best matches the brief’s emphasis on the **non-chatbot** story.

## Task 3 — Principles applied

- One dominant focal card; stats are secondary and **sequential**, not parallel ornaments.
- Copy under the chips clarifies **live preview** vs production configuration.
- Motion is **purposeful** (typing = human pace, thinking = not a chatbot slap-back).
