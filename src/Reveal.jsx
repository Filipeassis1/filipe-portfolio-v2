import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";
import { animate, inView, motion, useReducedMotion } from "framer-motion";
import { curtainDelay } from "./PageCurtain.jsx";

const STEP = 0.07;
const DURATION = 0.7;
const EASE = [0.16, 1, 0.3, 1];
const OFFSET = 16;
// Items that enter view together right after a group mounts cascade in tree order;
// items scrolled into view later animate immediately.
const BURST_WINDOW_MS = 400;
const MARGIN = "0px 0px -10% 0px";
const viewport = { once: true, margin: MARGIN };

const GroupContext = createContext(null);

// Touch layouts keep content visible without waiting for viewport observers.
function useImmediateContent() {
  const [immediate, setImmediate] = useState(() => window.matchMedia("(max-width: 760px), (hover: none)").matches);
  useLayoutEffect(() => {
    const query = window.matchMedia("(max-width: 760px), (hover: none)");
    const sync = () => setImmediate(query.matches);
    query.addEventListener("change", sync);
    sync();
    return () => query.removeEventListener("change", sync);
  }, []);
  return immediate;
}

export function RevealGroup({ children }) {
  const [group] = useState(() => ({ mountedAt: performance.now(), count: 0 }));
  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>;
}

const variants = {
  hidden: { opacity: 0, y: OFFSET },
  visible: ({ group, indexRef }) => {
    const inBurst = group && performance.now() - group.mountedAt < BURST_WINDOW_MS;
    return {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION,
        ease: EASE,
        delay: curtainDelay() + (inBurst ? indexRef.current * STEP : 0)
      }
    };
  }
};

// Static content: reveals every element matching `selector` under the returned ref.
export function useRevealScope(selector) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const immediate = useImmediateContent();

  useLayoutEffect(() => {
    if (reduced || immediate || !ref.current) return undefined;
    const mountedAt = performance.now();
    let burst = 0;
    const items = [...ref.current.querySelectorAll(selector)];
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = `translateY(${OFFSET}px)`;
    });
    const stops = items.map((el) => {
      const stop = inView(
        el,
        () => {
          stop();
          const inBurst = performance.now() - mountedAt < BURST_WINDOW_MS;
          animate(
            el,
            { opacity: [0, 1], y: [OFFSET, 0] },
            { duration: DURATION, ease: EASE, delay: curtainDelay() + (inBurst ? burst++ * STEP : 0) }
          );
        },
        { margin: MARGIN }
      );
      return stop;
    });
    return () => {
      stops.forEach((stop) => stop());
      items.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    };
  }, [selector, reduced, immediate]);

  return ref;
}

export function RevealItem({ as = "div", children, ...props }) {
  const group = useContext(GroupContext);
  const indexRef = useRef(0);
  const reduced = useReducedMotion();
  const immediate = useImmediateContent();
  const Component = motion[as];

  useLayoutEffect(() => {
    if (!group) return undefined;
    indexRef.current = group.count++;
    return () => {
      group.count--;
    };
  }, [group]);

  if (immediate || reduced) {
    const Tag = as;
    return <Tag {...props}>{children}</Tag>;
  }

  return (
    <Component
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      custom={{ group, indexRef }}
      {...props}
    >
      {children}
    </Component>
  );
}
