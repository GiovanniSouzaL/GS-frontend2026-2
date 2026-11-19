import { Link, useParams } from "react-router";
import EstadoVazio from "../components/EstadoVazio";
import TituloPagina from "../components/TituloPagina";
import { botaoContorno, botaoPrimario, container } from "../components/estilos";
import { integrantes } from "../data/integrantes";
import { useTitulo } from "../hooks/useTitulo";

export default function IntegranteDetalhe() {
  const { id } = useParams();
  const integrante = integrantes.find((item) => item.id === id);

  useTitulo(integrante ? integrante.nome : "Integrante não encontrado");

  if (!integrante) {
    return (
      <>
        <TituloPagina titulo="Integrante" />
        <div className={`${container} py-10`}>
          <EstadoVazio
            titulo="Integrante não encontrado"
            texto="Não existe nenhum integrante com esse código."
          >
            <Link to="/integrantes" className={botaoPrimario}>
              Ver integrantes
            </Link>
          </EstadoVazio>
        </div>
      </>
    );
  }

  return (
    <>
      <TituloPagina titulo={integrante.nome} subtitulo={`RM ${integrante.rm} · Turma ${integrante.turma}`} />

      <div className={`${container} py-10`}>
        <Link to="/integrantes" className="font-semibold text-blue-700 hover:underline">
          ← Voltar para os integrantes
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <img
            src={integrante.foto}
            alt={`Foto de ${integrante.nome}`}
            width={400}
            height={400}
            className="mx-auto aspect-square w-full max-w-xs rounded-lg object-cover shadow-sm"
          />

          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">{integrante.funcao}</h2>
            <p className="mt-3 text-slate-800">{integrante.sobre}</p>

            <h3 className="mt-6 text-lg font-bold text-slate-900">O que foi feito no projeto</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-800">
              {integrante.responsabilidades.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={integrante.github} target="_blank" rel="noreferrer" className={botaoContorno}>
                GitHub
              </a>
              <a href={integrante.linkedin} target="_blank" rel="noreferrer" className={botaoContorno}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
