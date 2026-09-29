import "./HubtimeV2Page.css";

function Showcase({ name, alt, width = 1200, height = 608, eager = false }) {
  return <figure className="hubtime-v2__showcase"><img src={"/assets/hubtime-v2/" + name + ".png"} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} /></figure>;
}

export default function HubtimeV2Page({ header }) {
  return (
    <main className="hubtime-v2" aria-labelledby="hubtime-v2-title">
      <article className="hubtime-v2__shell">
        {header}
        <section className="hubtime-v2__section" aria-labelledby="hubtime-v2-title">
          <h1 id="hubtime-v2-title">De regras de negócio complexas a interfaces claras.</h1>
          <p>UX/UI do HubTime: dos requisitos e fluxos à construção de um sistema de gestão em evolução.</p>
          <Showcase name="cover" alt="Mecanismo de um relógio com engrenagens douradas e a marca HubTime" height={440} eager />
          <dl className="hubtime-v2__meta" aria-label="Informações do projeto">
            <div><dt>Papel</dt><dd>UX/UI Design</dd></div>
            <div><dt>Frentes</dt><dd>Fluxos · UI · Design System</dd></div>
            <div><dt>Status</dt><dd>Em desenvolvimento</dd></div>
          </dl>
          <section className="hubtime-v2__context" aria-labelledby="hubtime-v2-context">
            <h2 id="hubtime-v2-context">Contexto</h2>
            <p>O HubTime é um sistema de gestão em desenvolvimento para acompanhar operações, ordens de serviço, usuários e unidades parceiras. Atuo no UX/UI em colaboração com os idealizadores do produto, o PM e os desenvolvedores, desde a compreensão dos requisitos e a definição dos fluxos até a construção das interfaces e da base visual do sistema.</p>
          </section>
        </section>

        <section className="hubtime-v2__section" aria-labelledby="hubtime-v2-challenge">
          <h2 id="hubtime-v2-challenge">Conectar diferentes operações em uma experiência coerente.</h2>
          <p>O desafio é traduzir regras de negócio, perfis de acesso e grandes volumes de informação em fluxos compreensíveis. Cada tela precisa apoiar uma tarefa e manter coerência com as demais áreas, mesmo enquanto o escopo do sistema evolui.</p>
          <div className="hubtime-v2__duo">
            <Showcase name="login" alt="Interface de acesso ao HubTime" width={592} height={616} />
            <Showcase name="flows" alt="Mapeamento dos fluxos de cadastro, edição de usuários e tratamento de erros" width={592} height={616} />
          </div>
        </section>

        <section className="hubtime-v2__section" aria-labelledby="hubtime-v2-process">
          <h2 id="hubtime-v2-process">Entender as regras antes de desenhar as telas.</h2>
          <p>O trabalho começa em reuniões com os idealizadores e o PM para esclarecer requisitos e discutir os fluxos. Esses alinhamentos orientam a organização das informações, as ações disponíveis e os estados que precisam aparecer em cada interface.</p>
          <div className="hubtime-v2__process">
            <Showcase name="requirements" alt="Requisitos" width={390} height={313} />
            <Showcase name="alignment" alt="Alinhamento" width={390} height={313} />
            <Showcase name="validation" alt="Validação" width={390} height={313} />
          </div>
          <Showcase name="interfaces" alt="Interfaces do HubTime em perspectiva: ordens de serviço, listagem de relógios e indicadores" />
          <p>Ordens de serviço, usuários e permissões trazem necessidades diferentes para a interface. Ao desenhar as telas, considero as prioridades de cada fluxo, seus estados e exceções, além das relações entre os módulos do produto.</p>
        </section>

        <section className="hubtime-v2__section" aria-labelledby="hubtime-v2-foundations">
          <h2 id="hubtime-v2-foundations">Uma base visual para acompanhar a evolução do produto.</h2>
          <p>À medida que novas telas são desenhadas, decisões recorrentes passam a compor a base visual do HubTime. Cores, tipografia, espaçamentos e componentes organizam padrões que podem ser reutilizados entre os módulos.</p>
          <p>Essa base nasce das necessidades das interfaces: os padrões são definidos junto com o produto e refinados conforme surgem novos cenários.</p>
          <Showcase name="foundations" alt="Documentação da base visual: escalas de cores primitivas e tokens semânticos do HubTime" />
          <h3>Tabelas, navegação, botões e cards fazem parte dessa construção. O objetivo é tornar os padrões explícitos para que design e desenvolvimento tenham uma referência comum ao evoluir o sistema.</h3>
          <Showcase name="components" alt="Biblioteca do HubTime: células de tabela, navegação lateral, botões e cards de dashboard" />
        </section>

        <section className="hubtime-v2__section" aria-labelledby="hubtime-v2-next">
          <h2 id="hubtime-v2-next">Consolidar os padrões e documentar os componentes.</h2>
          <p>O HubTime segue em desenvolvimento. Os próximos passos são finalizar os componentes, levá-los ao Storybook e documentar seus estados e usos, enquanto as interfaces continuam evoluindo com os requisitos do produto.</p>
          <p className="hubtime-v2__note">Este case apresenta o processo e as interfaces em construção. Os resultados de uso ainda não foram medidos.</p>
        </section>
      </article>
    </main>
  );
}
