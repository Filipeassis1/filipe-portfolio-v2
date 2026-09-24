import { useEffect, useRef, useState } from "react";
import { RevealItem } from "./Reveal.jsx";

// Figma 481:13272. Each exported screen is a portfolio image, not a live UI.
const screens = [
  { name: "assistant", alt: "Assistente de voz — busca em andamento", width: 208, height: 418.9503479 },
  { name: "lana-404", alt: "Lana Automotiva — página não encontrada", width: 508, height: 317.5 },
  { name: "hubtime-order", alt: "HubTime — nova ordem de serviço e cadastro de cliente", width: 508, height: 395.1111145 },
  { name: "grape", alt: "Grape — gestão de mesas", width: 208, height: 450.1333618 },
  { name: "curls", alt: "Loja de cosméticos — cuidados para cachos", width: 508, height: 513.5856323 },
  { name: "payment", alt: "Assistente de compras — pagamento aprovado e acompanhamento da entrega", width: 208, height: 433.0666809 }
];

export default function PlaygroundMarquee() {
  const viewport = useRef(null);
  const [copies, setCopies] = useState(3);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      // 2228px of artwork + the 16px gap at the seam. Cover wide displays too.
      setCopies(Math.ceil(entry.contentRect.width / 2244) + 2);
    });
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealItem as="section" className="playground-marquee" aria-label="Telas de trabalhos em destaque">
      <div className="playground-marquee__viewport" ref={viewport} aria-label="Galeria de telas">
        <div className="playground-marquee__track">
          {Array.from({ length: copies }, (_, copy) => (
            <div className="playground-marquee__group" key={copy} aria-hidden={copy > 0 ? true : undefined}>
              {screens.map((screen) => (
                <img
                  key={screen.name}
                  src={`/assets/playground-marquee/${screen.name}.png`}
                  alt={copy === 0 ? screen.alt : ""}
                  width={screen.width}
                  height={screen.height}
                  style={{ width: screen.width, height: screen.height }}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </RevealItem>
  );
}
