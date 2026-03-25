/**
 * Cypher hero demo — step machine: one message OR thinking at a time (no overlap).
 * Tailwind. Same sequence as index.html.
 */

import { useEffect, useRef, useState } from "react";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type Step =
  | { kind: "msg"; role: "student" | "cypher"; text: string }
  | { kind: "think" }
  | { kind: "pause"; ms: number }
  | { kind: "restart" };

const STEPS: Step[] = [
  { kind: "msg", role: "student", text: "What is the water cycle?" },
  { kind: "think" },
  {
    kind: "msg",
    role: "cypher",
    text: "Before I explain — what do you think happens when water is heated?",
  },
  { kind: "pause", ms: 700 },
  { kind: "msg", role: "student", text: "It turns into vapour — like steam?" },
  { kind: "think" },
  {
    kind: "msg",
    role: "cypher",
    text: "Good reasoning. Where might that vapour go next — and what could it become when it cools?",
  },
  { kind: "pause", ms: 750 },
  { kind: "restart" },
];

const STATIC_PREVIEW =
  "Good reasoning. Where might that vapour go next — and what could it become when it cools?";

export function CypherHeroDemo() {
  const cancel = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [role, setRole] = useState<"student" | "cypher">("student");
  const [line, setLine] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [showThink, setShowThink] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [loopFade, setLoopFade] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      return;
    }

    cancel.current = false;

    async function typeWriter(full: string, ms: number) {
      setLine("");
      for (let i = 0; i <= full.length; i++) {
        if (cancel.current) return;
        setLine(full.slice(0, i));
        if (i < full.length) await sleep(ms);
      }
    }

    async function hideBubble() {
      setPhase("out");
      await sleep(280);
      setShowBubble(false);
      setLine("");
      setPhase("in");
    }

    async function showMessage(r: "student" | "cypher", text: string) {
      setRole(r);
      setShowBubble(true);
      setPhase("in");
      await sleep(40);
      setShowCursor(true);
      await typeWriter(text, r === "student" ? 34 : 32);
      setShowCursor(false);
      await sleep(620);
      await hideBubble();
    }

    async function thinking() {
      setShowThink(true);
      await sleep(1500);
      setShowThink(false);
    }

    async function run() {
      while (!cancel.current) {
        for (const step of STEPS) {
          if (cancel.current) return;
          if (step.kind === "msg") await showMessage(step.role, step.text);
          else if (step.kind === "think") await thinking();
          else if (step.kind === "pause") await sleep(step.ms);
          else if (step.kind === "restart") {
            setLoopFade(true);
            await sleep(480);
            setShowThink(false);
            setShowBubble(false);
            setLine("");
            setLoopFade(false);
            await sleep(400);
            break;
          }
        }
      }
    }

    run();
    return () => {
      cancel.current = true;
    };
  }, []);

  if (reduced) {
    return (
      <div className="flex min-h-[5.5rem] flex-col gap-3 overflow-hidden">
        <div className="ml-4 rounded-2xl border border-pink-100 bg-pink-50/80 p-3 shadow-sm">
          <span className="mb-1 block text-[9.5px] font-bold uppercase tracking-wide text-neutral-400">
            Cypher
          </span>
          <p className="text-sm leading-relaxed text-neutral-600">{STATIC_PREVIEW}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-[6.5rem] flex-col gap-3 overflow-hidden transition duration-500 ease-out ${
        loopFade ? "translate-y-2 opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex min-h-[5.25rem] flex-col justify-start">
        {showBubble && (
          <div
            className={`rounded-2xl border p-3 shadow-sm transition duration-300 ease-out ${
              phase === "out" ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
            } ${
              role === "student"
                ? "mr-6 border-black/5 bg-white/90"
                : "ml-4 border-pink-100 bg-pink-50/80"
            }`}
          >
            <span className="mb-1 block text-[9.5px] font-bold uppercase tracking-wide text-neutral-400">
              {role === "student" ? "Student" : "Cypher"}
            </span>
            <p
              className={`text-sm leading-relaxed ${
                role === "student" ? "text-neutral-800" : "text-neutral-600"
              }`}
            >
              {line}
              {showCursor && (
                <span className="ml-0.5 inline-block animate-pulse font-light text-pink-600">|</span>
              )}
            </p>
          </div>
        )}
      </div>

      {showThink && (
        <div className="ml-4 flex items-center gap-2 rounded-2xl border border-dashed border-pink-200/60 bg-white/70 px-3.5 py-2.5 text-xs font-medium text-neutral-600">
          <span>Cypher is thinking</span>
          <span className="flex gap-0.5 font-bold text-pink-600">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </div>
      )}
    </div>
  );
}
