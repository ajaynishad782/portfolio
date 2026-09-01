"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Theme is stored in one external system: the `.dark` class on <html> (set
 * pre-paint by the inline script in layout.tsx). We read and mutate it directly
 * and drive re-renders with useSyncExternalStore — no setState-in-effect and no
 * hydration flash.
 */
const listeners = new Set<() => void>();

// While the visitor hasn't made a manual choice, follow the OS setting live.
let mql: MediaQueryList | null = null;
function handleSystemChange(e: MediaQueryListEvent) {
  let hasChoice = false;
  try {
    hasChoice = localStorage.getItem("theme") !== null;
  } catch {
    /* ignore */
  }
  if (hasChoice) return;
  document.documentElement.classList.toggle("dark", e.matches);
  listeners.forEach((cb) => cb());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!mql) {
    mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", handleSystemChange);
  }
  return () => listeners.delete(cb);
}

function isDarkNow() {
  return document.documentElement.classList.contains("dark");
}

function setTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    /* ignore storage errors (e.g. private mode) */
  }
  listeners.forEach((cb) => cb());
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, isDarkNow, () => true);
  // Distinguish server render (default) from client so the icon matches reality.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <button
      type="button"
      onClick={() => setTheme(!isDark)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="border-border text-foreground/80 hover:bg-foreground/5 hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
    >
      {mounted && !isDark ? (
        <Sun className="h-4.5 w-4.5" aria-hidden="true" />
      ) : (
        <Moon className="h-4.5 w-4.5" aria-hidden="true" />
      )}
    </button>
  );
}
