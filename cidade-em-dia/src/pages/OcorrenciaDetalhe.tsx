import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Aviso from "../components/Aviso";
import Campo from "../components/Campo";
import Carregando from "../components/Carregando";
import EstadoVazio from "../components/EstadoVazio";
import MensagemErro from "../components/MensagemErro";
import StatusBadge from "../components/StatusBadge";
import TituloPagina from "../components/TituloPagina";
import {
  botaoContorno,
  botaoPerigo,
  botaoPerigoContorno,
  botaoPrimario,
  classeCampo,
  container,
} from "../components/estilos";
import { listaStatus, nomeDaCategoria, nomeDoStatus } from "../data/categorias";
import { useTitulo } from "../hooks/useTitulo";
import { ErroApi, lerErro } from "../services/api";
import {
  buscarOcorrencia,
  criarAtualizacao,
  editarOcorrencia,
  listarAtualizacoes,
  removerOcorrencia,
} from "../services/ocorrencias";
import type { DadosAviso } from "../types/aviso";
import type { Atualizacao, Ocorrencia, StatusOcorrencia } from "../types/ocorrencia";
import { formatarDataHora } from "../utils/formatar";

const schema = yup.object({
  autor: yup
    .string()
    .trim()
    .required("Informe o seu nome.")
    .min(2, "O nome precisa ter pelo menos 2 letras.")
    .max(60, "O nome pode ter no máximo 60 caracteres."),
  mensagem: yup
    .string()
    .trim()
    .required("Escreva a atualização.")
    .min(3, "A atualização precisa ter pelo menos 3 caracteres.")
    .max(300, "A atualização pode ter no máximo 300 caracteres."),
});

type DadosAtualizacao = yup.InferType<typeof schema>;

