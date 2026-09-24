import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "framer-motion";

const TRANSITION_KEY = "page-transition";
const INTRO_KEY = "intro-played";
const WIPE = { duration: 0.8, ease: [0.87, 0, 0.13, 1] };
const EXIT = { duration: 0.6, ease: [0.87, 0, 0.13, 1] };
const LINE_IN = { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: stagger(0.08) };
const LINE_OUT = { duration: 0.45, ease: [0.7, 0, 0.84, 0], delay: stagger(0.05) };
const HOLD_MS = 700;
const INTRO_MS = 2800;
// Reveals may start slightly before the wipe ends: the top of the page is uncovered last.
const REVEAL_LEAD_MS = 250;

let uncoveredAt = 0;
let busy = false;
let sequenceStarted = false;

export function curtainDelay() {
  return Math.max(0, (uncoveredAt - performance.now()) / 1000);
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readMode() {
  if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px), (hover: none)").matches) return "idle";
  return document.documentElement.dataset.curtain || "idle";
}

function internalDestination(anchor, event) {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return null;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname && url.search === window.location.search) return null;
  return url;
}

export default function PageCurtain() {
  const [mode] = useState(readMode);
  const curtainRef = useRef(null);

  useEffect(() => {
    const curtain = curtainRef.current;

    const settle = async () => {
      if (mode === "intro") {
        try {
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch (error) {}
        uncoveredAt = performance.now() + INTRO_MS - REVEAL_LEAD_MS;
        await Promise.race([document.fonts.ready, wait(400)]);
        await animate(".page-curtain__line", { y: ["110%", "0%"] }, LINE_IN);
        await wait(HOLD_MS);
        await animate(".page-curtain__line", { y: ["0%", "-110%"] }, LINE_OUT);
      } else {
        uncoveredAt = performance.now() + WIPE.duration * 1000 - REVEAL_LEAD_MS;
      }
      await animate(curtain, { y: ["0%", "-100%"] }, WIPE);
      curtain.style.transform = "translateY(100%)";
      busy = false;
    };

    try {
      sessionStorage.removeItem(TRANSITION_KEY);
    } catch (error) {}
    delete document.documentElement.dataset.curtain;

    if (mode !== "idle" && !sequenceStarted) {
      sequenceStarted = true;
      busy = true;
      settle();
    }

    const onClick = (event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px), (hover: none)").matches) return;
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;
      const url = internalDestination(anchor, event);
      if (!url) return;
      event.preventDefault();
      if (busy) return;
      busy = true;
      try {
        sessionStorage.setItem(TRANSITION_KEY, "1");
      } catch (error) {}
      animate(curtain, { y: ["100%", "0%"] }, EXIT).then(() => {
        window.location.href = url.href;
      });
    };

    const onPageShow = (event) => {
      if (!event.persisted) return;
      busy = false;
      curtain.style.transform = "translateY(100%)";
    };

    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [mode]);

  return (
    <div
      className="page-curtain"
      aria-hidden="true"
      ref={curtainRef}
      style={{ transform: mode === "idle" ? "translateY(100%)" : "translateY(0)" }}
    >
      {mode === "intro" && (
        <div className="page-curtain__text">
          <span className="page-curtain__mask">
            <span className="page-curtain__line page-curtain__line--eyebrow" style={{ transform: "translateY(110%)" }}>
              Olá, eu sou
            </span>
          </span>
          <span className="page-curtain__mask">
            <span className="page-curtain__line page-curtain__line--name" style={{ transform: "translateY(110%)" }}>
              Filipe Assis
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
