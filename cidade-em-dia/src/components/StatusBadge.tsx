import { nomeDoStatus } from "../data/categorias";
import type { StatusOcorrencia } from "../types/ocorrencia";

const cores: Record<StatusOcorrencia, string> = {
  ABERTA: "bg-red-100 text-red-800",
  EM_ANDAMENTO: "bg-amber-100 text-amber-900",
  RESOLVIDA: "bg-green-100 text-green-800",
};

type StatusBadgeProps = {
  status: StatusOcorrencia;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${cores[status]}`}>
      {nomeDoStatus(status)}
    </span>
  );
}
