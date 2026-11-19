import { Link } from "react-router";
import { nomeDaCategoria } from "../data/categorias";
import type { Ocorrencia } from "../types/ocorrencia";
import { formatarData } from "../utils/formatar";
import StatusBadge from "./StatusBadge";

type CardOcorrenciaProps = {
  ocorrencia: Ocorrencia;
};

export default function CardOcorrencia({ ocorrencia }: CardOcorrenciaProps) {
  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-700">{nomeDaCategoria(ocorrencia.categoria)}</span>
        <StatusBadge status={ocorrencia.status} />
      </div>

      <h3 className="mt-3 text-lg font-bold wrap-break-word text-slate-900">{ocorrencia.titulo}</h3>
      <p className="mt-1 text-sm text-slate-700">
        {ocorrencia.bairro} · {formatarData(ocorrencia.dataCriacao)}
      </p>
      <p className="mt-3 line-clamp-3 grow wrap-break-word text-slate-800">{ocorrencia.descricao}</p>

      <Link
        to={`/ocorrencias/${ocorrencia.id}`}
        aria-label={`Ver detalhes da ocorrência: ${ocorrencia.titulo}`}
        className="mt-4 font-semibold text-blue-700 hover:underline"
      >
        Ver detalhes →
      </Link>
    </article>
  );
}
