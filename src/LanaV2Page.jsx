import { useEffect, useRef, useState } from "react";
import "./LanaV2Page.css";

const asset = (name) => `/assets/lana-v2/${name}`;
const previewUrl = "https://lana-institucional-v2.vercel.app/";

function Picture({ name, alt, width = 1200, height, eager = false, className = "" }) {
  return <img className={className} src={asset(`${name}.png`)} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} decoding="async" />;
}
function Showcase({ name, alt, height, caption, eager = false }) {
  return <figure className="lana-v2__showcase"><Picture {...{ name, alt, height, eager }} />{caption && <figcaption>{caption}</figcaption>}</figure>;
}
function Cards({ items, plain = false }) {
  return <div className={`lana-v2__cards${plain ? " lana-v2__cards--plain" : ""}`} style={{ "--columns": items.length }}>{items.map(([title, body]) => <div className="lana-v2__card" key={title}><h4>{title}</h4><p>{body}</p></div>)}</div>;
}
function PreviewLink({ children, href, bracket = true }) {
  return <a className="lana-v2__link" href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{bracket && <span aria-hidden="true">[</span>}{children}<img src={asset("external-arrow.svg")} alt="" />{bracket && <span aria-hidden="true">]</span>}</a>;
}
function DemoVideo({ src, poster, label, className = "" }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const userPaused = useRef(false);
  useEffect(() => {
    const video = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let disposed = false;
    // Safari needs the native muted/inline flags before the first play attempt.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    const resume = () => {
      if (disposed || !visible || document.hidden || userPaused.current || motion.matches) return;
      video.play().catch(() => { if (!disposed) setPlaying(false); });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resume(); else video.pause();
    }, { threshold: 0 });
    const onVisibility = () => { if (document.hidden) video.pause(); else resume(); };
    const onMotionChange = () => { if (motion.matches) video.pause(); else resume(); };
    video.addEventListener("canplay", resume);
    document.addEventListener("visibilitychange", onVisibility);
    // Retry blocked mobile autoplay on the next user gesture; manual pause wins.
    document.addEventListener("pointerup", resume);
    motion.addEventListener("change", onMotionChange);
    observer.observe(video);
    return () => {
      disposed = true;
      observer.disconnect();
      video.removeEventListener("canplay", resume);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("pointerup", resume);
      motion.removeEventListener("change", onMotionChange);
      video.pause();
    };
  }, []);
  function toggle() {
    const video = ref.current;
    if (video.paused) {
      userPaused.current = false;
      video.muted = true;
      video.play().catch(() => setPlaying(false));
    } else { userPaused.current = true; video.pause(); }
  }
  return <div className={`lana-v2__demo ${className}`}>
    <video ref={ref} src={asset(src)} poster={asset(poster)} autoPlay loop muted playsInline preload="auto" aria-label={label} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
    {failed ? <p className="lana-v2__media-error">Vídeo indisponível. <a href={asset(src)}>Abrir arquivo</a></p> : <button type="button" className="lana-v2__play" onClick={toggle} aria-label={`${playing ? "Pausar" : "Reproduzir"} ${label}`} aria-pressed={playing}>{playing ? "Ⅱ" : "▶"}</button>}
  </div>;
}
function Comparison() {
  const [position, setPosition] = useState(50);
  return <figure className="lana-v2__comparison" style={{ "--comparison-position": `${position}%` }} aria-label="Comparação entre a primeira versão e o redesign da página de pneus">
    <Picture name="compare-original" alt="Primeira versão da página de pneus da Lana" height={787} />
    <Picture name="compare-redesign" alt="Redesign da página de pneus com título local e contato contextual" height={787} className="lana-v2__comparison-after" />
    <div className="lana-v2__comparison-divider" aria-hidden="true"><span>‹<i />›</span></div>
    <input type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} aria-label="Comparar versões da página de pneus" aria-valuetext={`${position}% do redesign visível`} />
  </figure>;
}
function Learnings() {
  return <div className="lana-v2__section lana-v2__learnings">
    <h3>Aprendizados</h3>
    <ul><li>Olhar os dados da v1 antes de desenhar mudou o escopo: o projeto deixou de ser um redesign visual e virou uma estratégia de aquisição.</li><li>A IA acelerou a pesquisa, mas o valor estava nos critérios de prioridade. Sem eles, o benchmark seria só uma lista de observações.</li></ul>
    <h3>Próximos passos</h3>
    <div className="lana-v2__prose"><p>O redesign está pausado. A próxima etapa é concluir as telas de serviços e blog e levar a v2 do Figma para o código, desenvolvendo e hospedando o site com apoio do Claude e do Codex. As variáveis do Figma viram tokens no código, e os componentes documentados viram a base de cada template, para que o site publicado seja fiel ao que foi desenhado.</p><p>Com a v2 no ar, as <strong>hipóteses a validar são:</strong> as páginas por serviço elevam a participação orgânica acima dos 34% da v1; a página de pneus converte mais cliques pagos em pedidos de orçamento; os cliques no WhatsApp passam a ser medidos por página; e as keywords prioritárias chegam ao top 10 local em 2 meses.</p></div>
    <p className="lana-v2__note">Os números apresentados descrevem a v1 e a pesquisa. O impacto da v2 ainda será medido.</p>
  </div>;
}
export default function LanaV2Page({ header }) {
  return <main className="lana-v2" aria-labelledby="lana-v2-title"><article className="lana-v2__shell">
    {header}
    <div className="lana-v2__content">
      <section className="lana-v2__section lana-v2__intro" aria-labelledby="lana-v2-title">
        <div className="lana-v2__title"><h1 id="lana-v2-title">De um site para anúncios a um canal de aquisição local.</h1><p>Como os dados de um website provisório, pesquisa de busca local, Google ADS e um benchmark com 9 sites orientaram a nova arquitetura, o conteúdo e os caminhos de contato da Lana Automotiva.</p></div>
        <Showcase name="cover-process" alt="Redesign da Lana Automotiva, com a página inicial em um monitor sobre fundo azul" height={440} eager />
        <div className="lana-v2__meta">
          <dl><div><dt>Papel</dt><dd>Estratégia · UX/UI</dd></div><div><dt>Cliente</dt><dd>Lana Automotiva · Itabira-MG</dd></div></dl>
          <dl><div><dt>Período</dt><dd>Maio 2026 – pausado</dd></div><div><dt>Frentes</dt><dd>Performance · SEO · GEO</dd></div></dl>
          <div><dl><div><dt>Status</dt><dd>Pausado · v2 em design</dd></div></dl><PreviewLink href={previewUrl} bracket={false}>Ver preview</PreviewLink></div>
        </div>
      </section>
      <section className="lana-v2__section lana-v2__context" aria-labelledby="lana-v2-context">
        <h2 id="lana-v2-context">Contexto</h2>
        <p>A Lana Automotiva é uma autopeças e centro automotivo em Itabira-MG que atende motoristas e frotas de empresas desde 1991. A v1 do site nasceu com um objetivo imediato: sustentar as campanhas de Google Ads. Funcionava como página de destino, mas não tinha estrutura para ser encontrada na busca orgânica, foi justamente ali que os dados mostraram a oportunidade.</p>
        <div className="lana-v2__section lana-v2__baseline"><h3>O tráfego já existia. Faltava uma estratégia para capturá-lo.</h3><p>Além dos anúncios, a v1 já recebia visitas da busca orgânica sem nenhum trabalho de SEO. Só que tudo caía na mesma página: quem buscava “troca de óleo em Itabira” via o mesmo conteúdo de quem procurava pneus ou peças, sem um próximo passo claro. O desafio era transformar esse tráfego difuso em entradas específicas por intenção de busca.</p>
          <div className="lana-v2__data-row"><figure className="lana-v2__analytics"><div><Picture name="analytics" alt="Relatório de aquisição do Google Analytics: 219 sessões de busca orgânica" /></div></figure><aside className="lana-v2__insight"><strong>34%</strong><p>Mesmo sem uma estratégia de SEO, 219 das 651 sessões vieram da busca orgânica. O dado mostrou que a demanda local já existia, o site apenas ainda não estava estruturado para captá-la de forma estratégica.</p></aside></div>
          <dl className="lana-v2__metrics"><div><dd>530</dd><dt>usuários únicos</dt></div><div><dd>219</dd><dt>sessões orgânicas</dt></div><div><dd>3.000+</dd><dt>eventos registrados</dt></div></dl><p className="lana-v2__note">Linha de base da v1 · Google Analytics · 25 jun — 22 set.</p>
        </div>
      </section>
      <section className="lana-v2__section lana-v2__research-section" aria-labelledby="lana-v2-research">
        <div className="lana-v2__section"><h2 id="lana-v2-research">Entender a busca antes de desenhar as páginas.</h2><p>Parti dos dados da V1 e aprofundei o diagnóstico com informações de tráfego pago, palavras-chave de baixo custo e alto volume e pesquisa assistida por IA. Utilizei skills e agentes personalizados no Claude para análise de concorrentes, pesquisa e benchmarking, com apoio do Firecrawl na coleta de dados de 7 sites, incluindo os 2 principais concorrentes com presença digital em Itabira. A IA acelerou a coleta e a organização das informações, enquanto os critérios de prioridade, a interpretação dos dados e as decisões de arquitetura foram definidos por mim.</p>
          <figure className="lana-v2__research"><Picture className="lana-v2__skills-first" name="research-skills" alt="Skills personalizadas para diagnóstico e benchmarking" /><Picture className="lana-v2__skills-second" name="research-skills" alt="" /><Picture className="lana-v2__matrix" name="research-matrix" alt="Matriz de prioridade: buscas orgânicas versus pagas" /></figure>
          <Cards plain items={[["Diagnóstico", "Analytics e mídia da v1 para entender por onde as pessoas chegavam, que páginas abriam e onde saíam sem contato."], ["Benchmark", "9 sites analisados via Firecrawl: concorrentes locais, referências regionais e o próprio site da Lana. Resultado: 6 gaps priorizados."], ["Arquitetura", "2 públicos (motoristas e frotas) e 3 intenções de busca viraram um sitemap com uma página dedicada por serviço."]]} />
        </div>
        <div className="lana-v2__section"><h3>Resultados da busca</h3><p>Organizei os problemas da v1 em severidade para o negócio × esforço de correção. Isso separou o que dava para corrigir já do que precisava entrar na nova arquitetura.</p>
          <div className="lana-v2__results"><DemoVideo src="research-demo-web.mp4" poster="research-poster.png" label="demonstração da pesquisa e priorização" className="lana-v2__research-video" /><div className="lana-v2__results-image"><Picture name="research-results" alt="Tabela de severidade, esforço e prioridade dos problemas identificados no benchmark" width={600} height={211} /></div></div>
          <p className="lana-v2__caption">Fonte: benchmark com 9 sites via Firecrawl. Severidade e esforço definidos por mim, a partir do impacto no negócio.</p>
        </div>
        <div className="lana-v2__section lana-v2__ai"><h3>O que a IA fez e o que eu decidi</h3><Cards items={[["Automatizado · Claude + Firecrawl", "Scrape dos 9 sites, extração de CTAs, depoimentos e estrutura de páginas dos concorrentes, e uma primeira lista de keywords locais por serviço, peça, pneus e buscas do setor automotivo."], ["Decidido por mim", "Quais gaps atacar primeiro, a regra de uma página por serviço, manter o WhatsApp contextual que a v1 já tinha e criar uma entrada própria para frotas, serviços e blog."]]} /><p className="lana-v2__note">As skills aceleraram a coleta; a leitura dos dados e as prioridades foram decisões de design.</p></div>
      </section>
      <section className="lana-v2__section" aria-labelledby="lana-v2-architecture"><h2 id="lana-v2-architecture">Uma página para cada intenção de busca.</h2><p>Na v1, tudo cabia em 3 páginas. Na v2, cada serviço, categoria de peça e tipo de pneu ganhou uma página própria, otimizada para uma keyword local e cada página termina em um contato de WhatsApp com mensagem específica para aquele assunto.</p>
        <div className="lana-v2__version"><h4>V1</h4><p>3 páginas principais. Estrutura inicial mais simples para iniciar as campanhas.</p></div>
        <Showcase name="sitemap-v1" alt="Sitemap v1: Home, Serviços e Pneus" height={188} />
        <div className="lana-v2__version"><h4>V2</h4><p>Páginas otimizadas por keyword local. Cada serviço, categoria de peça e tipo de pneu ganhou uma página própria, otimizada para uma keyword local e com contato de WhatsApp específico.</p></div>
        <figure className="lana-v2__showcase"><img src={asset("sitemap-v2.svg")} alt="Sitemap v2: conexões da Home para Serviços, Peças e acessórios, Pneus e páginas institucionais, com um gradiente percorrendo as linhas" width="1200" height="562" loading="lazy" /><figcaption>Sitemap simplificado: da página única da v1 para 30+ páginas organizadas por serviço, categoria e intenção de busca.</figcaption></figure>
      </section>
      <section className="lana-v2__section" aria-labelledby="lana-v2-foundations"><h2 id="lana-v2-foundations">Foundations</h2><p>Com uma página por serviço, categoria e intenção de busca, o site deixou de ser uma peça única e virou um conjunto de templates. Antes das telas, organizei as fundações em variáveis no Figma, para que cada nova página herdasse cor, tipografia e espaçamento sem precisar ser redesenhada.</p>
        <Cards items={[["Tokens", "Cor, tipografia e espaçamento em três camadas: primitivos, semânticos e aplicação."], ["Componentes", "Hero com H1 local, card de serviço, FAQ, avaliações do Google e botão de WhatsApp contextual. Todos nascem das seções que se repetem no sitemap."], ["Templates", "Os componentes se combinam em templates de página. O de serviço é montado uma vez e replicado, mudando só o conteúdo e a keyword."]]} />
        <div className="lana-v2__foundations"><Picture name="foundations-tokens" alt="Variáveis de cor e escala tipográfica documentadas no Figma" width={592} height={400} /><Picture name="foundations-components" alt="Componentes e templates desktop e mobile da Lana" width={592} height={400} /></div>
      </section>
      <section className="lana-v2__section" aria-labelledby="lana-v2-interface"><h2 id="lana-v2-interface">Cada busca encontra uma página e um próximo passo.</h2><p>A interface traduz a arquitetura: autopeças e serviços separados, informações locais sempre visíveis e o WhatsApp como caminho principal de contato. Os títulos de cada página foram reescritos a partir das keywords da pesquisa.</p>
        <div className="lana-v2__interfaces"><Picture name="interface-screens" alt="Composição das telas desktop e mobile do redesign" width={600} height={560} /><Picture name="interface-phone" alt="Redesign da Lana apresentado em um celular" width={568} height={560} /></div>
        <figure className="lana-v2__showcase"><div className="lana-v2__video-stage"><DemoVideo src="pneus-lana-web.mp4" poster="preview-site.png" label="demonstração da página de pneus" /></div><figcaption>Títulos e seções de cada página alinhados às keywords priorizadas: produto ou serviço, marca e cidade no H1, e perguntas frequentes reais no fim da página.</figcaption></figure>
        <Comparison />
        <div className="lana-v2__section lana-v2__geo"><h3>Preparado para a busca local e para respostas de IA</h3><p>GEO entrou como frente do projeto porque cada vez mais gente pergunta a assistentes de IA onde resolver o carro. O conteúdo foi escrito para ser encontrado, entendido e citado.</p><Cards items={[["FAQ por página", "Perguntas reais de busca respondidas na própria página, no formato que buscadores e IAs conseguem extrair."], ["Dados locais consistentes", "Endereço, horário e cidade iguais em todas as páginas."], ["Confiança verificável", "Avaliações do Google, Rede Ancora e marcas de pneus como prova — no lugar de depoimentos genéricos."], ["WhatsApp contextual", "Cada página abre o WhatsApp com uma mensagem do próprio assunto, preservando o que a v1 já fazia bem."]]} /></div>
        <Showcase name="local-details" alt="Detalhes das páginas: contato, localização, informações locais e perguntas frequentes" height={480} caption="Mobile: a busca por serviços locais acontece principalmente no celular, então o contato fica sempre ao alcance do polegar." />
      </section>
      <section className="lana-v2__section" aria-labelledby="lana-v2-handoff"><h2 id="lana-v2-handoff">Entregar para quem vai construir.</h2><p>A v2 foi documentada para que conteúdo e desenvolvimento pudessem seguir sem adivinhar: cada página tem uma função, uma keyword e uma história de usuário ligada a ela.</p><Cards items={[["User stories por página", "Histórias de usuário rastreadas até as dobras da home e as páginas do sitemap."], ["Arquitetura documentada", "Sitemap, estrutura dobra a dobra e um template de página de serviço replicável ×6."], ["Mapa de mensagens do WhatsApp", "Texto pré-preenchido para cada contexto: autopeças, agendar serviço, comercial e frotas."]]} /><Learnings /></section>
      <section id="lana-v2-preview" className="lana-v2__preview" aria-labelledby="lana-v2-preview-title"><div className="lana-v2__section"><h3 id="lana-v2-preview-title">A v2 já saiu do Figma.</h3><p>O preview está publicado e segue em desenvolvimento, construído a partir dos tokens e componentes documentados, com apoio do Claude e do Codex.</p><PreviewLink href="https://lanaautomotiva.com.br">Ver atual</PreviewLink><PreviewLink href={previewUrl}>Ver preview redesign</PreviewLink></div><div className="lana-v2__preview-image"><Picture name="preview-site" alt="Preview implementado da página de pneus da Lana" width={600} height={388} /></div></section>
      <section className="lana-v2__section" aria-label="Aprendizados e próximos passos"><Learnings /></section>
    </div>
  </article></main>;
}
