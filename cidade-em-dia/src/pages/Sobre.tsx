import { Link } from "react-router";
import TituloPagina from "../components/TituloPagina";
import { botaoPrimario, container } from "../components/estilos";
import { useTitulo } from "../hooks/useTitulo";

const passos = [
  "O morador registra o problema com título, categoria, bairro e descrição.",
  "A API Java guarda a ocorrência e devolve um número de protocolo.",
  "A equipe responsável muda a situação e adiciona atualizações no histórico.",
  "Todos acompanham o caso até ele ser resolvido e encerrado.",
];

const tecnologias = [
  "React",
  "Vite",
  "TypeScript",
  "Tailwind CSS",
  "React Router",
  "React Hook Form e Yup",
  "Fetch API",
  "API REST em Java",
  "Render",
  "GitHub",
];

const ecossistema = [
  "Moradores, que registram e acompanham os problemas.",
  "Equipes de zeladoria e subprefeituras, que recebem os chamados e resolvem.",
  "Associações de bairro e escolas, que ajudam a divulgar a plataforma.",
  "Empresas de limpeza urbana e de iluminação, que executam os reparos.",
];

const indicadores = [
  "Tempo médio entre o registro e a resolução de cada ocorrência.",
  "Porcentagem de ocorrências resolvidas.",
  "Bairros e categorias com mais ocorrências, para priorizar as equipes.",
  "Quantidade de moradores que registram e acompanham chamados.",
];

const ods = [
  {
    numero: 11,
    nome: "Cidades e comunidades sustentáveis",
    texto:
      "Ajuda a manter ruas, calçadas, praças e iluminação em boas condições, deixando os espaços públicos mais seguros, inclusivos e acessíveis.",
  },
  {
    numero: 9,
    nome: "Indústria, inovação e infraestrutura",
    texto:
      "Usa tecnologia simples para apoiar a manutenção da infraestrutura da cidade e entrega dados organizados para priorizar os reparos.",
  },
  {
    numero: 10,
    nome: "Redução das desigualdades",
    texto:
      "Qualquer morador pode registrar e acompanhar um problema pelo celular, sem cadastro. Isso dá voz também a bairros que costumam ser menos ouvidos.",
  },
];

export default function Sobre() {
  useTitulo("Sobre o projeto");

  return (
    <>
      <TituloPagina
        titulo="Sobre o projeto"
        subtitulo="Entenda o problema que o Cidade em Dia quer resolver e como a solução funciona."
      />

      <div className={`${container} space-y-8 py-10`}>
        <section aria-labelledby="titulo-problema" className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 id="titulo-problema" className="text-2xl font-bold text-slate-900">
            O problema
          </h2>
          <p className="mt-3 text-slate-800">
            Buraco na rua, lixo acumulado, poste apagado, calçada quebrada. São problemas pequenos dos espaços
            públicos, mas que afetam a segurança e a rotina de todo mundo. Muitas vezes o morador não sabe a
            quem reclamar, não recebe resposta e não consegue acompanhar o que foi feito. Do outro lado, a
            gestão da cidade fica sem informação organizada sobre onde estão os problemas mais urgentes.
          </p>
        </section>

        <section
          aria-labelledby="titulo-cidadao"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 id="titulo-cidadao" className="text-2xl font-bold text-slate-900">
            Quem é o cidadão beneficiado
          </h2>
          <p className="mt-3 text-slate-800">
            Qualquer morador que convive com um problema no seu bairro. O benefício é maior para quem mais sofre
            com a falta de zeladoria: pessoas com mobilidade reduzida, idosos, quem depende de calçadas e
            iluminação para andar com segurança e moradores de regiões afastadas, que costumam ter mais
            dificuldade para serem ouvidos. As equipes de zeladoria também ganham, porque passam a receber os
            chamados de forma organizada.
          </p>
        </section>

        <section
          aria-labelledby="titulo-funciona"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 id="titulo-funciona" className="text-2xl font-bold text-slate-900">
            Como a solução funciona
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-800">
            {passos.map((passo) => (
              <li key={passo}>{passo}</li>
            ))}
          </ol>
          <Link to="/ocorrencias/nova" className={`${botaoPrimario} mt-5`}>
            Registrar uma ocorrência
          </Link>
        </section>

        <section
          aria-labelledby="titulo-tecnologias"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 id="titulo-tecnologias" className="text-2xl font-bold text-slate-900">
            Tecnologias usadas
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tecnologias.map((tecnologia) => (
              <li key={tecnologia} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900">
                {tecnologia}
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          <section
            aria-labelledby="titulo-ecossistema"
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 id="titulo-ecossistema" className="text-2xl font-bold text-slate-900">
              Quem participa do ecossistema
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-800">
              {ecossistema.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="titulo-impacto"
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 id="titulo-impacto" className="text-2xl font-bold text-slate-900">
              Como o impacto será medido
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-800">
              {indicadores.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="titulo-ods">
          <h2 id="titulo-ods" className="text-2xl font-bold text-slate-900">
            Conexão com os ODS da ONU
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {ods.map((item) => (
              <article key={item.numero} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-3xl font-bold text-blue-800">ODS {item.numero}</p>
                <h3 className="mt-1 font-bold text-slate-900">{item.nome}</h3>
                <p className="mt-2 text-slate-800">{item.texto}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-slate-800">
            Saiba mais sobre o{" "}
            <a
              href="https://sdgs.un.org/goals/goal11"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-700 underline"
            >
              ODS 11 no site da ONU
            </a>
            .
          </p>
        </section>

        <section
          aria-labelledby="titulo-inclusiva"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 id="titulo-inclusiva" className="text-2xl font-bold text-slate-900">
            Simples, segura, inclusiva e acessível
          </h2>
          <p className="mt-3 text-slate-800">
            O site foi pensado para funcionar bem no celular, no tablet e no computador, com menu que se adapta à
            tela, textos legíveis, contraste adequado e navegação por teclado. Para proteger os dados, o
            registro não pede CPF, telefone nem endereço de e-mail: só o nome, o bairro e a descrição do
            problema. Se a API demorar ou ficar fora do ar, o site avisa e permite tentar de novo.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            As ocorrências exibidas no site são dados de exemplo, criados para a demonstração do projeto.
          </p>
        </section>
      </div>
    </>
  );
}
