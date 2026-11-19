import type { CategoriaOcorrencia, StatusOcorrencia } from "../types/ocorrencia";

export const categorias: { valor: CategoriaOcorrencia; nome: string }[] = [
  { valor: "BURACO", nome: "Buraco na via" },
  { valor: "ILUMINACAO", nome: "Iluminação pública" },
  { valor: "LIXO", nome: "Lixo e entulho" },
  { valor: "ALAGAMENTO", nome: "Alagamento" },
  { valor: "CALCADA", nome: "Calçada e acessibilidade" },
  { valor: "OUTRO", nome: "Outro problema" },
];

export const listaStatus: { valor: StatusOcorrencia; nome: string }[] = [
  { valor: "ABERTA", nome: "Aberta" },
  { valor: "EM_ANDAMENTO", nome: "Em andamento" },
  { valor: "RESOLVIDA", nome: "Resolvida" },
];

export function nomeDaCategoria(valor: string): string {
  return categorias.find((c) => c.valor === valor)?.nome ?? valor;
}

export function nomeDoStatus(valor: string): string {
  return listaStatus.find((s) => s.valor === valor)?.nome ?? valor;
}