export default function OcorrenciaDetalhe() {
  useTitulo("Detalhes da ocorrência");
  const { id } = useParams();
  const navigate = useNavigate();

  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [atualizacoes, setAtualizacoes] = useState<Atualizacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [naoEncontrada, setNaoEncontrada] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  const [novoStatus, setNovoStatus] = useState<StatusOcorrencia>("ABERTA");
  const [salvandoStatus, setSalvandoStatus] = useState(false);
  const [avisoStatus, setAvisoStatus] = useState<DadosAviso | null>(null);

  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [avisoExclusao, setAvisoExclusao] = useState<DadosAviso | null>(null);

  const [enviandoAtualizacao, setEnviandoAtualizacao] = useState(false);
  const [avisoAtualizacao, setAvisoAtualizacao] = useState<DadosAviso | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DadosAtualizacao>({
    resolver: yupResolver(schema),
    defaultValues: { autor: "", mensagem: "" },
  });

  useEffect(() => {
    let ativo = true;

    Promise.all([buscarOcorrencia(id ?? ""), listarAtualizacoes(id ?? "")])
      .then(([dadosOcorrencia, dadosAtualizacoes]) => {
        if (!ativo) return;
        setOcorrencia(dadosOcorrencia);
        setNovoStatus(dadosOcorrencia.status);
        setAtualizacoes(dadosAtualizacoes);
      })
      .catch((e) => {
        if (!ativo) return;
        if (e instanceof ErroApi && e.status === 404) {
          setNaoEncontrada(true);
        } else {
          setErro(lerErro(e).mensagem);
        }
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [id, tentativa]);

  function tentarNovamente() {
    setCarregando(true);
    setErro("");
    setTentativa(tentativa + 1);
  }

  async function salvarStatus() {
    if (!ocorrencia) return;
    setSalvandoStatus(true);
    setAvisoStatus(null);

    try {
      const salva = await editarOcorrencia(ocorrencia.id, {
        titulo: ocorrencia.titulo,
        descricao: ocorrencia.descricao,
        categoria: ocorrencia.categoria,
        bairro: ocorrencia.bairro,
        endereco: ocorrencia.endereco,
        nomeCidadao: ocorrencia.nomeCidadao,
        status: novoStatus,
      });
      setOcorrencia(salva);
      setAvisoStatus({
        tipo: "sucesso",
        texto: `Situação alterada para "${nomeDoStatus(salva.status)}".`,
      });
    } catch (e) {
      const { mensagem, detalhes } = lerErro(e);
      setAvisoStatus({ tipo: "erro", texto: mensagem, detalhes });
    } finally {
      setSalvandoStatus(false);
    }
  }

  async function excluir() {
    if (!ocorrencia) return;
    setExcluindo(true);
    setAvisoExclusao(null);

    try {
      await removerOcorrencia(ocorrencia.id);
      navigate("/ocorrencias");
    } catch (e) {
      const { mensagem, detalhes } = lerErro(e);
      setAvisoExclusao({ tipo: "erro", texto: mensagem, detalhes });
      setExcluindo(false);
    }
  }

  async function enviarAtualizacao(dados: DadosAtualizacao) {
    if (!ocorrencia) return;
    setEnviandoAtualizacao(true);
    setAvisoAtualizacao(null);

    try {
      const nova = await criarAtualizacao(ocorrencia.id, dados);
      setAtualizacoes([...atualizacoes, nova]);
      reset({ autor: dados.autor, mensagem: "" });
      setAvisoAtualizacao({ tipo: "sucesso", texto: "Atualização adicionada com sucesso." });
    } catch (e) {
      const { mensagem, detalhes } = lerErro(e);
      setAvisoAtualizacao({ tipo: "erro", texto: mensagem, detalhes });
    } finally {
      setEnviandoAtualizacao(false);
    }
  }

  return (
    <>
      <TituloPagina titulo="Detalhes da ocorrência" />

      <div className={`${container} py-8`}>
        <Link to="/ocorrencias" className="font-semibold text-blue-700 hover:underline">
          ← Voltar para as ocorrências
        </Link>

        {carregando && <Carregando texto="Buscando a ocorrência na API..." />}

        {erro && (
          <div className="mt-6">
            <MensagemErro mensagem={erro} aoTentarNovamente={tentarNovamente} />
          </div>
        )}

        {naoEncontrada && (
          <div className="mt-6">
            <EstadoVazio
              titulo="Ocorrência não encontrada"
              texto="Essa ocorrência não existe ou já foi removida."
            >
              <Link to="/ocorrencias" className={botaoPrimario}>
                Ver todas as ocorrências
              </Link>
            </EstadoVazio>
          </div>
        )}

        {ocorrencia && !carregando && (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={ocorrencia.status} />
                  <span className="text-sm font-medium text-slate-700">
                    {nomeDaCategoria(ocorrencia.categoria)}
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-bold wrap-break-word text-slate-900">{ocorrencia.titulo}</h2>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-slate-900">Bairro</dt>
                    <dd className="text-slate-700">{ocorrencia.bairro}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Endereço</dt>
                    <dd className="wrap-break-word text-slate-700">{ocorrencia.endereco || "Não informado"}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Registrada por</dt>
                    <dd className="text-slate-700">{ocorrencia.nomeCidadao}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Data do registro</dt>
                    <dd className="text-slate-700">{formatarDataHora(ocorrencia.dataCriacao)}</dd>
                  </div>
                </dl>

                <h3 className="mt-6 font-semibold text-slate-900">Descrição</h3>
                <p className="mt-1 wrap-break-word whitespace-pre-line text-slate-800">{ocorrencia.descricao}</p>
              </article>

              <section
                aria-labelledby="titulo-historico"
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 id="titulo-historico" className="text-xl font-bold text-slate-900">
                  Histórico de atualizações
                </h2>

                {atualizacoes.length === 0 ? (
                  <p className="mt-3 text-slate-700">Ainda não há atualizações para esta ocorrência.</p>
                ) : (
                  <ol className="mt-4 space-y-4 border-l-2 border-blue-200 pl-4">
                    {atualizacoes.map((atualizacao) => (
                      <li key={atualizacao.id}>
                        <p className="wrap-break-word text-slate-800">{atualizacao.mensagem}</p>
                        <p className="mt-1 text-sm text-slate-700">
                          {atualizacao.autor} · {formatarDataHora(atualizacao.dataCriacao)}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}
              </section>

              <section
                aria-labelledby="titulo-nova-atualizacao"
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 id="titulo-nova-atualizacao" className="text-xl font-bold text-slate-900">
                  Adicionar atualização
                </h2>

                {ocorrencia.status === "RESOLVIDA" ? (
                  <p className="mt-3 text-slate-700">
                    Esta ocorrência foi resolvida e não aceita novas atualizações. Para continuar, altere a
                    situação dela no quadro “Situação”.
                  </p>
                ) : (
                  <form onSubmit={handleSubmit(enviarAtualizacao)} noValidate className="mt-4 space-y-4">
                    {avisoAtualizacao && (
                      <Aviso
                        tipo={avisoAtualizacao.tipo}
                        texto={avisoAtualizacao.texto}
                        detalhes={avisoAtualizacao.detalhes}
                      />
                    )}

                    <Campo id="autor" rotulo="Seu nome" obrigatorio erro={errors.autor?.message}>
                      <input
                        id="autor"
                        type="text"
                        autoComplete="name"
                        aria-invalid={!!errors.autor}
                        aria-describedby={errors.autor ? "autor-erro" : undefined}
                        className={classeCampo}
                        {...register("autor")}
                      />
                    </Campo>

                    <Campo id="mensagem" rotulo="Atualização" obrigatorio erro={errors.mensagem?.message}>
                      <textarea
                        id="mensagem"
                        rows={3}
                        aria-invalid={!!errors.mensagem}
                        aria-describedby={errors.mensagem ? "mensagem-erro" : undefined}
                        className={classeCampo}
                        {...register("mensagem")}
                      />
                    </Campo>

                    <button type="submit" disabled={enviandoAtualizacao} className={botaoPrimario}>
                      {enviandoAtualizacao ? "Enviando..." : "Adicionar atualização"}
                    </button>
                  </form>
                )}
              </section>
            </div>

            <aside aria-label="Ações da ocorrência" className="space-y-6">
              <section
                aria-labelledby="titulo-situacao"
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 id="titulo-situacao" className="text-xl font-bold text-slate-900">
                  Situação
                </h2>

                <div className="mt-4 space-y-4">
                  <Campo id="novo-status" rotulo="Alterar situação">
                    <select
                      id="novo-status"
                      value={novoStatus}
                      onChange={(e) => setNovoStatus(e.target.value as StatusOcorrencia)}
                      className={classeCampo}
                    >
                      {listaStatus.map((item) => (
                        <option key={item.valor} value={item.valor}>
                          {item.nome}
                        </option>
                      ))}
                    </select>
                  </Campo>

                  <button
                    type="button"
                    onClick={salvarStatus}
                    disabled={salvandoStatus || novoStatus === ocorrencia.status}
                    className={`${botaoPrimario} w-full`}
                  >
                    {salvandoStatus ? "Salvando..." : "Salvar situação"}
                  </button>

                  {avisoStatus && (
                    <Aviso tipo={avisoStatus.tipo} texto={avisoStatus.texto} detalhes={avisoStatus.detalhes} />
                  )}
                </div>
              </section>

              <section
                aria-labelledby="titulo-exclusao"
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 id="titulo-exclusao" className="text-xl font-bold text-slate-900">
                  Excluir ocorrência
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  Remove a ocorrência e todas as atualizações dela. Essa ação não pode ser desfeita.
                </p>

                {confirmandoExclusao ? (
                  <div className="mt-4 rounded border border-red-300 bg-red-50 p-4">
                    <p className="font-semibold text-red-900">Tem certeza que deseja excluir?</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                      <button type="button" onClick={excluir} disabled={excluindo} className={botaoPerigo}>
                        {excluindo ? "Excluindo..." : "Sim, excluir"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmandoExclusao(false)}
                        disabled={excluindo}
                        className={botaoContorno}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmandoExclusao(true)}
                    className={`${botaoPerigoContorno} mt-4 w-full`}
                  >
                    Excluir ocorrência
                  </button>
                )}

                {avisoExclusao && (
                  <div className="mt-4">
                    <Aviso
                      tipo={avisoExclusao.tipo}
                      texto={avisoExclusao.texto}
                      detalhes={avisoExclusao.detalhes}
                    />
                  </div>
                )}
              </section>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
