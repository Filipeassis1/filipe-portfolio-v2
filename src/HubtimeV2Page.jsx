import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import "./HubtimeV2Page.css";

const ASSET_ROOT = "/assets/hubtime-v2/";

const processSteps = [
  {
    title: "Requisitos",
    description:
      "Levanto regras de negócio, perfis envolvidos e dados de cada tela. As dúvidas viram perguntas registradas para o PM.",
    image: "process-requirements.png",
    alt: "Ilustração de uma lista de requisitos com itens marcados"
  },
  {
    title: "Alinhamento",
    description:
      "Mapeio fluxos e actions com idealizadores e PM validando caminhos, exceções e regras de acesso antes de partir para a interface.",
    image: "process-alignment.png",
    alt: "Ilustração de um fluxo conectando diferentes participantes"
  },
  {
    title: "Validação",
    description:
      "Valido com idealizadores e PM, depois com devs para garantir viabilidade técnica antes de avançar na interface.",
    image: "process-validation.png",
    alt: "Ilustração de uma lista validada"
  }
];

function Showcase({ src, alt, width, height, className = "", eager = false }) {
  return (
    <figure className={`hubtime-v2__showcase ${className}`.trim()}>
      <img
        src={`${ASSET_ROOT}${src}`}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding={eager ? "sync" : "async"}
      />
    </figure>
  );
}

function VideoCard({ src, poster, label }) {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => {});
  }, [prefersReducedMotion]);

  return (
    <figure className="hubtime-v2__video-card" aria-label={label}>
      <img
        className="hubtime-v2__video-poster"
        src={`${ASSET_ROOT}${poster}`}
        alt=""
        width={592}
        height={500}
        loading="lazy"
        decoding="async"
      />
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src={`${ASSET_ROOT}${src}`}
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}
    </figure>
  );
}

function ProcessCard({ step }) {
  return (
    <article className="hubtime-v2__process-card">
      <Showcase
        src={step.image}
        alt={step.alt}
        width={384}
        height={312}
        className="hubtime-v2__process-visual"
      />
      <div className="hubtime-v2__process-copy">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </article>
  );
}

