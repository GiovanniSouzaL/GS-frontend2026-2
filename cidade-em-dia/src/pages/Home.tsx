import { Link } from "react-router";
import CardOcorrencia from "../components/CardOcorrencia";
import Carregando from "../components/Carregando";
import EstadoVazio from "../components/EstadoVazio";
import MensagemErro from "../components/MensagemErro";
import {
  botaoContorno,
  botaoContornoClaro,
  botaoDestaque,
  botaoPrimario,
  container,
} from "../components/estilos";
import { categorias } from "../data/categorias";
import { useBusca } from "../hooks/useBusca";
import { useTitulo } from "../hooks/useTitulo";
import { listarOcorrencias } from "../services/ocorrencias";

const passos = [
  {
    numero: 1,
    titulo: "Registre",
    texto: "Conte qual é o problema e onde ele está. Não precisa de cadastro nem de CPF.",
  },
  {
    numero: 2,
    titulo: "Acompanhe",
    texto: "A equipe responsável atualiza a ocorrência e você vê cada passo na página dela.",
  },
  {
    numero: 3,
    titulo: "Veja resolvido",
    texto: "Quando o problema é solucionado, a ocorrência é encerrada e o histórico fica guardado.",
  },
];

type NumeroProps = {
  valor: number;
  nome: string;
};

function Numero({ valor, nome }: NumeroProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
      <dt className="text-sm font-medium text-slate-700">{nome}</dt>
      <dd className="mt-1 text-3xl font-bold text-blue-800">{valor}</dd>
    </div>
  );
}

export default function Home() {
  useTitulo("Início");
  const { dados, carregando, erro, recarregar } = useBusca(listarOcorrencias);

  const abertas = dados?.filter((o) => o.status === "ABERTA").length ?? 0;
  const emAndamento = dados?.filter((o) => o.status === "EM_ANDAMENTO").length ?? 0;
  const resolvidas = dados?.filter((o) => o.status === "RESOLVIDA").length ?? 0;

  return (
    <>
      <section className="bg-blue-800 text-white">
        <div className={`${container} grid items-center gap-8 py-12 md:py-16 lg:grid-cols-2`}>
          <div>
            <p className="font-semibold text-amber-300">CitizenTech · Zeladoria colaborativa</p>
            <h1 className="mt-3 text-3xl leading-tight font-bold md:text-5xl">
              Os problemas da sua rua merecem ser resolvidos.
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              Registre buracos, lixo, falta de iluminação e outros problemas dos espaços públicos e
              acompanhe cada atualização até a solução.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/ocorrencias/nova" className={botaoDestaque}>
                Registrar ocorrência
              </Link>
              <Link to="/ocorrencias" className={botaoContornoClaro}>
                Ver ocorrências
              </Link>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 text-slate-800 shadow-lg">
            <h2 className="text-lg font-bold text-slate-900">O que você pode registrar</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {categorias.map((categoria) => (
                <li
                  key={categoria.valor}
                  className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900"
                >
                  {categoria.nome}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-700">
              Basta contar o que está acontecendo, em qual bairro e, se souber, o endereço.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-como-funciona" className={`${container} py-12`}>
        <h2 id="titulo-como-funciona" className="text-2xl font-bold text-slate-900">
          Como funciona
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {passos.map((passo) => (
            <li key={passo.numero} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-800 font-bold text-white"
              >
                {passo.numero}
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{passo.titulo}</h3>
              <p className="mt-1 text-slate-700">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="titulo-situacao" className={`${container} pb-12`}>
        <h2 id="titulo-situacao" className="text-2xl font-bold text-slate-900">
          Situação das ocorrências
        </h2>

        {carregando && <Carregando texto="Buscando as ocorrências na API..." />}

        {erro && (
          <div className="mt-6">
            <MensagemErro mensagem={erro} aoTentarNovamente={recarregar} />
          </div>
        )}

        {dados && dados.length === 0 && (
          <div className="mt-6">
            <EstadoVazio
              titulo="Nenhuma ocorrência registrada ainda"
              texto="Seja o primeiro a registrar um problema da sua região."
            >
              <Link to="/ocorrencias/nova" className={botaoPrimario}>
                Registrar ocorrência
              </Link>
            </EstadoVazio>
          </div>
        )}

        {dados && dados.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Numero valor={dados.length} nome="Total registrado" />
            <Numero valor={abertas} nome="Abertas" />
            <Numero valor={emAndamento} nome="Em andamento" />
            <Numero valor={resolvidas} nome="Resolvidas" />
          </dl>
        )}
      </section>

      {dados && dados.length > 0 && (
        <section aria-labelledby="titulo-ultimas" className={`${container} pb-12`}>
          <h2 id="titulo-ultimas" className="text-2xl font-bold text-slate-900">
            Últimas ocorrências
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dados.slice(0, 3).map((ocorrencia) => (
              <CardOcorrencia key={ocorrencia.id} ocorrencia={ocorrencia} />
            ))}
          </div>
          <div className="mt-6">
            <Link to="/ocorrencias" className={botaoContorno}>
              Ver todas as ocorrências
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
