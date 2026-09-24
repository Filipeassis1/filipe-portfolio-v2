import { useEffect, useId, useRef } from "react";

const assets = "/assets/avatar/";
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
      if (motion.matches || !pointer.matches || event.pointerType !== "mouse") return;
      position = { x: event.clientX, y: event.clientY };
      schedule();
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", reset);
    motion.addEventListener("change", reset);
    pointer.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", reset);
      motion.removeEventListener("change", reset);
      pointer.removeEventListener("change", reset);
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
        <image href={`${assets}base.png`} width="1162" height="1354" />
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
