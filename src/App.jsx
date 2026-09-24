import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CartoonAvatar from "./CartoonAvatar.jsx";
import ContentCard from "./ContentCard.jsx";

const mainProjects = [
  {
    title: "Lana Automotiva",
    metadata: "Design System · UI Design · Alinhamentos com Stakeholders",
    description:
      "Um website construído a partir de pesquisa, UX e estratégia de conteúdo, conectando experiência, SEO e conversão para ampliar a presença digital da Lana.",
    href: "/project.html",
    icon: "/assets/content-card/lana.svg",
    iconClass: "simple-project__icon--lana",
    width: 16,
    height: 16
  },
  {
    title: "HubTime",
    metadata: "Design System · UI Design · Alinhamentos com Stakeholders · IA",
    description:
      "Participação ativa na construção de uma plataforma de gestão, desde reuniões com idealizadores e PM, levantamento de requisitos e definição de fluxos até a criação das interfaces e estruturação do Design System",
    href: "/projects/hubtime.html",
    icon: "/assets/content-card/hubtime.png",
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
    href: "/projects/naura-couto.html",
    icon: "/assets/figma-simple-home/icon-mark-navy.svg",
    width: 24,
    height: 24
  }
];

const experiences = [
  {
    title: "UX/UI Designer @ Gabuldev",
    metadata: "Jun 2026 - Atual",
    description:
      "Software house. Atuo em múltiplos projetos de clientes, conectando requisitos, pesquisa e criação de interfaces com PMs, idealizadores e desenvolvedores.",
    icon: "/assets/content-card/gabuldev.svg",
    iconClass: "simple-experience__icon--gabuldev"
  },
  {
    title: "Desenvolvedor Web @ Devsi Tecnologia",
    metadata: "Jan 2025 - Set 2025",
    description:
      "Minas Gerais, Brasil. Criei e evolui interfaces para websites institucionais e landing pages em WordPress, Elementor, HTML e CSS.",
    icon: "/assets/content-card/devsi.svg",
    iconClass: "simple-experience__icon--devsi"
  },
  {
    title: "Suporte Técnico (Helpdesk) @ Devsi Tecnologia",
    metadata: "Jun 2023 - Jul 2025",
    description:
      "Itabira, MG. Atuei no suporte técnico e infraestrutura de TI, traduzindo problemas complexos em soluções claras para usuários não técnicos.",
    icon: "/assets/content-card/devsi.svg",
    iconClass: "simple-experience__icon--devsi"
  },
  {
    title: "Designer de Interfaces @ Nektahub",
    metadata: "Jan 2026 - Ago 2026",
    description:
      "Agência de marketing digital. Desenvolvi páginas de venda, artes e fluxos para experts digitais com foco em jornada, identidade e conversão.",
    icon: "/assets/content-card/nekta.svg",
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

const lanaDecisionCards = [
  {
    eyebrow: "Pesquisa e intenção",
    title: "Benchmark competitivo",
    metric: "9",
    metricLabel: "padrões mapeados",
    body: "Mapear como concorrentes estruturam confiança, catálogo e serviços."
  },
  {
    eyebrow: "Redesign das páginas",
    title: "User stories",
    metric: "3",
    metricLabel: "jornadas centrais",
    body: "Transformar busca por peças, pneus e serviços em caminhos claros."
  },
  {
    eyebrow: "Redesign de busca local",
    title: "Palavras-chave",
    metric: "750+",
    metricLabel: "termos avaliados",
    body: "Conectar intenção de procura com arquitetura, conteúdo e SEO."
  },
  {
    eyebrow: "Redesign de sitemap",
    title: "Arquitetura da informação",
    metric: "15+",
    metricLabel: "páginas previstas",
    body: "Separar serviços, produtos e contexto local para facilitar evolução."
  }
];

const lanaArchitectureItems = [
  "Páginas de serviço com foco transacional, proposta de valor e dúvidas frequentes.",
  "Páginas locais para cobrir buscas geográficas com contexto real da empresa.",
  "Hub de conteúdo para guias, cuidados e comparativos úteis ao cliente.",
  "Camada de autoridade com cases, avaliações, equipe e diferenciais da operação."
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

function ProjectCard({ project }) {
  return <ContentCard {...project} metadata={project.metadata || project.badge} />;
}

const education = [
  {
    title: "UI Design e Product Design @ Design Boost",
    description: "Formação voltada para processo de produto, UI Design, experiência do usuário, design systems, estratégia e construção de portfólio.",
    metadata: "Em andamento · 2026",
    icon: "/assets/content-card/boost.svg"
  },
  {
    title: "User Experience @ FIAP",
    description: "Estudos sobre fundamentos de UX, comportamento dos usuários, pesquisa, arquitetura da informação e criação de experiências digitais.",
    metadata: "Curso livre · 2023",
    icon: "/assets/content-card/fiap.svg"
  },
  {
    title: "Análise e Desenvolvimento de Sistemas @ UNINTER",
    description: "Formação em tecnologia com estudos em desenvolvimento de software, interfaces, banco de dados, lógica de programação e arquitetura de sistemas.",
    metadata: "2023–2025 · Em curso (em pausa)",
    icon: "/assets/content-card/uninter.png"
  }
];

function HomePage() {
  const [activeTab, setActiveTab] = useState("projetos");

  return (
    <Shell pageClass="simple-home-page">
      <main className="simple-home" aria-labelledby="home-title">
        <div className="simple-home__shell">
          <section className="simple-intro" aria-label="Apresentação">
            <div className="simple-intro__masthead">
              <CartoonAvatar />
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
              id="tab-educacao"
              aria-controls="panel-educacao"
              aria-selected={activeTab === "educacao"}
              className={`simple-tabs__item ${activeTab === "educacao" ? "simple-tabs__item--active" : ""}`.trim()}
              onClick={() => setActiveTab("educacao")}
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
              id={`panel-${activeTab}`}
              className="simple-section simple-section--experience"
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
            >
              <div className="simple-project-list simple-experience-list">
                {(activeTab === "experiencia" ? experiences : education).map((item) => (
                  <ContentCard {...item} key={item.title} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </Shell>
  );
}

const nauraMobileScreens = [
  { src: "/assets/naura-couto-case/mobile-1.png", width: 210, height: 450 },
  { src: "/assets/naura-couto-case/mobile-2.png", width: 1134, height: 1562 },
  { src: "/assets/naura-couto-case/mobile-3.png", width: 1144, height: 1558 },
  { src: "/assets/naura-couto-case/mobile-4.png", width: 1146, height: 1554 },
  { src: "/assets/naura-couto-case/mobile-5.png", width: 1136, height: 1560 }
];
const nauraScreenColumns = [
  [4, 2, 3, 4, 2],
  [0, 1, 0, 1, 0],
  [3, 2, 1, 3, 2]
].map((indices) => indices.map((index) => nauraMobileScreens[index]));

function ScreenColumn({ direction, images, y }) {
  return (
    <motion.div
      className={`elev-scroll-showcase__column elev-scroll-showcase__column--${direction}`}
      style={{ y }}
    >
      {images.map((src, imageIndex) => (
        <img
          src={typeof src === "string" ? src : src.src}
          alt=""
          width={typeof src === "string" ? (imageIndex % 3 === 1 ? 232 : 364) : src.width}
          height={typeof src === "string" ? (imageIndex % 3 === 1 ? 574 : 667) : src.height}
          key={`${typeof src === "string" ? src : src.src}-${imageIndex}`}
        />
      ))}
    </motion.div>
  );
}

function ElevScreensShowcase({ columns = screenColumns, label = "Telas mobile do website Elev Visual em movimento" }) {
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
    <figure ref={ref} className="elev-scroll-showcase" aria-label={label}>
      <div className="elev-scroll-showcase__stage">
        <ScreenColumn images={columns[0]} direction="up" y={prefersReducedMotion ? 0 : firstColumnY} />
        <ScreenColumn images={columns[1]} direction="down" y={prefersReducedMotion ? 0 : secondColumnY} />
        <ScreenColumn images={columns[2]} direction="up" y={prefersReducedMotion ? 0 : thirdColumnY} />
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
        <CartoonAvatar className="case-header__avatar" />
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

function LanaSiteHeader() {
  return (
    <header className="lana-mini-site__header">
      <strong>LANA</strong>
      <nav aria-hidden="true">
        <span>Autopeças</span>
        <span>Pneus</span>
        <span>Serviços</span>
      </nav>
      <button type="button">Contato</button>
    </header>
  );
}

const lanaCurrentServices = [
  {
    title: "Pneus",
    description: "Diversas marcas, melhor preço e instalação rápida para você rodar com tranquilidade.",
    action: "Comprar Pneus",
    image: "/assets/lana-case/service-tires.png"
  },
  {
    title: "Autopeças",
    description: "Suspensão, freios, ignição, motor, lubrificantes e muito mais.",
    action: "Consultar Peça",
    image: "/assets/lana-case/service-parts.png"
  },
  {
    title: "Serviços",
    description: "Troca de óleo, alinhamento e revisões com agilidade para você não perder tempo.",
    action: "Agendar Serviço",
    image: "/assets/lana-case/service-workshop.png"
  }
];

function LanaPreviewAction({ children, secondary = false }) {
  return (
    <span className={`lana-current-site__action${secondary ? " lana-current-site__action--secondary" : ""}`}>
      {children}
      <i aria-hidden="true">↗</i>
    </span>
  );
}

function LanaCurrentDesktopPage({ style }) {
  return (
    <motion.div className="lana-current-site lana-current-site--desktop" style={style}>
      <header className="lana-current-site__header">
        <div className="lana-current-site__address">Av. Ver. Osório Sampaio, 378 · Vila Santa Rosa, Itabira · MG</div>
        <div className="lana-current-site__nav">
          <img src="/assets/lana-case/logo.svg" alt="Lana Automotiva" />
          <nav aria-hidden="true">
            <span>Sobre</span>
            <span>Pneus</span>
            <span>Serviços⌄</span>
            <span>Parceiros</span>
          </nav>
          <LanaPreviewAction>Chamar no whatsapp</LanaPreviewAction>
        </div>
      </header>

      <section className="lana-current-site__hero">
        <div className="lana-current-site__hero-copy">
          <div className="lana-current-site__certified">
            <span>CERTIFICADA</span>
            <img src="/assets/lana-case/bosch-certified.png" alt="Bosch Car Service" />
          </div>
          <h3>Autopeças, Pneus e Serviços automotivos em Itabira</h3>
          <p>
            A Lana Soluções Automotivas é especialista em autopeças em Itabira - MG, oferecendo peças de qualidade,
            manutenção automotiva e atendimento de confiança para garantir segurança e desempenho para o seu veículo.
          </p>
          <div className="lana-current-site__hero-actions" aria-hidden="true">
            <LanaPreviewAction>Falar com a Autopeças</LanaPreviewAction>
            <LanaPreviewAction secondary>Agendar serviço</LanaPreviewAction>
          </div>
        </div>
        <img className="lana-current-site__hero-photo" src="/assets/lana-case/hero-mechanic.png" alt="Especialista da Lana em uma loja de autopeças" />
        <span className="lana-current-site__hero-badge" aria-hidden="true">
          <img src="/assets/lana-case/hero-badge-ring.svg" alt="" />
          <img src="/assets/lana-case/hero-badge-mark.svg" alt="" />
        </span>
      </section>

      <section className="lana-current-site__service-row" aria-label="Serviços da Lana">
        {lanaCurrentServices.map((service) => (
          <article key={service.title}>
            <img src={service.image} alt="" />
            <div>
              <strong>{service.title}</strong>
              <p>{service.description}</p>
              <LanaPreviewAction secondary>{service.action}</LanaPreviewAction>
            </div>
          </article>
        ))}
      </section>
    </motion.div>
  );
}

function LanaCurrentSecondaryPage({ style }) {
  return (
    <motion.div className="lana-current-site lana-current-site--secondary" style={style} aria-hidden="true">
      <section className="lana-current-site__catalog">
        {["Lubrificantes e Óleos", "Filtros e Componentes", "Acessórios Automotivos"].map((item, index) => (
          <article key={item}>
            <img src={lanaCurrentServices[index].image} alt="" />
            <strong>{item}</strong>
            <p>Soluções automotivas para proteger, manter e melhorar o desempenho do seu veículo.</p>
          </article>
        ))}
      </section>
      <LanaPreviewAction>Ver mais especialidades</LanaPreviewAction>
      <section className="lana-current-site__partners">
        <h3>Seja um parceiro da <span>Lana Automotiva</span></h3>
        <p>
          Queremos crescer juntos oferecendo autopeças de qualidade, atendimento especializado e soluções para veículos.
        </p>
        <div>
          <article>
            <img src="/assets/lana-case/partner-careers.png" alt="Colaborador da Lana no atendimento" />
            <strong>Trabalhe conosco</strong>
          </article>
          <article>
            <img src="/assets/lana-case/partner-workshop.png" alt="Parceiro da Lana em sua oficina" />
            <strong>Seja uma oficina parceira</strong>
          </article>
        </div>
      </section>
    </motion.div>
  );
}

function LanaWebsitePreview({ variant = "current" }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const pageY = useTransform(scrollYProgress, [0, 1], variant === "current" ? [0, -118] : [34, -156]);
  const cardY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const currentDesktopY = useTransform(scrollYProgress, [0, 1], [8, -108]);
  const currentSecondaryY = useTransform(scrollYProgress, [0, 1], [-520, -682]);

  if (variant === "current") {
    return (
      <figure ref={ref} className="lana-browser-frame lana-browser-frame--current" aria-label="Preview animada do site atual da Lana">
        <div className="lana-browser-frame__viewport lana-browser-frame__viewport--current">
          <LanaCurrentDesktopPage style={{ y: prefersReducedMotion ? 0 : currentDesktopY }} />
          <LanaCurrentSecondaryPage style={{ y: prefersReducedMotion ? -590 : currentSecondaryY }} />
        </div>
      </figure>
    );
  }

  return (
    <figure
      ref={ref}
      className={`lana-browser-frame lana-browser-frame--${variant}`}
      aria-label={variant === "current" ? "Preview do site atual da Lana" : "Preview da proposta de redesign da Lana"}
    >
      <div className="lana-browser-frame__bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="lana-browser-frame__viewport">
        <motion.div className="lana-mini-site" style={{ y: prefersReducedMotion ? 0 : pageY }}>
          <LanaSiteHeader />
          <section className="lana-mini-site__hero">
            <div>
              <span className="lana-mini-site__certified">Certificada Bosch Car Service</span>
              <h3>Autopeças, pneus e serviços automotivos em Itabira</h3>
              <p>
                Uma experiência pensada para transformar busca local em contato qualificado, com hierarquia,
                confiança e caminho claro para conversão.
              </p>
              <div className="lana-mini-site__actions" aria-hidden="true">
                <span>Comprar pneus</span>
                <span>Agendar serviço</span>
              </div>
            </div>
            <motion.aside
              className="lana-mini-site__mechanic"
              style={{ y: prefersReducedMotion ? 0 : cardY }}
              aria-hidden="true"
            >
              <span />
              <strong>+18 mil</strong>
              <small>peças em estoque</small>
            </motion.aside>
          </section>
          <section className="lana-mini-site__services" aria-hidden="true">
            {["Pneus", "Autopeças", "Serviços"].map((service) => (
              <article key={service}>
                <span />
                <strong>{service}</strong>
                <p>Oferta clara, prova e chamada para ação.</p>
              </article>
            ))}
          </section>
          <section className="lana-mini-site__stats" aria-hidden="true">
            <strong>+30</strong>
            <span>Anos de experiência</span>
            <strong>100%</strong>
            <span>foco em agilidade</span>
          </section>
          <section className="lana-mini-site__content" aria-hidden="true">
            <h4>Serviços em destaque</h4>
            <div>
              <span />
              <span />
              <span />
            </div>
          </section>
        </motion.div>
      </div>
    </figure>
  );
}

function LanaAuditPanel() {
  return (
    <figure className="lana-audit-panel" aria-label="Evidências de auditoria do site atual">
      <LanaWebsitePreview variant="current" />
      <figcaption>Imagem do site atual, feita para apoiar as necessidades técnicas de conversão, UX e SEO.</figcaption>
      <div className="lana-metrics-grid" aria-label="Métricas iniciais">
        <article>
          <span>Audiência</span>
          <strong>530</strong>
          <small>usuários ativos</small>
        </article>
        <article>
          <span>Busca orgânica</span>
          <strong>214</strong>
          <small>sessões</small>
        </article>
        <article>
          <span>Interações</span>
          <strong>3000+</strong>
          <small>eventos registrados</small>
        </article>
      </div>
      <table className="lana-keyword-table" aria-label="Amostra de oportunidades de busca">
        <thead>
          <tr>
            <th>Termo</th>
            <th>Vol.</th>
            <th>Intenção</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["peças bosch", "480", "Comercial"],
            ["auto peças itabira", "390", "Local"],
            ["pneu itabira", "260", "Transacional"],
            ["oficina bosch", "170", "Confiança"]
          ].map(([term, volume, intent]) => (
            <tr key={term}>
              <td>{term}</td>
              <td>{volume}</td>
              <td>{intent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function LanaArchitectureShowcase() {
  return (
    <figure className="lana-architecture" aria-label="Arquitetura de conteúdo proposta para o redesign">
      <div className="lana-architecture__map">
        <span>Homepage</span>
        <span>Serviços</span>
        <span>Pneus</span>
        <span>Autopeças</span>
        <span>Conteúdo</span>
        <span>Contato</span>
      </div>
      <ol>
        {lanaArchitectureItems.map((item, index) => (
          <li key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function LanaResultProjection() {
  return (
    <section className="lana-result-projection" aria-label="Projeção de resultados">
      <article>
        <span>Site atual</span>
        <strong>Busca pouco estruturada</strong>
        <p>Presença digital com pontos de contato, mas sem arquitetura clara para capturar demanda.</p>
      </article>
      <article>
        <span>Cenário projetado</span>
        <strong>Autoridade local</strong>
        <p>Arquitetura capaz de conectar procura, confiança e conversão.</p>
      </article>
    </section>
  );
}

function LanaGrowthSystem() {
  return (
    <figure className="lana-growth-system" aria-label="Sistema visual e operacional do redesign">
      <div className="lana-token-strip" aria-hidden="true">
        {["#0f45ff", "#075985", "#082f49", "#16a34a", "#dc2626"].map((color) => (
          <span style={{ background: color }} key={color} />
        ))}
      </div>
      <LanaWebsitePreview variant="redesign" />
      <div className="lana-components-slab" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </figure>
  );
}

function LanaPage() {
  return (
    <Shell pageClass="elev-case-page lana-case-page">
      <main className="elev-case lana-case" aria-labelledby="lana-title">
        <article className="elev-case__shell">
          <CaseHeader current="Lana Automotiva" />
          <header className="elev-case__hero">
            <h1 id="lana-title">LANA AUTOMOTIVA</h1>
            <figure className="lana-case__image">
              <img src="/assets/lana-case/cover.png" alt="Composição das novas páginas da Lana Automotiva" width="656" height="410" />
            </figure>
            <dl className="elev-case__meta" aria-label="Informações do projeto">
              <div><dt>Papel</dt><dd>Estratégia · UX/UI</dd></div>
              <div><dt>Frentes</dt><dd>Performance · SEO · GEO</dd></div>
              <div><dt>Status</dt><dd>Em desenvolvimento</dd></div>
            </dl>
          </header>
          <section className="elev-case__section" aria-labelledby="lana-project-title">
            <h2 id="lana-project-title">O projeto</h2>
            <p>O projeto nasceu para transformar campanhas de Google Ads em oportunidades para a marca. Após lançar uma primeira versão do site, usei dados de busca e desempenho das campanhas para orientar a arquitetura e o conteúdo da versão definitiva.</p>
          </section>
          <hr className="lana-case__divider" />
          <section className="elev-case__section" aria-labelledby="lana-start-title">
            <h2 id="lana-start-title">O ponto de partida</h2>
            <p>A primeira versão do site foi criada para colocar as campanhas de Google Ads em operação e gerar uma base real de comportamento. Em vez de ser tratada como descarte, ela se tornou uma etapa de validação: colocou mensagens, serviços e caminhos de conversão diante de usuários reais antes do investimento na estrutura definitiva.</p>
          </section>
          <figure className="lana-case__evidence lana-case__evidence--analytics">
            <div className="lana-case__analytics-crop">
              <img src="/assets/lana-case/analytics.png" alt="Relatório do GA4 com os canais de aquisição de tráfego da Lana" />
            </div>
            <figcaption>Imagem do GA4 da LANA.</figcaption>
          </figure>
          <section className="lana-case__baseline" aria-label="Dados do site atual">
            <dl className="lana-case__metrics">
              <div><dt>Audiência</dt><dd>530</dd><span>usuários únicos</span></div>
              <div><dt>Busca orgânica</dt><dd>219</dd><span>sessões</span></div>
              <div><dt>Interações</dt><dd>3000+</dd><span>eventos registrados</span></div>
            </dl>
            <p className="lana-case__caption">Fonte: Google Analytics 4. Período analisado: 25 de junho - 22 de setembro.</p>
          </section>
          <p className="lana-case__highlight">O projeto evoluiu a partir de evidências. Analytics e mídia mostraram o comportamento; a pesquisa assistida por IA ampliou o diagnóstico e traduziu os achados em prioridades de conteúdo, arquitetura e produto.</p>
          <figure className="lana-case__evidence lana-case__evidence--research">
            <div className="lana-case__research-images">
              <img src="/assets/lana-case/keywords.png" alt="Pesquisa de palavras-chave e volumes de busca para o setor automotivo" width="568" height="199" />
              <img src="/assets/lana-case/competitors.png" alt="Análise de concorrentes e categorias de páginas em falta" width="568" height="199" />
            </div>
            <figcaption>Pesquisa de palavras-chave e análise de concorrentes com Claude Code e Firecrawl.</figcaption>
          </figure>
          <figure className="lana-case__image lana-case__first-site">
            <img src="/assets/lana-case/first-website.png" alt="Primeira versão do site da Lana, com autopeças, pneus e serviços automotivos" width="656" height="300" />
            <figcaption>Primeira versão do site, criada para atender às campanhas de Google Ads. Mesmo sem foco inicial em SEO, gerou vendas e atraiu buscas orgânicas.</figcaption>
          </figure>
          <hr className="lana-case__divider" />
        </article>
      </main>
    </Shell>
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

const hubtimeProcessCards = [
  {
    title: "Requisitos",
    asset: "/assets/hubtime-case/card-requisitos-figma.svg",
    width: 207,
    height: 167
  },
  {
    title: "Alinhamento",
    artAsset: "/assets/hubtime-case/asset-alinhamento.svg",
    width: 208,
    height: 167,
    artWidth: 129.423,
    artHeight: 92,
    centerOffset: 0.5
  },
  {
    title: "Validação",
    artAsset: "/assets/hubtime-case/asset-validacao.svg",
    width: 208,
    height: 167,
    artWidth: 135.093,
    artHeight: 81.224
  }
];

function HubtimeProcessIcon({ type }) {
  if (type === "alignment") {
    return (
      <svg viewBox="0 0 148 76" aria-hidden="true" focusable="false">
        <path className="hubtime-process-icon__line" d="M31 27h30m26 0h30" />
        <path className="hubtime-process-icon__node hubtime-process-icon__node--dark" d="M31 27a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
        <path className="hubtime-process-icon__node hubtime-process-icon__node--blue" d="m74 15 12 12-12 12-12-12 12-12Z" />
        <rect className="hubtime-process-icon__node hubtime-process-icon__node--gold" x="122" y="18" width="16" height="18" rx="3" />
        <path className="hubtime-process-icon__bubble" d="M61 0h31a5 5 0 0 1 5 5v13a5 5 0 0 1-5 5H61a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5Z" />
        <path className="hubtime-process-icon__dot" d="M66 12h3m7 0h3m7 0h3" />
        <path className="hubtime-process-icon__person" d="M26 66a10 10 0 1 0-20 0h20Zm-10-13a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm68 13a10 10 0 1 0-20 0h20Zm-10-13a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm68 13a10 10 0 1 0-20 0h20Zm-10-13a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
      </svg>
    );
  }

  if (type === "validation") {
    return (
      <svg viewBox="0 0 148 76" aria-hidden="true" focusable="false">
        <rect className="hubtime-process-icon__panel" x="10" y="6" width="90" height="54" rx="5" />
        <path className="hubtime-process-icon__dot" d="M20 17h3m7 0h3m7 0h3" />
        <rect className="hubtime-process-icon__surface" x="20" y="28" width="32" height="36" rx="3" />
        <path className="hubtime-process-icon__line" d="M60 31h26M60 43h20M60 55h16" />
        <rect className="hubtime-process-icon__tag" x="60" y="62" width="23" height="8" rx="4" />
        <rect className="hubtime-process-icon__small-card" x="86" y="38" width="52" height="28" rx="6" />
        <path className="hubtime-process-icon__star" d="M111 52h3m4 0h3m4 0h3m4 0h3" />
        <circle className="hubtime-process-icon__check-bg" cx="88" cy="59" r="13" />
        <path className="hubtime-process-icon__check" d="m82 59 4 4 8-9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 148 76" aria-hidden="true" focusable="false">
      <rect className="hubtime-process-icon__document" x="28" y="6" width="58" height="62" rx="4" />
      <path className="hubtime-process-icon__file" d="M92 20h28l18 18v30a4 4 0 0 1-4 4H92a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4Zm28 0v18h18" />
      <path className="hubtime-process-icon__line" d="M53 23h20M53 39h20M53 55h18M105 43h23M105 55h25M105 67h18" />
      <path className="hubtime-process-icon__check-bg" d="M47 27a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      <path className="hubtime-process-icon__check" d="m44 22 2 2 4-5m-6 19 2 2 4-5m-6 19 2 2 4-5" />
      <rect className="hubtime-process-icon__note" x="77" y="48" width="28" height="24" rx="3" />
      <path className="hubtime-process-icon__note-line" d="M83 56h14M83 62h9" />
    </svg>
  );
}

function HubtimeProcessCard({ card }) {
  if (card.asset) {
    return (
      <article
        className="hubtime-process-card hubtime-process-card--figma"
        style={{ aspectRatio: `${card.width} / ${card.height}` }}
      >
        <img
          src={card.asset}
          alt={`Etapa do processo: ${card.title}`}
          width={card.width}
          height={card.height}
        />
      </article>
    );
  }

  if (card.artAsset) {
    return (
      <article
        className="hubtime-process-card hubtime-process-card--structured"
        style={{ aspectRatio: `${card.width} / ${card.height}` }}
      >
        <div
          className="hubtime-process-card__content"
          style={{
            top: `calc(50% + ${card.centerOffset ?? 0.11}px)`,
            width: `${(card.artWidth / card.width) * 100}%`
          }}
        >
          <img
            src={card.artAsset}
            alt=""
            aria-hidden="true"
            width={card.artWidth}
            height={card.artHeight}
            style={{ aspectRatio: `${card.artWidth} / ${card.artHeight}` }}
          />
          <h3>{card.title}</h3>
        </div>
      </article>
    );
  }

  return (
    <article className="hubtime-process-card">
      <HubtimeProcessIcon type={card.icon} />
      <div>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    </article>
  );
}

function HubtimeMetricCard({ label, value, tone = "green" }) {
  return (
    <div className="hubtime-metric-card">
      <span className={`hubtime-metric-card__spark hubtime-metric-card__spark--${tone}`} aria-hidden="true">
        <svg viewBox="0 0 52 30" focusable="false">
          <path d="M2 21c7-1 8-15 15-14 7 2 5 18 13 18 7 0 8-18 20-22" />
        </svg>
      </span>
      <span className="hubtime-metric-card__label">{label}</span>
      <strong>{value}</strong>
      <small>em operação</small>
    </div>
  );
}

function HubtimeTableScreen() {
  const rows = [
    ["Central Matriz", "05:30", "Ativo"],
    ["Unidade Norte", "06:05", "Ativo"],
    ["Base Técnica", "07:40", "Pendente"],
    ["Filial Oeste", "08:20", "Ativo"],
    ["Laboratório", "09:15", "Ativo"]
  ];

  return (
    <section className="hubtime-screen hubtime-screen--table" aria-label="Tela de gestão de relógios">
      <header className="hubtime-screen__topbar">
        <span>HubTime</span>
        <nav aria-label="Navegação da tela">
          <i />
          <i />
          <i />
        </nav>
        <button type="button">Novo relógio</button>
      </header>
      <div className="hubtime-screen__body">
        <aside className="hubtime-screen__sidebar" aria-hidden="true">
          <b />
          <i />
          <i />
          <i />
          <i />
        </aside>
        <div className="hubtime-screen__content">
          <div className="hubtime-screen__toolbar">
            <div>
              <span>Relógios cadastrados</span>
              <strong>75</strong>
            </div>
            <div className="hubtime-screen__filters" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="hubtime-table" role="table" aria-label="Lista de relógios">
            <div className="hubtime-table__head" role="row">
              <span role="columnheader">Unidade</span>
              <span role="columnheader">Última sincronização</span>
              <span role="columnheader">Status</span>
            </div>
            {rows.map(([unit, time, status]) => (
              <div className="hubtime-table__row" role="row" key={unit}>
                <span role="cell">{unit}</span>
                <span role="cell">{time}</span>
                <span role="cell" data-status={status}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HubtimeConversationScreen() {
  return (
    <section className="hubtime-screen hubtime-screen--chat" aria-label="Tela de alinhamento de requisitos">
      <header className="hubtime-chat__header">
        <span>Fluxo de solicitação</span>
        <strong>Alinhamento</strong>
      </header>
      <div className="hubtime-chat__messages">
        <p>Precisamos filtrar relógios por unidade e status operacional.</p>
        <p>Inclui histórico de sincronização e alerta para pendências.</p>
        <p>Prioridade: leitura rápida para suporte e gestores.</p>
      </div>
      <footer className="hubtime-chat__composer">
        <span />
        <button type="button">Enviar</button>
      </footer>
    </section>
  );
}

function HubtimeRadialCard() {
  return (
    <aside className="hubtime-radial-card" aria-label="Indicador de validação">
      <svg viewBox="0 0 86 86" aria-hidden="true" focusable="false">
        <circle cx="43" cy="43" r="34" />
        <path d="M43 9a34 34 0 1 1-29 51" />
      </svg>
      <strong>3.482</strong>
      <span>registros validados</span>
    </aside>
  );
}

function HubtimeInterfaceScene() {
  return (
    <figure className="hubtime-interface-scene">
      <img
        src="/assets/hubtime-case/interfaces-perspectiva.svg"
        alt="Telas reais do HubTime em perspectiva, com conversa de ordem de serviço, listagem de relógios e indicadores operacionais"
        width="656"
        height="333"
      />
    </figure>
  );
}

function HubtimeFoundationsShowcase() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const primitivesY = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const semanticY = useTransform(scrollYProgress, [0, 1], [-64, 64]);

  return (
    <figure
      ref={ref}
      className="elev-case__media hubtime-case__media--wide hubtime-case__media--foundations"
      aria-label="Documentação de foundations do HubTime com escalas primitivas e cores semânticas"
    >
      <motion.img
        className="hubtime-foundations__panel hubtime-foundations__panel--primitives"
        src="/assets/hubtime-case/foundations-primitives.svg"
        alt=""
        aria-hidden="true"
        width="331"
        height="333"
        style={{ y: prefersReducedMotion ? 0 : primitivesY }}
      />
      <motion.img
        className="hubtime-foundations__panel hubtime-foundations__panel--semantic"
        src="/assets/hubtime-case/foundations-semantic.svg"
        alt=""
        aria-hidden="true"
        width="364"
        height="318"
        style={{ y: prefersReducedMotion ? 0 : semanticY }}
      />
    </figure>
  );
}

function HubtimeComponentsShowcase() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const tableY = useTransform(scrollYProgress, [0, 1], [38, -38]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], [-48, 48]);
  const sidebarY = useTransform(scrollYProgress, [0, 1], [42, -42]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [-56, 56]);

  return (
    <figure
      ref={ref}
      className="elev-case__media hubtime-case__media--wide hubtime-components"
      aria-label="Biblioteca de componentes do HubTime com células de tabela, sidebar, botões e cards de dashboard"
    >
      <motion.img
        className="hubtime-components__group hubtime-components__group--table"
        src="/assets/hubtime-case/components-table.svg"
        alt=""
        aria-hidden="true"
        width="234"
        height="166"
        style={{ y: prefersReducedMotion ? 0 : tableY }}
      />
      <motion.img
        className="hubtime-components__group hubtime-components__group--sidebar"
        src="/assets/hubtime-case/components-sidebar.svg"
        alt=""
        aria-hidden="true"
        width="182"
        height="158"
        style={{ y: prefersReducedMotion ? 0 : sidebarY }}
      />
      <motion.img
        className="hubtime-components__group hubtime-components__group--buttons"
        src="/assets/hubtime-case/components-buttons.svg"
        alt=""
        aria-hidden="true"
        width="275"
        height="125"
        style={{ y: prefersReducedMotion ? 0 : buttonsY }}
      />
      <motion.img
        className="hubtime-components__group hubtime-components__group--dashboard"
        src="/assets/hubtime-case/components-dashboard-cards.svg"
        alt=""
        aria-hidden="true"
        width="310"
        height="199"
        style={{ y: prefersReducedMotion ? 0 : dashboardY }}
      />
    </figure>
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
              {hubtimeProcessCards.map((card) => (
                <HubtimeProcessCard card={card} key={card.title} />
              ))}
            </div>
            <HubtimeInterfaceScene />
            <p>
              Cada tela parte de uma necessidade real do sistema. Mais do que organizar componentes visualmente, o trabalho envolve entender prioridades, estados, exceções e relações entre diferentes partes do produto.
            </p>
          </section>

          <section className="elev-case__section" aria-labelledby="hubtime-foundations-title">
            <h2 id="hubtime-foundations-title">Foundations</h2>
            <HubtimeFoundationsShowcase />
            <p>
              Com o crescimento do produto, decisões recorrentes começaram a formar uma base visual consistente. Tokens de cor, tipografia, espaçamentos e demais foundations ajudam a manter coerência entre diferentes módulos e interfaces.
            </p>
            <p>
              Em vez de criar componentes isolados, o sistema nasce das necessidades reais do produto.
            </p>
            <HubtimeComponentsShowcase />
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

const nauraLiveLinks = [
  "https://www.academianauracouto.com/corte-chanel-naura-couto/",
  "https://www.academianauracouto.com/corte-feminino-naura-couto/"
];

function NauraParallaxCard({ src, alt, direction = 1 }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [12 * direction, -12 * direction]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <div ref={ref}>
      <motion.figure
        className="elev-case__media naura-case__media"
        style={{ y: prefersReducedMotion ? 0 : y, scale: prefersReducedMotion ? 1 : scale }}
      >
        <img src={src} alt={alt} width="1322" height="665" />
      </motion.figure>
    </div>
  );
}

function NauraCoutoPage() {
  return (
    <Shell pageClass="elev-case-page">
      <main className="elev-case naura-case" aria-labelledby="naura-title">
        <article className="elev-case__shell">
          <CaseHeader current="Naura Couto" />

          <header className="elev-case__hero">
            <h1 id="naura-title">NAURA COUTO</h1>
            <figure className="elev-case__cover naura-case__cover">
              <img
                src="/assets/naura-couto-case/hero.png"
                alt="Composição visual da Academia Naura Couto com páginas de venda, mockups mobile e assets de campanha"
                width="1322"
                height="902"
              />
            </figure>

            <dl className="elev-case__meta" aria-label="Informações do projeto">
              <div>
                <dt>Papel</dt>
                <dd>UI/UX Designer</dd>
              </div>
              <div>
                <dt>Ferramentas</dt>
                <dd>Figma · Claude · Magnific · Analytics</dd>
              </div>
              <div>
                <dt>Atuação</dt>
                <dd>Estratégia · UX/UI · Copy · Desenvolvimento</dd>
              </div>
            </dl>

            <p className="elev-case__lead">
              Da estratégia ao produto publicado: identidade, conteúdo, experiência, desenvolvimento e otimização orientada por dados.
            </p>
          </header>

          <section className="elev-case__section naura-case__project" aria-labelledby="naura-project-title">
            <h2 id="naura-project-title">O projeto</h2>
            <p>
              O projeto Naura Couto nasceu da necessidade de transformar uma presença digital fragmentada em uma experiência mais profissional, consistente e preparada para conversão.
            </p>
            <p>
              Minha atuação foi de ponta a ponta: participei da definição visual, criação das páginas, produção de assets para campanhas, estruturação das mensagens, desenvolvimento das interfaces e acompanhamento dos resultados após a publicação.
            </p>
            <p>
              Mais do que entregar um website, o objetivo foi construir uma base digital que conectasse marca, comunicação, tráfego e conversão.
            </p>
          </section>

          <NauraParallaxCard
            src="/assets/naura-couto-case/strategy-overview.png"
            alt="Identidade visual da Academia Naura Couto: variações do logotipo e elementos gráficos em lilás"
            direction={1}
          />

          <hr className="naura-case__divider" />

          <section className="elev-case__section naura-case__challenge" aria-labelledby="naura-challenge-title">
            <h2 id="naura-challenge-title">O desafio</h2>
            <p>
              A Naura já possuía um serviço consolidado, mas precisava comunicar melhor sua proposta de valor no ambiente digital e criar uma jornada mais consistente entre anúncios, conteúdos e páginas de conversão.
            </p>
            <p>
              O desafio era construir uma presença capaz de:
            </p>
            <ul className="naura-case__list">
              <li>Manter consistência entre anúncios, redes sociais e páginas;</li>
              <li>Transformar tráfego pago em oportunidades reais;</li>
              <li>Acompanhar métricas e comportamento dos usuários após o lançamento.</li>
            </ul>
          </section>

          <NauraParallaxCard
            src="/assets/naura-couto-case/landing-wireframe.png"
            alt="Wireframe e landing page da Academia Naura Couto em um painel de interface"
            direction={-1}
          />

          <section className="elev-case__section naura-case__publication" aria-label="Da página à publicação">
            <p>
              As páginas foram projetadas no Figma considerando hierarquia de informação, clareza da oferta, leitura rápida e direcionamento para conversão.
            </p>
            <p>
              A estrutura buscava responder de forma progressiva às principais dúvidas do usuário:
            </p>
            <ul className="naura-case__questions" aria-label="Perguntas respondidas pela página">
              <li>O que é?</li>
              <li>Para quem é?</li>
              <li>Por que devo confiar?</li>
              <li>O que vou receber?</li>
              <li>Qual é o próximo passo?</li>
            </ul>
            <p>
              O projeto não terminou no Figma. A interface foi implementada, usando o MCP do <strong>Figma</strong> e o <strong>Claude Code</strong>, ajustada para diferentes dispositivos e publicada em ambiente de produção, fechando o ciclo entre conceito, design e entrega.
            </p>

            <ElevScreensShowcase
              columns={nauraScreenColumns}
              label="Telas mobile da Academia Naura Couto em movimento"
            />

            <p>
              A Naura Couto foi um exercício de construção de ponta a ponta. O projeto me permitiu combinar direção visual, UI, estruturação de componentes, ferramentas de IA e desenvolvimento em um único workflow, buscando reduzir a distância entre uma ideia e um produto publicado.
            </p>
          </section>

          <hr className="naura-case__divider" />

          <footer className="elev-case__live naura-case__live">
            <p>Projeto no ar</p>
            {nauraLiveLinks.map((link) => (
              <a href={link} key={link}>
                {link}
              </a>
            ))}
          </footer>
        </article>
      </main>
    </Shell>
  );
}

export default function App() {
  if (["/project", "/project.html"].includes(window.location.pathname)) {
    return <LanaPage />;
  }

  if (window.location.pathname.includes("/projects/elev-visual")) {
    return <ElevVisualPage />;
  }

  if (window.location.pathname.includes("/projects/hubtime")) {
    return <HubtimePage />;
  }

  if (window.location.pathname.includes("/projects/naura-couto")) {
    return <NauraCoutoPage />;
  }

  return <HomePage />;
}
