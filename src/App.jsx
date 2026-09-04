import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const mainProjects = [
  {
    title: "Lana Automotiva",
    badge: "Website institucional",
    description:
      "Um website construído a partir de pesquisa, UX e estratégia de conteúdo, conectando experiência, SEO e conversão para ampliar a presença digital da Lana.",
    href: "/project.html",
    icon: "/assets/figma-simple-home/lana.svg",
    iconClass: "simple-project__icon--lana",
    width: 16,
    height: 16
  },
  {
    title: "HubTime",
    badge: "Sistema e Design System",
    description:
      "Participação ativa na construção de uma plataforma de gestão, desde reuniões com idealizadores e PM, levantamento de requisitos e definição de fluxos até a criação das interfaces e estruturação do Design System",
    href: "/projects/hubtime.html",
    icon: "/assets/figma-simple-home/icon-mark-navy.svg",
    width: 24,
    height: 24
  }
];

const playgroundProjects = [
  {
    title: "Elev Visual",
    badge: "Landing page",
    description: "Do figma ao código, criação de assets até a implementação do website com IA",
    href: "/projects/elev-visual.html",
    icon: "/assets/figma-simple-home/elev-logo.png",
    iconClass: "simple-project__icon--elev-mark"
  },
  {
    title: "Naura Couto",
    badge: "Páginas e estratégias",
    description:
      "Design, desenvolvimento e estratégia de tráfego conectados para transformar páginas em canais de aquisição e crescimento.",
    href: "/projects/",
    icon: "/assets/figma-simple-home/icon-mark-navy.svg",
    width: 24,
    height: 24
  },
  {
    title: "Luís Nekta",
    badge: "Landing page",
    description:
      "Um website construído a partir de pesquisa, UX e estratégia de conteúdo, conectando experiência, SEO e conversão para ampliar a presença digital da Lana.",
    href: "/projects/",
    icon: "/assets/figma-simple-home/foglamp.png",
    iconClass: "simple-project__icon--dark",
    width: 19,
    height: 10
  }
];

const experiences = [
  {
    title: "UX/UI Designer @ Gabuldev",
    description:
      "Jun 2026 - Atual / Software house. Atuo em múltiplos projetos de clientes, conectando requisitos, pesquisa e criação de interfaces com PMs, idealizadores e desenvolvedores.",
    icon: "/gabuldev-logo.png",
    iconClass: "simple-experience__icon--gabuldev"
  },
  {
    title: "Desenvolvedor Web @ Devsi Tecnologia",
    description:
      "Jan 2025 - Set 2025 / Minas Gerais, Brasil. Criei e evolui interfaces para websites institucionais e landing pages em WordPress, Elementor, HTML e CSS.",
    icon: "/devsi-icon.png",
    iconClass: "simple-experience__icon--devsi"
  },
  {
    title: "Suporte Técnico (Helpdesk) @ Devsi Tecnologia",
    description:
      "Jun 2023 - Jul 2025 / Itabira, MG. Atuei no suporte técnico e infraestrutura de TI, traduzindo problemas complexos em soluções claras para usuários não técnicos.",
    icon: "/devsi-icon.png",
    iconClass: "simple-experience__icon--devsi"
  },
  {
    title: "Designer de Interfaces @ Nektahub",
    description:
      "Jan 2026 - Ago 2026 / Agência de marketing digital. Desenvolvi páginas de venda, artes e fluxos para experts digitais com foco em jornada, identidade e conversão.",
    icon: "/nektahub-logo.png",
    iconClass: "simple-experience__icon--nektahub"
  }
];

const screenColumns = [
  [
    "/assets/elev-visual-case/mockup-8.png",
    "/assets/elev-visual-case/mockup-2.png",
    "/assets/elev-visual-case/mockup-frame.png",
    "/assets/elev-visual-case/mockup-8.png",
    "/assets/elev-visual-case/mockup-2.png"
  ],
  [
    "/assets/elev-visual-case/mockup-frame.png",
    "/assets/elev-visual-case/mockup-8.png",
    "/assets/elev-visual-case/mockup-2.png",
    "/assets/elev-visual-case/mockup-frame.png",
    "/assets/elev-visual-case/mockup-8.png"
  ],
  [
    "/assets/elev-visual-case/mockup-2.png",
    "/assets/elev-visual-case/mockup-frame.png",
    "/assets/elev-visual-case/mockup-8.png",
    "/assets/elev-visual-case/mockup-2.png",
    "/assets/elev-visual-case/mockup-frame.png"
  ]
];