export default function HubtimeV2Page({ header }) {
  return (
    <main className="hubtime-v2" aria-labelledby="hubtime-v2-title">
      <article className="hubtime-v2__shell">
        {header}

        <div className="hubtime-v2__content">
          <section className="hubtime-v2__opening" aria-labelledby="hubtime-v2-title">
            <div className="hubtime-v2__title-group">
              <h1 id="hubtime-v2-title">De regras de negócio complexas a interfaces claras.</h1>
              <p>UX/UI do HubTime — dos requisitos e primeiras calls à construção de um sistema de gestão em evolução</p>
            </div>

            <Showcase
              src="hero-overview.png"
              alt="Dashboard operacional do HubTime sobre uma composição azul com a marca do produto"
              width={1216}
              height={440}
              eager
            />

            <dl className="hubtime-v2__meta" aria-label="Informações do projeto">
              <div><dt>Papel</dt><dd>UX/UI Design</dd></div>
              <div><dt>Time</dt><dd>Idealizadores, PM e devs</dd></div>
              <div><dt>Período</dt><dd>Outubro 2026 – atual</dd></div>
              <div><dt>Frentes</dt><dd>Fluxos · UI · Design System</dd></div>
              <div><dt>Status</dt><dd>Em desenvolvimento</dd></div>
            </dl>
          </section>

          <section className="hubtime-v2__context" aria-labelledby="hubtime-v2-context">
            <h2 id="hubtime-v2-context">Contexto</h2>
            <p>
              O HubTime é um sistema de gestão para o setor de relógios, usado para acompanhar ordens de serviço, catálogo de relógios, usuários e unidades parceiras. Atuo como designer de UX/UI ao lado dos idealizadores, do PM e dos desenvolvedores — da leitura dos requisitos à entrega das telas e da base visual.
            </p>

            <div className="hubtime-v2__challenge">
              <h3>Conectar diferentes operações em uma experiência coerente.</h3>
              <p>
                Uma mesma ordem de serviço passa por vários status, é vista por perfis diferentes e libera ações distintas para cada um. O desafio é transformar essas regras, somadas a grandes volumes de informação, em telas onde cada perfil encontre rápido o que precisa fazer, mantendo a coerência entre os módulos enquanto o escopo evolui.
              </p>
              <Showcase
                src="challenge-modules.png"
                alt="Interfaces do HubTime em perspectiva, mostrando catálogo de relógios, conversa de uma ordem de serviço e indicadores do dashboard"
                width={1216}
                height={608}
              />
              <p className="hubtime-v2__caption">Visão geral dos módulos: catálogo de relógios, chat da OS e indicadores no dashboard.</p>
            </div>
          </section>

          <section className="hubtime-v2__process-section" aria-labelledby="hubtime-v2-process">
            <h2 id="hubtime-v2-process">Entender as regras antes de desenhar as telas.</h2>
            <p>
              Começo cada módulo em reuniões com os idealizadores e o PM para esclarecer requisitos e discutir os fluxos. O processo se repete em três etapas, e cada uma deixa um registro que orienta a próxima:
            </p>

            <div className="hubtime-v2__process">
              {processSteps.map((step) => <ProcessCard key={step.title} step={step} />)}
            </div>

            <div className="hubtime-v2__evidence">
              <Showcase
                src="process-evidence.png"
                alt="Documento de requisitos funcionais do HubTime e registro de uma reunião de alinhamento"
                width={1216}
                height={400}
              />
              <p>
                Os fluxos e as actions foram desenhados a partir das primeiras calls com os stakeholders e de um documento de requisitos funcionais que cobria tanto a plataforma administrador quanto a do cliente.
              </p>
            </div>
          </section>

          <section className="hubtime-v2__design-code" aria-labelledby="hubtime-v2-design-code">
            <h2 id="hubtime-v2-design-code">Do design ao código</h2>
            <p>
              O processo foi estruturado para que as decisões criadas no Figma não terminassem na interface. A base do Design System evolui em etapas, mantendo consistência entre design, implementação e documentação.
            </p>

            <Showcase
              src="design-system-overview.png"
              alt="Dashboard do HubTime ao lado das coleções de variáveis e tokens do Design System no Figma"
              width={1216}
              height={567}
            />

            <div className="hubtime-v2__split hubtime-v2__split--visual-right">
              <div className="hubtime-v2__split-copy">
                <h3>Tokens</h3>
                <p>
                  Tudo começa pelas fundações. Cores, tipografia, espaçamentos, radius e outros valores são transformados em tokens, criando uma linguagem comum para o produto e reduzindo decisões arbitrárias.
                </p>
              </div>
              <Showcase
                src="tokens.png"
                alt="Documentação das cores primitivas e semânticas do HubTime"
                width={600}
                height={300}
              />
            </div>

            <div className="hubtime-v2__split hubtime-v2__split--visual-left">
              <Showcase
                src="components-cards.png"
                alt="Variações dos cards de dashboard do HubTime no Figma"
                width={596}
                height={400}
              />
              <div className="hubtime-v2__split-copy">
                <h3>Componentes</h3>
                <p>
                  A partir desses tokens, os componentes são construídos no Figma com propriedades, variantes e estados bem definidos. Conforme novas telas surgem, o sistema evolui reutilizando e expandindo essa mesma base.
                </p>
              </div>
            </div>

            <Showcase
              src="components-library.png"
              alt="Biblioteca de componentes do HubTime com variações da navegação lateral e dos botões"
              width={1216}
              height={400}
            />

            <div className="hubtime-v2__split hubtime-v2__split--visual-right">
              <div className="hubtime-v2__split-copy">
                <h3>Do figma ao código</h3>
                <p>
                  Os componentes passam para o front-end preservando a lógica definida no design. Skills e instruções criadas no Claude ajudam a IA a entender os tokens, padrões e componentes existentes antes de implementar novas interfaces.
                </p>
              </div>
              <Showcase
                src="code-example.png"
                alt="Tokens CSS e implementação de um componente de navegação do HubTime no editor de código"
                width={600}
                height={300}
              />
            </div>

            <Showcase
              src="code-skills.png"
              alt="Documentação técnica de componentes e propriedades usada para orientar a implementação"
              width={1216}
              height={567}
            />

            <div className="hubtime-v2__storybook-copy">
              <h3>Storybook</h3>
              <p>
                Por fim, os componentes implementados são organizados e documentados no Storybook, reunindo variantes, estados e regras de uso em uma referência compartilhada entre design e desenvolvimento.
              </p>
            </div>

            <div className="hubtime-v2__video-grid">
              <VideoCard
                src="storybook.mp4"
                poster="storybook-poster.png"
                label="Demonstração em vídeo da documentação de um componente do HubTime no Storybook"
              />
              <VideoCard
                src="dashboard.mp4"
                poster="dashboard-poster.png"
                label="Demonstração em vídeo do dashboard operacional do HubTime"
              />
            </div>
          </section>

          <section className="hubtime-v2__closing" aria-labelledby="hubtime-v2-closing">
            <h2 id="hubtime-v2-closing">Um produto em evolução</h2>
            <p>
              O HubTime ainda está em desenvolvimento. Por isso, este projeto representa menos uma entrega final e mais um processo contínuo de discovery, definição, validação e evolução da experiência.
            </p>
            <p className="hubtime-v2__note">Atualizações em breve</p>
          </section>
        </div>
      </article>
    </main>
  );
}
