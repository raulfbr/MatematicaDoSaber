"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ArrowDown, Play, Check, Plus, Minus, RotateCcw, ShieldCheck, BookOpen, Repeat2, Menu, X, FileText, Quote, Layers3, CornerDownRight, Expand, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

const OFFER = {
  name: "Combo Matemática do Saber + Tabuada do Saber",
  priceCents: 19895,
  installments: 12,
  installmentCents: 2058,
  installmentTotalCents: 24696,
  coupon: "LOTE1",
  discountPercent: 50,
  accessYears: 1,
  guaranteeDays: 15,
  checkoutUrl: "https://pay.hotmart.com/Y107837627O",
};
const money = (cents: number) => (cents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const SAMPLE_IMAGE = "/assets/amostra-matematica-decomposicao.webp";
const LESSON = {
  videoId: "MCdaIcxw-bk",
  youtubeUrl: "https://www.youtube.com/watch?v=MCdaIcxw-bk&list=PLOmGVKR_VYeCQ2lc6Q7Ns8QKCkpuCZWUk",
  title: "Operações Fundamentais da Matemática do Saber #000",
  displayTitle: "Operações fundamentais",
  duration: "3min29s",
  summary: "Depois da aula, pergunte o que ele entendeu e qual trecho gostaria de rever.",
};
const outcomes = [
  { number: "01", title: "Organizar a conta.", text: "Acompanhar a resolução por etapas para entender o que fazer primeiro.", sign: "Praticar as quatro operações." },
  { number: "02", title: "Usar a tabela de Pitágoras.", text: "Preencher a tabela e observar padrões para compreender as multiplicações.", sign: "Tabuada de 1 a 10, ampliando até 15." },
  { number: "03", title: "Conferir a resposta.", text: "Usar a operação inversa para conferir resultados, como multiplicar para verificar uma divisão.", sign: "Revisar a conta antes de seguir." },
];
const questions: { title: string; text: string; link?: { label: string; href: string } }[] = [
  { title: "Para quais dificuldades o combo faz sentido?", text: "Para revisar números naturais, as quatro operações e expressões numéricas. A Tabuada aprofunda as multiplicações. Veja os conteúdos para escolher por onde começar." },
  { title: "Por que o combo reúne dois cursos?", text: "O Matemática do Saber trabalha números e as quatro operações. O Tabuada do Saber aprofunda as multiplicações com a tabela de Pitágoras, padrões e macetes. A compra inclui os dois." },
  { title: "Meu filho precisa estudar os dois ao mesmo tempo?", text: "Não. Comecem pelo conteúdo que seu filho precisa praticar. Vocês podem alternar entre os cursos e rever as aulas durante o período de acesso." },
  { title: "Preciso acompanhar todas as aulas?", text: "Isso varia de aluno para aluno. Acompanhe a primeira aula e observe o apoio de que seu filho precisa. Ele pode pausar e rever as explicações." },
  { title: "As aulas são ao vivo? Há atendimento individual?", text: "As aulas são gravadas. O combo inclui PDFs do Matemática do Saber e não inclui atendimento individual, correção personalizada ou aulas particulares." },
  { title: "Como acesso as aulas após a compra?", text: "Após a aprovação do pagamento, a Hotmart envia a confirmação ao e-mail usado na compra. Entre com esse mesmo e-mail e localize sua compra em “Minhas compras”. No primeiro acesso, siga as orientações da plataforma para configurar sua conta.", link: { label: "Entrar na Hotmart", href: "https://consumer.hotmart.com/" } },
  { title: "Como funcionam o acesso e a renovação?", text: "O acesso dura um ano, com renovação automática pela Hotmart. Confira o valor e as condições da renovação no checkout. Você pode cancelar a renovação pela plataforma para evitar novas cobranças." },
  { title: "E se meu filho não se adaptar?", text: "Na primeira compra, vocês têm 15 dias para conhecer os cursos. Se a proposta não atender à sua família, solicite o reembolso integral pela Hotmart dentro desse prazo." },
];

const lessons = [
  { number: "01", title: "Números e sistema de numeração", subtitle: "Compreender a organização dos números", text: "Sequências, números naturais, ordem, reta numérica, decomposição e valor de cada algarismo. Uma base para compreender os números antes das próximas contas." },
  { number: "02", title: "As quatro operações", subtitle: "Construir e conferir as contas", text: "Adição, subtração, multiplicação e divisão. Acompanhe as resoluções e entenda também como uma operação pode ajudar a conferir a outra." },
  { number: "03", title: "Prática escrita e mental", subtitle: "Retomar os conceitos em novos exercícios", text: "Retome as quatro operações em novos exercícios. Pratique os cálculos no papel e acompanhe estratégias de cálculo mental." },
  { number: "04", title: "Expressões numéricas", subtitle: "Organizar o raciocínio por etapas", text: "Aprenda a respeitar a ordem das operações e a resolver expressões com parênteses, colchetes e chaves, acompanhando cada etapa." },
];
// Trechos dos relatos reais enviados por Raul em 30/09/2026.
// O produto específico não está identificado nos prints; não atribuir ao combo.
const testimonials = [
  { author: "Kenya Aparecida", text: "Eu tô muito satisfeita, meu filho consegue entender muito bem as aulas", source: "Mensagem enviada ao professor" },
  { author: "@barbosa_jane", text: "Comprei o curso e super recomendo.... Estamos satisfeitas... eu e minha filha", source: "Comentário sobre o curso" },
  { author: "Mel", text: "Obrigada, estamos adorando, já indiquei pra amigas que tem filho", source: "Mensagem enviada ao professor" },
];

const heroPhrases = [
  { id: "comeco", label: "Não sei por onde começar.", response: "Acompanhe a conta por etapas. No Matemática do Saber, Raul explica como organizar e conferir as operações." },
  { id: "tabuada", label: "Esqueci a tabuada.", response: "Procure padrões na tabela de Pitágoras. O Tabuada do Saber ensina a preencher e usar a tabela." },
  { id: "sozinho", label: "Sozinho, eu travo.", response: "Pause a aula e tente uma etapa no caderno. As aulas gravadas permitem rever a explicação quando precisar." },
];

function HeroPhrasePicker() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = heroPhrases.find(phrase => phrase.id === selectedId);

  return <div className="hero-phrases">
    <p id="hero-phrase-question" className="hero-phrase-question">Qual destas frases você ouve em casa?</p>
    <p id="hero-phrase-instruction" className="hero-phrase-instruction">Escolha uma frase.</p>
    <div className="hero-phrase-options" role="group" aria-labelledby="hero-phrase-question" aria-describedby="hero-phrase-instruction">
      {heroPhrases.map(phrase => <Button key={phrase.id} type="button" variant="outline" className="hero-phrase-option" aria-pressed={selectedId === phrase.id} aria-expanded={selectedId === phrase.id} aria-controls="hero-phrase-response" onClick={() => setSelectedId(current => current === phrase.id ? null : phrase.id)}>
        <Check className="hero-phrase-check" size={14} aria-hidden="true"/><span>{phrase.label}</span>
      </Button>)}
    </div>
    <div id="hero-phrase-response" aria-live="polite" aria-atomic="true">
      {selected && <div className="hero-phrase-answer" key={selected.id}>
        <h2>Como praticar nos cursos</h2>
        <p>{selected.response}</p>
        <a href="#curso" className="hero-phrase-link">Ver o conteúdo dos cursos</a>
      </div>}
    </div>
  </div>;
}

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#inicio" className={`brand ${footer ? "brand-footer" : ""}`} aria-label="Matemática do Saber — início"><img src="/assets/falcao-novak-invertido.png" alt="" width="42" height="42"/><span>matemática<span className="brand-second">do saber<span className="brand-period">.</span></span></span></a>;
}

