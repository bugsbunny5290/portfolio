"use client";

import { useEffect } from "react";
import { quips } from "@/lib/quips";

declare global {
  interface Window {
    pranav?: {
      hire: string;
      skills: string;
      joke: string;
    };
  }
}

const COOLDOWN_MS = 3000;

// Shuffle bag — exhausts all quips before repeating any, and never repeats across refills
let quipBag: string[] = [];

function shuffleArray(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuip(): string {
  if (quipBag.length === 0) {
    quipBag = shuffleArray(quips);
  }
  return quipBag.pop() as string;
}

async function fetchJoke(): Promise<void> {
  try {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?safe-mode&type=twopart,single",
    );
    const data = await res.json();
    if (data.type === "single") {
      console.log(`%c${data.joke}`, "color: #eab308; font-size: 14px;");
    } else {
      console.log(`%c${data.setup}`, "color: #eab308; font-size: 14px;");
      console.log(`%c${data.delivery}`, "color: #eab308; font-size: 14px; font-weight: bold;");
    }
    const quip = pickQuip();
    console.log(`%c${quip}`, "color: #a8a29e; font-size: 11px; font-style: italic;");
  } catch {
    console.log(
      "%cWhy do programmers prefer dark mode? Because light attracts bugs.",
      "color: #eab308; font-size: 14px;",
    );
    console.log(
      "%c...I'll see myself out.",
      "color: #a8a29e; font-size: 11px; font-style: italic;",
    );
  }
}

export function DevtoolsEasterEggs(): React.ReactElement {
  useEffect(() => {
    console.log(
      `%c
  ____   ____
 |  _ \\ / ___|
 | |_) | |  _
 |  __/| |_| |
 |_|    \\____|
`,
      "color: #4f46e5; font-size: 14px; font-weight: bold;",
    );

    console.log(
      "%cHey, you found the secret terminal! \uD83D\uDC4B",
      "color: #4f46e5; font-size: 16px; font-weight: bold; padding: 8px 0;",
    );

    console.log(
      "%cLike what you see? I built this entire portfolio with Next.js, Tailwind CSS, and a lot of attention to detail.\n\nTry these in the console:\n  pranav.hire     \u2192 Let's work together\n  pranav.skills   \u2192 What I work with\n  pranav.joke     \u2192 Need a laugh?\n\nOr press \u2318K anywhere for the command palette.",
      "color: #78716c; font-size: 12px; line-height: 1.6;",
    );

    // Rate-limit state — scoped to this mount so tests get fresh state per render
    const cooldowns: Record<string, number> = {};
    const inFlight: Record<string, boolean> = {};

    function guardedGetter(
      name: string,
      fn: () => void | Promise<void>,
    ): PropertyDescriptor {
      return {
        get() {
          const now = Date.now();
          if (now - (cooldowns[name] ?? 0) < COOLDOWN_MS) return undefined;
          if (inFlight[name]) return undefined;

          cooldowns[name] = now;

          const result = fn();
          if (result instanceof Promise) {
            inFlight[name] = true;
            result.finally(() => {
              inFlight[name] = false;
            });
          }

          return undefined;
        },
        configurable: true,
        enumerable: true,
      };
    }

    // Use getters so typing `pranav.joke` (without parens) still executes
    const obj = {};
    Object.defineProperties(obj, {
      hire: guardedGetter("hire", () => {
        console.log(
          "%c\uD83D\uDCE7 Redirecting to contact page...",
          "color: #22c55e; font-size: 14px;",
        );
        window.location.href = "/contact";
      }),
      skills: guardedGetter("skills", () => {
        console.log(
          "%c\uD83D\uDEE0 Tech Stack:",
          "color: #4f46e5; font-size: 14px; font-weight: bold;",
        );
        console.table([
          { category: "Cloud", skills: "GCP, Kubernetes, AWS, Firebase" },
          { category: "Backend", skills: "NestJS, Node.js, PostgreSQL, Redis" },
          { category: "Frontend", skills: "Next.js, React, TypeScript, Tailwind" },
          { category: "DevOps", skills: "Pulumi, GitOps, ArgoCD, Docker" },
        ]);
      }),
      joke: guardedGetter("joke", () => {
        return fetchJoke();
      }),
    });
    window.pranav = obj as Window["pranav"];

    return () => {
      delete window.pranav;
    };
  }, []);

  return (
    <>
      <div
        data-message="Hey inspector! \uD83D\uDC40 Try typing pranav.hire in the console."
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <div className="devtools-hint">
        <span>Curious? Press F12</span>
      </div>
    </>
  );
}