function Shell({ pageClass, children }) {
  useEffect(() => {
    document.body.className = pageClass;
  }, [pageClass]);

  return children;
}

function MetaBar() {
  return (
    <div className="simple-meta-bar" aria-label="Localização e redes sociais">
      <p>
        Belo Horizonte , Minas Gerais <span>/</span> Brasil
      </p>
      <nav aria-label="Redes sociais">
        <a href="#">X</a>
        <span>/</span>
        <a href="#">LinkedIn</a>
        <span>/</span>
        <a href="#">Dribbble</a>
        <span>/</span>
        <a href="#">Instagram</a>
      </nav>
    </div>
  );
}

function ProjectIcon({ project }) {
  if (project.iconClass === "simple-project__icon--elev-mark") {
    return (
      <span className="simple-project__icon simple-project__icon--elev-mark">
        <span className="simple-project__icon-mask">
          <img src={project.icon} alt="" />
        </span>
      </span>
    );
  }

  return (
    <span className={`simple-project__icon ${project.iconClass || ""}`.trim()}>
      <img src={project.icon} alt="" width={project.width} height={project.height} />
    </span>
  );
}

function ProjectCard({ project }) {
  return (
    <a className="simple-project simple-project--detailed" href={project.href}>
      <span className="simple-project__head">
        <ProjectIcon project={project} />
        <span className="simple-project__title">{project.title}</span>
        {project.badge ? <span className="simple-project__badge">{project.badge}</span> : null}
      </span>
      <span className="simple-project__description">{project.description}</span>
    </a>
  );
}