function BuyButton() {
  useEffect(() => {
    if (document.querySelector('script[data-hotmart-widget]')) return;
    const script = document.createElement("script");
    script.src = "https://static.hotmart.com/checkout/widget.min.js";
    script.async = true;
    script.dataset.hotmartWidget = "true";
    document.head.appendChild(script);
  }, []);

  return <a className="bundle-buy hotmart-fb hotmart__button-checkout" href={OFFER.checkoutUrl} aria-label="Comprar o combo Matemática e Tabuada na Hotmart" aria-describedby="combo-coupon-instructions combo-payment-details"><span>Quero acesso aos dois cursos</span><ArrowUpRight size={19}/></a>;
}

function MaterialSample() {
  return <Dialog>
    <DialogTrigger asChild><button className="sample-preview" aria-label="Ampliar a amostra real do material de Matemática">
      <span className="sample-toolbar"><span><FileText size={17}/>MATEMÁTICA DO SABER</span><span>Página 45</span></span>
      <img src={SAMPLE_IMAGE} alt="Página original do curso com exercícios de decomposição: 75 = 70 + 5 e 758 = 700 + 50 + 8, entre outros exemplos." width="1500" height="1061" loading="lazy"/>
      <span className="sample-expand"><Expand size={17}/>Ampliar o material</span>
    </button></DialogTrigger>
    <DialogContent className="sample-dialog" showCloseButton={false}>
      <DialogClose asChild><Button className="dialog-close" variant="ghost" size="icon" aria-label="Fechar amostra"><X/></Button></DialogClose>
          <span className="small-label">AMOSTRA REAL · MATEMÁTICA DO SABER</span>
      <DialogTitle>Decomposição dos números</DialogTitle>
      <DialogDescription>Página 45 do PDF de apoio do Matemática do Saber. O exercício mostra como decompor números, com as respostas do material original.</DialogDescription>
      <div className="sample-viewer" tabIndex={0} aria-label="Imagem ampliada do material; role para explorar"><img src={SAMPLE_IMAGE} alt="Exercícios originais de decomposição, incluindo 75 = 70 + 5 e 758 = 700 + 50 + 8. As respostas da página foram preservadas." width="1500" height="1061"/></div>
      <div className="sample-dialog-footer"><span>Conteúdo: números e sistema de numeração.</span><a href={SAMPLE_IMAGE} target="_blank" rel="noopener noreferrer">Abrir imagem completa<ArrowUpRight size={15}/></a></div>
    </DialogContent>
  </Dialog>;
}

