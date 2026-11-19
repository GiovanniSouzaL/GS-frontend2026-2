import { useState } from "react";
import { Link } from "react-router";
import CardOcorrencia from "../components/CardOcorrencia";
import Campo from "../components/Campo";
import Carregando from "../components/Carregando";
import EstadoVazio from "../components/EstadoVazio";
import MensagemErro from "../components/MensagemErro";
import TituloPagina from "../components/TituloPagina";
import { botaoContorno, botaoPrimario, classeCampo, container } from "../components/estilos";
import { categorias, listaStatus } from "../data/categorias";
import { useBusca } from "../hooks/useBusca";
import { useTitulo } from "../hooks/useTitulo";
import { listarOcorrencias } from "../services/ocorrencias";

export default function Ocorrencias() {
  useTitulo("Ocorrências");
  const { dados, carregando, erro, recarregar } = useBusca(listarOcorrencias);

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [categoria, setCategoria] = useState("");

  const filtradas = (dados ?? []).filter((ocorrencia) => {
    const texto = `${ocorrencia.titulo} ${ocorrencia.bairro} ${ocorrencia.descricao}`.toLowerCase();
    const combinaBusca = texto.includes(busca.trim().toLowerCase());
    const combinaStatus = status === "" || ocorrencia.status === status;
    const combinaCategoria = categoria === "" || ocorrencia.categoria === categoria;
    return combinaBusca && combinaStatus && combinaCategoria;
  });

  function limparFiltros() {
    setBusca("");
    setStatus("");
    setCategoria("");
  }

  return (
    <>
      <TituloPagina
        titulo="Ocorrências"
        subtitulo="Veja os problemas registrados pelos moradores e acompanhe a situação de cada um."
      />

      <div className={`${container} py-8`}>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-slate-700">Os dados abaixo vêm da API Java do projeto.</p>
          <Link to="/ocorrencias/nova" className={botaoPrimario}>
            Registrar nova ocorrência
          </Link>
        </div>

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
              texto="Quando alguém registrar um problema, ele vai aparecer aqui."
            >
              <Link to="/ocorrencias/nova" className={botaoPrimario}>
                Registrar ocorrência
              </Link>
            </EstadoVazio>
          </div>
        )}

        {dados && dados.length > 0 && (
          <>
            <div
              role="search"
              aria-label="Filtrar ocorrências"
              className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-4"
            >
              <div className="md:col-span-2">
                <Campo id="filtro-busca" rotulo="Buscar por título, bairro ou descrição">
                  <input
                    id="filtro-busca"
                    type="search"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Ex.: buraco, Lapa"
                    className={classeCampo}
                  />
                </Campo>
              </div>

              <Campo id="filtro-status" rotulo="Situação">
                <select
                  id="filtro-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={classeCampo}
                >
                  <option value="">Todas</option>
                  {listaStatus.map((item) => (
                    <option key={item.valor} value={item.valor}>
                      {item.nome}
                    </option>
                  ))}
                </select>
              </Campo>

              <Campo id="filtro-categoria" rotulo="Categoria">
                <select
                  id="filtro-categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className={classeCampo}
                >
                  <option value="">Todas</option>
                  {categorias.map((item) => (
                    <option key={item.valor} value={item.valor}>
                      {item.nome}
                    </option>
                  ))}
                </select>
              </Campo>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p aria-live="polite" className="text-sm text-slate-700">
                Mostrando {filtradas.length} de {dados.length} ocorrências
              </p>
              <button type="button" onClick={limparFiltros} className={`${botaoContorno} py-2`}>
                Limpar filtros
              </button>
            </div>

            {filtradas.length === 0 ? (
              <div className="mt-6">
                <EstadoVazio
                  titulo="Nenhuma ocorrência encontrada"
                  texto="Nenhum registro combina com os filtros escolhidos. Tente buscar por outro termo."
                />
              </div>
            ) : (
              <section aria-labelledby="titulo-lista" className="mt-6">
                <h2 id="titulo-lista" className="sr-only">
                  Lista de ocorrências
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtradas.map((ocorrencia) => (
                    <CardOcorrencia key={ocorrencia.id} ocorrencia={ocorrencia} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}
