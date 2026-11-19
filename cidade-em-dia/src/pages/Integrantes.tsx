import { Link } from "react-router";
import TituloPagina from "../components/TituloPagina";
import { botaoPrimario, container } from "../components/estilos";
import { integrantes } from "../data/integrantes";
import { useTitulo } from "../hooks/useTitulo";

export default function Integrantes() {
  useTitulo("Integrantes");

  return (
    <>
      <TituloPagina titulo="Integrantes" subtitulo="Quem desenvolveu o Cidade em Dia." />

      <section aria-labelledby="titulo-equipe" className={`${container} py-10`}>
        <h2 id="titulo-equipe" className="text-2xl font-bold text-slate-900">
          Equipe do projeto
        </h2>
        <p className="mt-2 text-slate-700">Projeto desenvolvido de forma individual na Global Solution 2026/2.</p>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrantes.map((integrante) => (
            <li
              key={integrante.id}
              className="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <img
                src={integrante.foto}
                alt={`Foto de ${integrante.nome}`}
                width={160}
                height={160}
                className="h-40 w-40 rounded-full object-cover"
              />
              <h3 className="mt-4 text-xl font-bold text-slate-900">{integrante.nome}</h3>
              <p className="text-slate-700">
                RM {integrante.rm} · Turma {integrante.turma}
              </p>
              <p className="mt-2 text-slate-800">{integrante.funcao}</p>
              <Link to={`/integrantes/${integrante.id}`} className={`${botaoPrimario} mt-4`}>
                Ver perfil
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
