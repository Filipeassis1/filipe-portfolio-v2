import { useEffect, useId, useRef } from "react";

const assets = "/assets/avatar/";
const IDLE_INTENSITY = 1.15;
const IDLE_SPEED = 1.15;
// Coordinates from Figma 475:13260, on the same 1162 × 1354 canvas as the base.
const eyes = [
  { side: "left", x: 410, y: 498, maskX: 385, maskY: 537, width: 154, height: 106 },
  { side: "right", x: 670, y: 494, maskX: 643, maskY: 527, width: 159, height: 116 },
];

export default function CartoonAvatar({ className = "simple-avatar" }) {
  const canvasRef = useRef(null);
  const pupilsRef = useRef([]);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    let frame = 0;
    let position = null;
    let inViewport = true;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      position = null;
      pupilsRef.current.forEach((pupil) => pupil?.removeAttribute("transform"));
    };
    const render = () => {
      frame = 0;
      if (!position || !canvasRef.current) return;
      const bounds = canvasRef.current.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      eyes.forEach((eye, index) => {
        const centerX = bounds.left + ((eye.x + 52) / 1162) * bounds.width;
        const centerY = bounds.top + ((eye.y + 52) / 1354) * bounds.height;
        const dx = (position.x - centerX) / (bounds.width * 2);
        const dy = (position.y - centerY) / (bounds.width * 2);
        const limit = Math.max(1, Math.hypot(dx, dy));
        pupilsRef.current[index]?.setAttribute("transform", `translate(${25 * dx / limit} ${25 * dy / limit})`);
      });
    };
    const schedule = () => {
      if (position && !frame) frame = requestAnimationFrame(render);
    };
    const move = (event) => {
      if (!inViewport || motion.matches || !pointer.matches || event.pointerType !== "mouse") return;
      position = { x: event.clientX, y: event.clientY };
      schedule();
    };

    // Devices without a precise hover pointer (touch/mobile) get a gentle
    // randomized "idle glance" instead of following the mouse.
    let idleFrame = 0;
    let idleTimer = 0;
    let idleTarget = { x: 0, y: 0 };
    const idleCurrent = { x: 0, y: 0 };
    let lastTick = 0;

    const idleTick = (now) => {
      idleFrame = 0;
      const elapsed = lastTick ? Math.min(now - lastTick, 64) : 1000 / 60;
      lastTick = now;
      const blend = 1 - Math.pow(1 - 0.06, elapsed / (1000 / 60) * IDLE_SPEED);
      idleCurrent.x += (idleTarget.x - idleCurrent.x) * blend;
      idleCurrent.y += (idleTarget.y - idleCurrent.y) * blend;
      const limit = Math.max(1, Math.hypot(idleCurrent.x, idleCurrent.y));
      pupilsRef.current.forEach((pupil) => {
        pupil?.setAttribute("transform", `translate(${25 * IDLE_INTENSITY * idleCurrent.x / limit} ${25 * IDLE_INTENSITY * idleCurrent.y / limit})`);
      });
      if (Math.hypot(idleTarget.x - idleCurrent.x, idleTarget.y - idleCurrent.y) > 0.001) {
        idleFrame = requestAnimationFrame(idleTick);
      }
    };
    const pickIdleTarget = () => {
      if (Math.random() < 0.25) {
        idleTarget = { x: 0, y: 0 };
      } else {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.3 + Math.random() * 0.7;
        idleTarget = { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.6 };
      }
      if (!idleFrame) {
        lastTick = 0;
        idleFrame = requestAnimationFrame(idleTick);
      }
      idleTimer = window.setTimeout(pickIdleTarget, (900 + Math.random() * 2200) / IDLE_SPEED);
    };
    const stopIdle = () => {
      cancelAnimationFrame(idleFrame);
      idleFrame = 0;
      window.clearTimeout(idleTimer);
      idleTimer = 0;
    };
    const startIdle = () => {
      if (idleTimer || document.hidden || !inViewport || motion.matches || pointer.matches) return;
      idleCurrent.x = 0;
      idleCurrent.y = 0;
      pickIdleTarget();
    };
    const syncMode = () => {
      reset();
      stopIdle();
      startIdle();
    };
    const onVisibility = () => {
      reset();
      if (document.hidden) stopIdle();
      else startIdle();
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", syncMode);
    pointer.addEventListener("change", syncMode);

    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport) startIdle();
      else { reset(); stopIdle(); }
    });
    observer.observe(canvasRef.current);
    startIdle();

    return () => {
      reset();
      stopIdle();
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", syncMode);
      pointer.removeEventListener("change", syncMode);
    };
  }, []);

  return (
    <span className={`${className} cartoon-avatar`} role="img" aria-label="Avatar em cartoon de Filipe Assis">
      <svg ref={canvasRef} className="cartoon-avatar__canvas" viewBox="0 0 1162 1354" aria-hidden="true">
        <defs>
          {eyes.map((eye) => (
            <mask key={eye.side} id={`${id}-${eye.side}`} maskUnits="userSpaceOnUse" x={eye.maskX} y={eye.maskY} width={eye.width} height={eye.height} style={{ maskType: "alpha" }}>
              <image href={`${assets}eye-${eye.side}-mask.svg`} x={eye.maskX} y={eye.maskY} width={eye.width} height={eye.height} />
            </mask>
          ))}
        </defs>
        <image href={`${assets}base.webp`} width="1162" height="1354" />
        {eyes.map((eye, index) => (
          <g key={eye.side} mask={`url(#${id}-${eye.side})`}>
            <g ref={(node) => { pupilsRef.current[index] = node; }}>
              <image href={`${assets}pupil.svg`} x={eye.x} y={eye.y} width="104" height="104" />
            </g>
          </g>
        ))}
      </svg>
    </span>
  );
}
