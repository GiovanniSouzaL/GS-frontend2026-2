import { useState } from "react";
import { Link } from "react-router";
import TituloPagina from "../components/TituloPagina";
import { botaoPrimario, container } from "../components/estilos";
import { perguntas } from "../data/faq";
import { useTitulo } from "../hooks/useTitulo";

export default function Faq() {
  useTitulo("Perguntas frequentes");
  const [aberta, setAberta] = useState<string | null>(null);

  return (
    <>
      <TituloPagina
        titulo="Perguntas frequentes"
        subtitulo="Tire as dúvidas mais comuns sobre o Cidade em Dia."
      />

      <section aria-labelledby="titulo-perguntas" className={`${container} py-10`}>
        <h2 id="titulo-perguntas" className="sr-only">
          Lista de perguntas
        </h2>

        <ul className="mx-auto max-w-3xl space-y-3">
          {perguntas.map((item) => {
            const estaAberta = aberta === item.id;

            return (
              <li key={item.id} className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <h3>
                  <button
                    type="button"
                    id={`faq-botao-${item.id}`}
                    aria-expanded={estaAberta}
                    aria-controls={`faq-painel-${item.id}`}
                    onClick={() => setAberta(estaAberta ? null : item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left font-semibold text-slate-900"
                  >
                    {item.pergunta}
                    <span aria-hidden="true" className="text-2xl leading-none text-blue-700">
                      {estaAberta ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={`faq-painel-${item.id}`} hidden={!estaAberta} className="px-4 pb-4 text-slate-800">
                  {item.resposta}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">Não encontrou o que procurava?</p>
          <p className="mt-1 text-slate-700">Mande uma mensagem e a gente responde.</p>
          <Link to="/contato" className={`${botaoPrimario} mt-4`}>
            Ir para o contato
          </Link>
        </div>
      </section>
    </>
  );
}