function HomePage() {
  const [activeTab, setActiveTab] = useState("projetos");

  return (
    <Shell pageClass="simple-home-page">
      <main className="simple-home" aria-labelledby="home-title">
        <div className="simple-home__shell">
          <section className="simple-intro" aria-label="Apresentação">
            <div className="simple-intro__masthead">
              <img
                className="simple-avatar"
                src="/assets/figma-simple-home/avatar-photo.png"
                alt="Foto de Filipe Assis"
                width="80"
                height="80"
              />
              <img
                className="simple-team-mark"
                src="/assets/figma-simple-home/cruzeiro.svg"
                alt="Cruzeiro Esporte Clube"
                width="40"
                height="40"
              />
            </div>

            <div className="simple-intro__copy">
              <p className="simple-eyebrow">
                Olá, eu sou <span className="wave-emoji" aria-hidden="true">👋</span>
              </p>
              <h1 id="home-title">Filipe Assis</h1>
              <p className="simple-lede">
                Eu desenho interfaces focadas em clareza, usabilidade e conversão.
              </p>
            </div>

            <div className="simple-actions" aria-label="Ações principais">
              <button
                type="button"
                className="simple-button simple-button--ghost"
                onClick={() => setActiveTab("experiencia")}
              >
                <span>Currículum</span>
                <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path d="M5.75 2.75h5.1l3.4 3.4v11.1h-8.5a2 2 0 0 1-2-2V4.75a2 2 0 0 1 2-2Z" />
                  <path d="M10.75 3v3.25h3.25" />
                  <path d="M7 10.25h6" />
                  <path d="M7 13.25h4.25" />
                </svg>
              </button>
              <a className="simple-button simple-button--primary" href="mailto:hello@studio.com">
                <span>Entre em contato</span>
                <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path d="M5.83 14.17 14.17 5.83" />
                  <path d="M6.67 5.83h7.5v7.5" />
                </svg>
              </a>
            </div>
          </section>

          <MetaBar />

          <hr className="simple-divider" />

          <div className="simple-tabs" role="tablist" aria-label="Seções do portfólio">
            <button
              type="button"
              role="tab"
              id="tab-projetos"
              aria-controls="panel-projetos"
              aria-selected={activeTab === "projetos"}
              className={`simple-tabs__item ${activeTab === "projetos" ? "simple-tabs__item--active" : ""}`.trim()}
              onClick={() => setActiveTab("projetos")}
            >
              Projetos
            </button>
            <button
              type="button"
              role="tab"
              id="tab-experiencia"
              aria-controls="panel-experiencia"
              aria-selected={activeTab === "experiencia"}
              className={`simple-tabs__item ${activeTab === "experiencia" ? "simple-tabs__item--active" : ""}`.trim()}
              onClick={() => setActiveTab("experiencia")}
            >
              Experiência
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={false}
              aria-disabled="true"
              disabled
              className="simple-tabs__item simple-tabs__item--disabled"
            >
              Educação
            </button>
          </div>

          {activeTab === "projetos" ? (
            <section
              id="panel-projetos"
              className="simple-section"
              role="tabpanel"
              aria-labelledby="tab-projetos"
            >
              <div className="simple-project-list">
                {mainProjects.map((project, projectIndex) => (
                  <ProjectCard project={project} key={`${project.title}-${project.href}-${projectIndex}`} />
                ))}
              </div>

              <hr className="simple-divider" />

              <div className="simple-project-list">
                <p className="simple-project-group-label">Playground</p>
                {playgroundProjects.map((project, projectIndex) => (
                  <ProjectCard project={project} key={`${project.title}-${project.href}-${projectIndex}`} />
                ))}
              </div>
            </section>
          ) : (
            <section
              id="panel-experiencia"
              className="simple-section simple-section--experience"
              role="tabpanel"
              aria-labelledby="tab-experiencia"
            >
              <div className="simple-project-list simple-experience-list">
                {experiences.map((experience) => (
                  <article className="simple-project simple-experience" key={experience.title}>
                    <span className={`simple-project__icon simple-experience__icon ${experience.iconClass}`}>
                      <img src={experience.icon} alt="" width="12" height="12" />
                    </span>
                    <span className="simple-project__content">
                      <span className="simple-project__title">{experience.title}</span>
                      <span className="simple-project__description">{experience.description}</span>
                    </span>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </Shell>
  );
}

function ScreenColumn({ direction, images, y }) {
  return (
    <motion.div
      className={`elev-scroll-showcase__column elev-scroll-showcase__column--${direction}`}
      style={{ y }}
    >
      {images.map((src, imageIndex) => (
        <img
          src={src}
          alt=""
          width={imageIndex % 3 === 1 ? 232 : 364}
          height={imageIndex % 3 === 1 ? 574 : 667}
          key={`${src}-${imageIndex}`}
        />
      ))}
    </motion.div>
  );
}

function ElevScreensShowcase() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const firstColumnY = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const secondColumnY = useTransform(scrollYProgress, [0, 1], [-240, 240]);
  const thirdColumnY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <figure ref={ref} className="elev-scroll-showcase" aria-label="Telas mobile do website Elev Visual em movimento">
      <div className="elev-scroll-showcase__stage">
        <ScreenColumn images={screenColumns[0]} direction="up" y={prefersReducedMotion ? 0 : firstColumnY} />
        <ScreenColumn images={screenColumns[1]} direction="down" y={prefersReducedMotion ? 0 : secondColumnY} />
        <ScreenColumn images={screenColumns[2]} direction="up" y={prefersReducedMotion ? 0 : thirdColumnY} />
      </div>
    </figure>
  );
}

function ProjectLpFrame() {
  return (
    <figure className="elev-case__media elev-case__media--site elev-project-frame">
      <img
        className="elev-project-frame__image"
        src="/assets/elev-visual-case/project-frame-figma.png"
        alt="Frame do Figma com board de nodes conectados e landing page da Elev Visual"
        width="1322"
        height="665"
      />
    </figure>
  );
}

function CaseHeader({ current }) {
  return (
    <header className="case-header">
      <a className="case-header__brand" href="/" aria-label="Voltar para o início">
        <img
          className="case-header__avatar"
          src="/assets/figma-simple-home/avatar-photo.png"
          alt=""
          width="80"
          height="80"
        />
        <span className="case-header__name">Filipe Assis</span>
      </a>
      <nav className="case-header__breadcrumbs" aria-label="Breadcrumb">
        <a className="case-header__crumb" href="/">
          <img src="/assets/case-header/icon-home.svg" alt="" width="16" height="16" />
          Home
        </a>
        <img className="case-header__separator" src="/assets/case-header/icon-separator.svg" alt="" width="12" height="12" />
        <span className="case-header__crumb case-header__crumb--current" aria-current="page">
          {current}
        </span>
      </nav>
    </header>
  );
}

function ElevVisualPage() {
  return (
    <Shell pageClass="elev-case-page">
      <main className="elev-case" aria-labelledby="case-title">
        <article className="elev-case__shell">
          <CaseHeader current="Elev Visual" />

          <header className="elev-case__hero">
            <h1 id="case-title">ELEV VISUAL</h1>
            <figure className="elev-case__cover">
              <img
                src="/assets/elev-visual-case/hero.png"
                alt="Mockup do website da Elev Visual em um monitor sobre formas geométricas azul e laranja"
                width="656"
                height="451"
              />
            </figure>

            <dl className="elev-case__meta" aria-label="Informações do projeto">
              <div>
                <dt>Papel</dt>
                <dd>UX Designer - solo</dd>
              </div>
              <div>
                <dt>Ferramentas</dt>
                <dd>Figma · Claude · Magnific</dd>
              </div>
              <div>
                <dt>Entregáveis</dt>
                <dd>IA · Wireframes · DS · Copy</dd>
              </div>
            </dl>

            <p className="elev-case__lead">
              Projeto desenvolvido de ponta a ponta, passando por definição visual, criação de assets, tokens, componentes e construção do website final. A IA foi utilizada como ferramenta de apoio em diferentes etapas, acelerando exploração, produção visual e implementação.
            </p>
          </header>

          <section className="elev-case__section" aria-labelledby="project-section-title">
            <h2 id="project-section-title">O projeto</h2>
            <p>
              A ELEV precisava de uma presença digital capaz de comunicar seus serviços de forma clara, profissional e consistente. O projeto começou pela definição da linguagem visual e evoluiu até a construção de uma interface completa, responsiva e pronta para produção.
            </p>
          </section>

          <ProjectLpFrame />

          <section className="elev-case__section">
            <p>
              A inteligência artificial foi incorporada como uma camada do processo de criação. Ela apoiou desde exploração visual e geração de assets criados no <strong>Magnific</strong> até refinamentos de conteúdo, definição de padrões e aceleração de etapas de desenvolvimento.
            </p>
          </section>

          <section className="elev-case__section" aria-labelledby="foundations-title">
            <h2 id="foundations-title">Foundations</h2>
            <figure className="elev-case__media elev-case__media--foundation">
              <img
                src="/assets/elev-visual-case/foundations-figma.png"
                alt="Frame de foundations da Elev Visual com tokens de cor, componentes, setas e documentação"
                width="624"
                height="337"
              />
            </figure>
            <p>
              Antes de expandir o website, organizei decisões recorrentes em foundations e componentes reutilizáveis. Isso permitiu manter consistência visual ao longo das páginas e tornou novas iterações mais rápidas.
            </p>
            <p>
              O projeto não terminou no Figma. A interface foi implementada, usando o MCP do <strong>Figma</strong> e o <strong>Claude Code</strong>, ajustada para diferentes dispositivos e publicada em ambiente de produção, fechando o ciclo entre conceito, design e entrega.
            </p>
            <p>
              Essa seção é muito importante para deixar claro que o projeto vai além de UI.
            </p>
          </section>

          <ElevScreensShowcase />

          <section className="elev-case__section">
            <p>
              A ELEV foi um exercício de construção de ponta a ponta. O projeto me permitiu combinar direção visual, UI, estruturação de componentes, ferramentas de IA e desenvolvimento em um único workflow, buscando reduzir a distância entre uma ideia e um produto publicado.
            </p>
          </section>

          <footer className="elev-case__live">
            <p>Projeto no ar</p>
            <a href="https://elevvisual.com.br/">https://elevvisual.com.br/</a>
          </footer>
        </article>
      </main>
    </Shell>
  );
}

function HubtimePage() {
  return (
    <Shell pageClass="elev-case-page">
      <main className="elev-case" aria-labelledby="hubtime-title">
        <article className="elev-case__shell">
          <CaseHeader current="HubTime" />

          <header className="elev-case__hero">
            <h1 id="hubtime-title">HUBTIME</h1>
            <figure className="elev-case__cover">
              <img
                src="/assets/hubtime-case/hero.png"
                alt="Macro de um relógio mecânico com engrenagens douradas à mostra"
                width="656"
                height="451"
              />
            </figure>

            <dl className="elev-case__meta" aria-label="Informações do projeto">
              <div>
                <dt>Papel</dt>
                <dd>UX/UI Design</dd>
              </div>
              <div>
                <dt>Ferramentas</dt>
                <dd>Figma · Claude</dd>
              </div>
              <div>
                <dt>Entregáveis</dt>
                <dd>Telas · Design System</dd>
              </div>
            </dl>
          </header>

          <section className="elev-case__section" aria-labelledby="hubtime-project-title">
            <h2 id="hubtime-project-title">O projeto</h2>
            <p>
              Um sistema de gestão em construção a partir de requisitos reais de negócio, alinhamentos com idealizadores, PM e desenvolvedores, definição de fluxos e criação de interfaces para um sistema complexo e em constante evolução. Voltada para operações, ordens de serviço, usuários, permissões e acompanhamento de unidades parceiras. O desafio está em transformar regras de negócio, diferentes perfis e grandes volumes de informação em experiências claras, consistentes e fáceis de utilizar.
            </p>
            <div className="hubtime-case__duo">
              <img
                src="/assets/hubtime-case/projeto-login.png"
                alt="Tela de login do HubTime ao lado de uma foto de uma colaboradora trabalhando"
                width="320"
                height="333"
              />
              <img
                src="/assets/hubtime-case/projeto-dashboard.png"
                alt="Fluxos de cadastro e edição de usuário mapeados sobre fundo verde e azul"
                width="320"
                height="333"
              />
            </div>
          </section>

          <section className="elev-case__section" aria-labelledby="hubtime-interface-title">
            <h2 id="hubtime-interface-title">Do requisito à interface</h2>
            <p>
              Minha atuação começa antes da construção das telas. Participo de reuniões com os idealizadores do produto e com o PM para compreender requisitos, esclarecer regras e discutir os fluxos antes de transformá-los em soluções de interface.
            </p>
            <div className="hubtime-case__cards">
              <img src="/assets/hubtime-case/card-requisitos.png" alt="Requisitos" width="208" height="167" />
              <img src="/assets/hubtime-case/card-alinhamento.png" alt="Alinhamento" width="208" height="167" />
              <img src="/assets/hubtime-case/card-validacao.png" alt="Validação" width="208" height="167" />
            </div>
            <figure className="elev-case__media hubtime-case__media--wide">
              <img
                src="/assets/hubtime-case/mobile-flow.png"
                alt="Telas do HubTime sobrepostas em perspectiva mostrando listagem de relógios e métricas"
                width="656"
                height="332"
              />
            </figure>
            <p>
              Cada tela parte de uma necessidade real do sistema. Mais do que organizar componentes visualmente, o trabalho envolve entender prioridades, estados, exceções e relações entre diferentes partes do produto.
            </p>
          </section>

          <section className="elev-case__section" aria-labelledby="hubtime-foundations-title">
            <h2 id="hubtime-foundations-title">Foundations</h2>
            <figure className="elev-case__media hubtime-case__media--wide">
              <img
                src="/assets/hubtime-case/foundations-colors.png"
                alt="Escalas de cor Zinc, Navy Blue e Gold e tabela de cores semânticas do Design System do HubTime"
                width="656"
                height="332"
              />
            </figure>
            <p>
              Com o crescimento do produto, decisões recorrentes começaram a formar uma base visual consistente. Tokens de cor, tipografia, espaçamentos e demais foundations ajudam a manter coerência entre diferentes módulos e interfaces.
            </p>
            <p>
              Em vez de criar componentes isolados, o sistema nasce das necessidades reais do produto.
            </p>
            <figure className="elev-case__media hubtime-case__media--wide">
              <img
                src="/assets/hubtime-case/foundations-dashboard.png"
                alt="Dashboard do HubTime com métricas de relógios cadastrados e menu lateral da marca"
                width="656"
                height="332"
              />
            </figure>
            <p>
              Essa estrutura reduz decisões repetitivas, melhora a consistência entre telas e cria uma linguagem comum entre design e desenvolvimento. Próximos passos é passar todos os nossos componentes, após finalizado, para o storybook e documentar.
            </p>
          </section>

          <section className="elev-case__section" aria-labelledby="hubtime-evolution-title">
            <h2 id="hubtime-evolution-title">Um produto em evolução</h2>
            <p>
              O HubTime ainda está em desenvolvimento. Por isso, este projeto representa menos uma entrega final e mais um processo contínuo de discovery, definição, validação e evolução da experiência.
            </p>
            <p className="hubtime-case__note">Atualizações em breve</p>
          </section>
        </article>
      </main>
    </Shell>
  );
}

export default function App() {
  if (window.location.pathname.includes("/projects/elev-visual")) {
    return <ElevVisualPage />;
  }

  if (window.location.pathname.includes("/projects/hubtime")) {
    return <HubtimePage />;
  }

  return <HomePage />;
}