function MathDemo({ value, onValueChange }: { value: string; onValueChange: (value: string) => void }) {
  const [step, setStep] = useState(0);
  const [dividend, setDividend] = useState(84);
  const [a, setA] = useState(7);
  const [b, setB] = useState(8);
  const remainder = dividend - 80;
  const result = dividend / 4;
  const next = () => { if (step < 3) setStep(step + 1); else { setDividend(dividend === 84 ? 88 : 84); setStep(0); } };
  return <div className="demo-workspace">
    <div className="demo-toolbar"><span className="small-label">EXPLORE O RACIOCÍNIO</span><span className="demo-dots" aria-hidden="true"><i/><i/><i/></span></div>
    <Tabs value={value} onValueChange={onValueChange} className="lesson-tabs">
      <TabsList className="demo-tabs" aria-label="Escolha o exemplo"><TabsTrigger value="divisao">Matemática</TabsTrigger><TabsTrigger value="tabuada">Tabuada</TabsTrigger></TabsList>
      <TabsContent value="divisao" className="division-tab">
        <div className="demo-equation"><span>{dividend}</span><span className="operator">÷</span><span>4</span><span className="operator">=</span><span className={`answer ${step >= 2 ? "solved" : ""}`} aria-live="polite">{step >= 2 ? result : "?"}</span></div>
        <div className="working-area" aria-live="polite">
          {step === 0 ? <div className="demo-start"><div className="start-rule"/><p>Uma conta pode ficar mais simples<br/>quando você enxerga as partes.</p><span>Vamos acompanhar o raciocínio?</span></div> : <div className="working-steps" key={dividend}>
            <div className="working-caption"><span>01</span>Separe em duas divisões mais simples.</div>
            <div className="split-calculation"><span>80 ÷ 4 <b>= 20</b></span><i>+</i><span>{remainder} ÷ 4 <b>= {remainder / 4}</b></span></div>
            {step >= 2 && <div className="sum-calculation"><span>02</span><p>Junte os resultados.</p><strong>20 + {remainder / 4} = {result}</strong></div>}
            {step >= 3 && <div className="verify-calculation"><Check size={17}/><span>Confira: <b>{result} × 4 = {dividend}</b></span></div>}
          </div>}
        </div>
        <div className="demo-controls"><Button className="demo-next" onClick={next}>{["Ver o primeiro passo", "Juntar os resultados", "Conferir a resposta", "Tentar outra conta"][step]}<ArrowRight size={17}/></Button><Button className="demo-reset" variant="ghost" size="icon" aria-label="Recomeçar a explicação" onClick={() => setStep(0)} disabled={step === 0}><RotateCcw size={17}/></Button></div>
        <div className="step-progress" aria-label={`Etapa ${step} de 3`}>{[1,2,3].map(n=><span key={n} className={step>=n?"done":""}/>)}</div>
      </TabsContent>
      <TabsContent value="tabuada" className="table-tab">
        <div className="table-controls"><div className="number-stepper"><span>Linha</span><Button variant="ghost" size="icon" onClick={()=>setA(Math.max(1,a-1))} disabled={a===1} aria-label="Diminuir linha"><Minus/></Button><strong>{a}</strong><Button variant="ghost" size="icon" onClick={()=>setA(Math.min(10,a+1))} disabled={a===10} aria-label="Aumentar linha"><Plus/></Button></div><span className="stepper-times">×</span><div className="number-stepper"><span>Coluna</span><Button variant="ghost" size="icon" onClick={()=>setB(Math.max(1,b-1))} disabled={b===1} aria-label="Diminuir coluna"><Minus/></Button><strong>{b}</strong><Button variant="ghost" size="icon" onClick={()=>setB(Math.min(10,b+1))} disabled={b===10} aria-label="Aumentar coluna"><Plus/></Button></div></div>
        <table className="pythagoras"><caption className="sr-only">Tabela de Pitágoras de 1 a 10. Linha {a}, coluna {b}: resultado {a*b}.</caption><thead><tr><th scope="col">×</th>{Array.from({length:10},(_,i)=><th scope="col" key={i} className={i+1===b?"axis-selected":""}>{i+1}</th>)}</tr></thead><tbody>{Array.from({length:10},(_,r)=><tr key={r}><th scope="row" className={r+1===a?"axis-selected":""}>{r+1}</th>{Array.from({length:10},(_,c)=><td key={c} className={r+1===a&&c+1===b?"cell-selected":r+1===b&&c+1===a?"cell-mirror":r+1===a||c+1===b?"cell-path":""}>{(r+1)*(c+1)}</td>)}</tr>)}</tbody></table>
        <div className="table-result" aria-live="polite"><strong>{a} × {b} = {a*b}</strong><Button variant="ghost" onClick={()=>{setA(b);setB(a);}}><Repeat2 size={16}/>Trocar a ordem</Button></div><p className="table-explanation">{a===b ? "Na diagonal, a linha e a coluna têm o mesmo número." : `${a} × ${b} e ${b} × ${a}: posições diferentes, o mesmo resultado.`}</p>
      </TabsContent>
    </Tabs>
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [demoTab, setDemoTab] = useState("divisao");
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!reduced) animations.push(entry.target.animate([{opacity:.55,transform:"translateY(14px)"},{opacity:1,transform:"translateY(0)"}],{duration:550,easing:"cubic-bezier(.2,.7,.25,1)"}));
        observer.unobserve(entry.target);
      }
    }), {threshold:.1});
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    let frame = 0;
    const updateSticky = () => {
      frame = 0;
      const hero = document.querySelector(".hero");
      const blocked = ["#cursos", ".video-frame", "#metodo", "#amostra", "#experiencias", ".teacher-testimonial", "#final", ".site-footer"].some(selector => {
        const el = document.querySelector(selector);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      setStickyVisible(!!hero && hero.getBoundingClientRect().bottom < 0 && !blocked);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateSticky); };
    window.addEventListener("scroll", onScroll, {passive:true});
    window.addEventListener("resize", onScroll);
    updateSticky();
    const hashChanged = () => {
      const hash = window.location.hash;
      if (hash === "#tabuada") { setDemoTab("tabuada"); setDemoOpen(true); }
      if (hash === "#matematica" || hash === "#metodo") { setDemoTab("divisao"); setDemoOpen(true); }
    };
    hashChanged();
    window.addEventListener("hashchange", hashChanged);
    return () => { observer.disconnect(); animations.forEach(animation=>animation.cancel()); window.cancelAnimationFrame(frame); window.removeEventListener("scroll",onScroll); window.removeEventListener("resize",onScroll); window.removeEventListener("hashchange",hashChanged); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <header className="site-header" id="inicio"><div className="container header-content">
      <Brand/>
      <nav aria-label="Menu principal" className="desktop-nav"><a href="#aula">Ver uma aula</a><a href="#curso">Os dois cursos</a><a href="#professor">O professor</a></nav>
      <a href="#cursos" className="header-cta">Conhecer o combo<ArrowUpRight size={16}/></a>
      <Button className="menu-toggle" variant="ghost" size="icon" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen?<X/>:<Menu/>}</Button>
    </div>{menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Menu no celular">{[["#aula","Ver uma aula"],["#curso","Os dois cursos"],["#amostra","Ver o material"],["#professor","O professor"],["#cursos","Conhecer o combo"],["#duvidas","Dúvidas"]].map(([href,label])=><a key={href} href={href} onClick={()=>setMenuOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}</header>

    <main id="conteudo">
      <section className="hero combo-hero">
        <div className="hero-glow" aria-hidden="true"/>
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"/>MATEMÁTICA + TABUADA</div>
            <h1>Seu filho trava<br/>na hora de<br/><span>fazer a conta?</span></h1>
            <p className="hero-description">Dois cursos gravados com o professor Raul Novak para praticar as quatro operações e a tabuada. Seu filho pode pausar e rever as aulas.</p>
            <div className="hero-actions"><a className="btn btn-primary" href="#cursos">Conhecer o combo<ArrowUpRight size={18}/></a><a href="#aula" className="watch-link"><span><Play size={14} fill="currentColor"/></span>Assistir a uma aula</a></div>
            <div className="hero-assurances"><span><Layers3 size={16}/>Dois cursos · acesso anual</span><span><ShieldCheck size={16}/>{OFFER.guaranteeDays} dias de garantia</span></div>
            <HeroPhrasePicker/>
          </div>
          <figure className="hero-visual">
            <div className="portrait-grid" aria-hidden="true"/><div className="portrait-orbit" aria-hidden="true"/>
            <img className="hero-portrait" src="/assets/raul-hero.webp" alt="Professor Raul Novak sorrindo" width="1100" height="1100" fetchPriority="high"/>
            <div className="portrait-index" aria-hidden="true">ENTENDER · PRATICAR · CONFERIR</div>
            <a className="math-float" href="#metodo" onClick={() => { setDemoTab("divisao"); setDemoOpen(true); }} aria-label="Explorar o exemplo de divisão"><span>CONFERIR A DIVISÃO</span><div>84 <i>÷</i> 4 <i>=</i> <b>21</b></div><small><Check size={14}/>21 × 4 = 84<ArrowUpRight size={15}/></small></a>
            <figcaption><span>Professor <b>Raul Novak</b></span><small>+7 anos em reforço personalizado</small></figcaption>
          </figure>
        </div>
        <div className="container hero-bottom"><span>Assista, pause e tente no caderno.</span><a href="#evolucao">Veja como estudar<ArrowDown size={17}/></a></div>
      </section>

      <section id="evolucao" className="outcomes-section section-space"><div className="container">
        <div className="section-heading reveal"><div><span className="eyebrow">A PRÁTICA NOS CURSOS</span><h2>Entender as contas.<br/><span>Praticar as resoluções.</span></h2></div><p>Seu filho acompanha as explicações, tenta resolver no caderno e pode rever as etapas em que tiver dúvida.</p></div>
        <div className="outcome-grid">{outcomes.map(item=><article className="outcome-item reveal" key={item.number}><span className="outcome-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><div className="outcome-sign"><CornerDownRight size={18}/><span>{item.sign}</span></div></article>)}</div>
        <p className="outcome-note">Vocês podem pausar a aula, repetir um trecho e começar pelo conteúdo que precisa de revisão.</p>
      </div></section>

      <section id="aula" className="lesson-section section-space"><div className="container">
        <div className="section-heading reveal"><div><span className="eyebrow">ASSISTA ANTES DE ESCOLHER</span><h2>Veja como Raul explica.<br/><span>Antes de decidir.</span></h2></div><p>Assista à aula pública com seu filho e observe se ele acompanha a explicação.</p></div>
        <div className="lesson-layout reveal">
          <div className="lesson-media">
            <div className="video-frame">{playing?<iframe src={`https://www.youtube-nocookie.com/embed/${LESSON.videoId}?autoplay=1&rel=0`} title={LESSON.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>:<button className="video-poster" onClick={()=>setPlaying(true)} aria-label={`Reproduzir ${LESSON.displayTitle}`}><div className="poster-grid" aria-hidden="true"/><div className="poster-copy"><span className="small-label">PROFESSOR RAUL NOVAK</span><strong>Conheça a<br/>explicação de Raul<span>.</span></strong></div><img src="/assets/raul-aula.webp" alt="Raul explicando com um marcador" width="600" height="800" loading="lazy"/><span className="play-button"><Play size={25} fill="currentColor"/></span><span className="video-bottom"><span><Play size={13} fill="currentColor"/>ASSISTIR À AULA</span></span></button>}</div>
            <div className="lesson-meta lesson-meta-under-video" aria-label={`Tema e duração: ${LESSON.displayTitle}, ${LESSON.duration}`}><span>{LESSON.displayTitle}</span><span>{LESSON.duration}</span></div>
          </div>
          <div className="lesson-side"><span className="small-label">PARA OBSERVAR JUNTOS</span><h3>Seu filho acompanha<br/>a explicação?</h3><p>{LESSON.summary}</p><a className="text-link" href={LESSON.youtubeUrl} target="_blank" rel="noopener noreferrer">Abrir a aula no YouTube<ArrowUpRight size={17}/></a></div>
        </div>
        <div className="lesson-bridge reveal"><div><span className="small-label">PARA CONTINUAR DEPOIS DO VÍDEO</span><h3>Continue a prática nos dois cursos.</h3><p>No Matemática do Saber, pratique números e as quatro operações. No Tabuada do Saber, aprenda a preencher e usar a tabela de Pitágoras.</p></div><a className="text-link" href="#curso">Ver o que está incluído<ArrowDown size={17}/></a></div>
      </div></section>

      <section id="metodo" className="method-section optional-demo"><span id="matematica" className="topic-anchor" aria-hidden="true"/><span id="tabuada" className="topic-anchor" aria-hidden="true"/><div className="container">
        <Accordion type="single" collapsible value={demoOpen?"exemplo":""} onValueChange={v=>setDemoOpen(v==="exemplo")} className="demo-disclosure">
          <AccordionItem value="exemplo"><AccordionTrigger className="demo-disclosure-trigger"><span><span className="eyebrow">EXEMPLO INTERATIVO</span><strong>Quer experimentar uma conta?</strong><small>{demoOpen?"Fechar o exemplo":"Explore a divisão e a tabela de Pitágoras"}</small></span></AccordionTrigger><AccordionContent className="demo-disclosure-content"><div className="method-layout">
            <div className="method-copy"><span className="eyebrow">TESTE UM EXEMPLO DA PÁGINA</span><h2>Resolva por etapas.<br/><span>Confira a resposta.</span></h2><p>Avance pelas etapas da divisão ou mude os números na tabuada para descobrir relações.</p><div className="method-steps"><div><span>01</span><h3>Entender por onde começar.</h3></div><div><span>02</span><h3>Acompanhar cada etapa.</h3></div><div><span>03</span><h3>Conferir o resultado.</h3></div></div><p className="method-note"><BookOpen size={20}/><span>Este é um exemplo interativo da página. Nos cursos, as explicações são apresentadas em aulas gravadas.</span></p></div><MathDemo value={demoTab} onValueChange={setDemoTab}/>
          </div></AccordionContent></AccordionItem>
        </Accordion>
      </div></section>

      <section id="curso" tabIndex={-1} className="inside-section section-space"><div className="container">
        <div className="section-heading reveal"><div><span className="eyebrow">DOIS CURSOS NA MESMA COMPRA</span><h2>Veja o conteúdo<br/><span>dos dois cursos.</span></h2></div><p>Para quem precisa revisar adição, subtração, multiplicação e divisão. A Tabuada do Saber aprofunda a prática das multiplicações.</p></div>
        <div className="learning-paths">
          <article className="learning-path reveal"><div className="path-top"><span>01 / FUNDAMENTOS</span><BookOpen size={23}/></div><h3>Matemática do Saber</h3><p className="path-intro">Números, quatro operações e expressões numéricas, com explicações e exercícios.</p>
            <Accordion type="single" collapsible className="curriculum-list">{lessons.map(item=><AccordionItem key={item.number} value={item.number}><AccordionTrigger className="curriculum-trigger"><span className="module-number">{item.number}</span><span><b>{item.title}</b><small>{item.subtitle}</small></span></AccordionTrigger><AccordionContent className="curriculum-details">{item.text}</AccordionContent></AccordionItem>)}</Accordion>
            <div className="path-footnote"><FileText size={18}/><span>Com PDFs para acompanhar a prática.</span></div>
          </article>
          <article className="learning-path path-tabuada reveal"><div className="path-top"><span>02 / MULTIPLICAÇÃO</span><Layers3 size={23}/></div><h3>Tabuada do Saber</h3><p className="path-intro">Aprenda a preencher a tabela de Pitágoras e usar as relações entre as multiplicações.</p>
            <ol className="tabuada-topics"><li><span>01</span><div><b>Construção da tabela de Pitágoras</b><p>Entender a organização das linhas e colunas.</p></div></li><li><span>02</span><div><b>Leitura e uso da tabela</b><p>Encontrar multiplicações e relacionar posições.</p></div></li><li><span>03</span><div><b>Padrões, relações e macetes</b><p>Explorar caminhos para chegar ao resultado.</p></div></li><li><span>04</span><div><b>De 1 a 10, ampliando até 15</b><p>Continuar a prática das multiplicações.</p></div></li></ol>
            <div className="path-footnote"><CheckCheck size={18}/><span>Incluído no combo junto com Matemática.</span></div>
          </article>
        </div>
        <p className="overlap-note"><CornerDownRight size={18}/><span>O Matemática trabalha multiplicação nas quatro operações. A Tabuada aprofunda a construção e a exploração da tabela.</span></p>
      </div></section>

      <section id="amostra" className="sample-section section-space"><div className="container sample-layout">
        <div className="sample-copy reveal"><span className="eyebrow">UM TRECHO DO MATERIAL REAL</span><h2>Veja um exercício<br/><span>do material do curso.</span></h2><p>Este exercício do Matemática do Saber mostra como separar um número em partes: 75 = 70 + 5. Veja a página original, com as respostas.</p><div className="sample-detail"><FileText size={19}/><span>Números e sistema de numeração<br/><b>Decomposição: 75 = 70 + 5</b></span></div><p className="sample-note">Essa prática está no conteúdo de números e sistema de numeração, antes das quatro operações.</p></div>
        <div className="sample-visual reveal"><MaterialSample/><p className="sample-caption">Amostra do PDF do Matemática do Saber · apresentação original preservada.</p></div>
      </div></section>

      <section className="home-routine"><div className="container"><div className="routine-compact reveal"><div><span className="small-label">NA ROTINA DE CASA</span><h3>Acompanhe a primeira aula.</h3></div><p>Observe o apoio de que seu filho precisa. Pause para ele tentar no caderno e reveja os trechos em que houver dúvida.</p></div></div></section>

      <section id="professor" className="about-section section-space"><div className="container about-layout">
        <div className="about-visual reveal"><div className="about-photo"><img src="/assets/raul-retrato.webp" alt="Fotografia do professor Raul Novak" width="700" height="700" loading="lazy"/></div><div className="experience-marker"><strong>7<span>+</span></strong><span>anos de experiência<br/>em reforço personalizado</span></div></div>
        <div className="about-copy reveal"><span className="eyebrow">QUEM ENSINA</span><h2>Professor<br/><span>Raul Novak.</span></h2><p className="about-lead">Mais de 7 anos ensinando<br/>em aulas de reforço.</p><p>Nas aulas de reforço, acompanho alunos com dificuldades diferentes. Começo com exercícios que eles conseguem acompanhar e aumento o desafio aos poucos.</p><p>Nos cursos gravados, explico o raciocínio durante a resolução para que seu filho possa acompanhar, tentar e rever.</p>
          <figure className="teacher-testimonial"><Quote size={22} strokeWidth={1.3} aria-hidden="true"/><div><blockquote><p>“ele gosta de estudar com vc”</p></blockquote><figcaption><strong>Erika, mãe do Erik</strong><span>Mensagem sobre as aulas particulares</span></figcaption></div></figure>
          <div className="falcon-story"><img src="/assets/falcao-novak-invertido.png" alt="" width="38" height="38"/><div><strong>Por que o falcão?</strong><p>Meu filho me ajudou a escolher o falcão peregrino como símbolo da marca.</p></div></div></div>
      </div></section>

      {testimonials.length > 0 && <section id="experiencias" className="testimonials-section section-space"><div className="container">
        <div className="section-heading testimonials-heading reveal"><div><span className="eyebrow">RELATOS SOBRE O CURSO</span><h2>O que dizem<br/><span>sobre as aulas.</span></h2></div></div>
        <div className="testimonial-grid">{testimonials.map((item,i)=><figure className={`testimonial-card reveal ${i===0?"testimonial-featured":""}`} key={item.author}><div className="testimonial-top"><Quote size={28} strokeWidth={1.3} aria-hidden="true"/></div><blockquote><p>“{item.text}”</p></blockquote><figcaption><strong>{item.author}</strong><span>{item.source}</span></figcaption></figure>)}</div>
      </div></section>}

      <section id="cursos" className="offers-section section-space"><span id="oferta-matematica" className="topic-anchor" aria-hidden="true"/><span id="oferta-tabuada" className="topic-anchor" aria-hidden="true"/><span id="oferta-combo" className="topic-anchor" aria-hidden="true"/><span id="combo" className="topic-anchor" aria-hidden="true"/><div className="container">
        <div className="offers-heading reveal"><span className="eyebrow">UMA COMPRA. OS DOIS CURSOS.</span><h2>Quatro operações e tabuada.<br/><span>Dois cursos para fortalecer a base.</span></h2><p>Você recebe os dois cursos, aulas gravadas e PDFs de apoio do Matemática do Saber. Acesso por um ano.</p></div>
        <div className="bundle-panel reveal">
          <div className="bundle-included"><span className="small-label">TUDO ISSO FAZ PARTE DO COMBO</span><div className="bundle-course"><span className="bundle-course-number">01</span><div><h3>Matemática do Saber</h3><p>Números, quatro operações, prática escrita e mental e expressões numéricas.</p></div></div><div className="bundle-course"><span className="bundle-course-number">02</span><div><h3>Tabuada do Saber</h3><p>Tabela de Pitágoras, padrões e multiplicações de 1 a 10, ampliando até 15.</p></div></div><ul className="bundle-features"><li><Check size={17}/>Aulas gravadas dos dois cursos</li><li><Check size={17}/>PDFs do Matemática para acompanhar</li><li><Check size={17}/>Acesso por {OFFER.accessYears} ano para pausar e rever</li></ul></div>
          <div className="bundle-purchase"><span className="bundle-price-label">MATEMÁTICA + TABUADA</span><p id="combo-coupon-instructions" className="bundle-discount">{OFFER.discountPercent}% de desconto<br/>No checkout, aplique o cupom <b>{OFFER.coupon}</b>.</p><div className="bundle-price"><span className="bundle-installments">{OFFER.installments}x de</span><small>R$</small><strong>{money(OFFER.installmentCents)}</strong></div><p className="bundle-term">ou R$ {money(OFFER.priceCents)} à vista por ano</p><p id="combo-payment-details" className="bundle-payment-details">Parcelamento com juros.<br/>Total: R$ {money(OFFER.installmentTotalCents)}.</p><p className="bundle-renewal">Assinatura anual<br/>com renovação automática</p><BuyButton/><div className="bundle-assurance"><ShieldCheck size={20}/><span><b>{OFFER.guaranteeDays} dias de garantia</b><small>Após a primeira compra.</small></span></div><p className="bundle-format">Cursos gravados. Não inclui atendimento pedagógico individual.</p></div>
        </div>
        <div className="guarantee-block reveal"><div className="guarantee-symbol"><span>{OFFER.guaranteeDays}</span><small>DIAS</small></div><div><span className="small-label">GARANTIA NA PRIMEIRA COMPRA</span><h3>{OFFER.guaranteeDays} dias para avaliar<br/>a adaptação.</h3><p>Após a primeira compra, vocês têm {OFFER.guaranteeDays} dias para experimentar os cursos. Se a proposta não atender à sua família, solicite o reembolso integral pela Hotmart dentro desse prazo.</p></div><ShieldCheck className="guarantee-icon" size={62} strokeWidth={1}/></div>
      </div></section>

      <section id="duvidas" className="faq-section section-space"><div className="container faq-layout"><div className="reveal"><span className="eyebrow">ANTES DE COMEÇAR</span><h2>Entenda o acesso,<br/><span>a renovação e a garantia.</span></h2><p>Veja o que está incluído, como funciona a assinatura e como solicitar o reembolso.</p></div><Accordion type="single" collapsible className="faq-list reveal">{questions.map((q,i)=><AccordionItem key={i} value={`q${i}`}><AccordionTrigger>{q.title}</AccordionTrigger><AccordionContent><p>{q.text}</p>{q.link && <a className="faq-access-link" href={q.link.href} target="_blank" rel="noopener noreferrer" aria-label={`${q.link.label} (abre em uma nova aba)`}>{q.link.label}</a>}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <section id="final" className="closing-section"><div className="container closing-content reveal"><img src="/assets/falcao-novak-invertido.png" alt="" width="46" height="46"/><span className="eyebrow">ESCOLHA POR ONDE COMEÇAR</span><h2>Comece pelo que<br/><span>seu filho precisa praticar.</span></h2><p>Matemática para revisar as quatro operações. Tabuada para praticar as multiplicações. Os dois cursos estão incluídos na mesma compra.</p><a className="btn btn-primary" href="#cursos">Conhecer o combo<ArrowUpRight size={18}/></a></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-main"><Brand footer/><p>Matemática na prática.<br/>Com Professor Raul Novak.</p><a href="#inicio" className="text-link">Voltar ao início<ArrowUpRight size={17}/></a></div><div className="container footer-bottom"><span>© 2026 Matemática do Saber · Professor Raul Novak</span></div></footer>
    <div className={`mobile-sticky ${stickyVisible&&!menuOpen?"visible":""}`} aria-hidden={!stickyVisible||menuOpen}><span>Matemática + Tabuada<br/><b>Os dois cursos, juntos.</b></span><a href="#cursos" className="btn btn-primary" tabIndex={stickyVisible&&!menuOpen?0:-1}>Ver o combo<ArrowUpRight size={17}/></a></div>
  </>;
}
