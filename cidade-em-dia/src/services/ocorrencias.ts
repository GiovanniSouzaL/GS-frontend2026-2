import type {
  Atualizacao,
  EdicaoOcorrencia,
  NovaAtualizacao,
  NovaOcorrencia,
  Ocorrencia,
} from "../types/ocorrencia";
import { requisicao } from "./api";

export function listarOcorrencias() {
  return requisicao<Ocorrencia[]>("/ocorrencias");
}

export function buscarOcorrencia(id: string) {
  return requisicao<Ocorrencia>(`/ocorrencias/${id}`);
}

export function criarOcorrencia(dados: NovaOcorrencia) {
  return requisicao<Ocorrencia>("/ocorrencias", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export function editarOcorrencia(id: number, dados: EdicaoOcorrencia) {
  return requisicao<Ocorrencia>(`/ocorrencias/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export function removerOcorrencia(id: number) {
  return requisicao<void>(`/ocorrencias/${id}`, { method: "DELETE" });
}

export function listarAtualizacoes(id: string) {
  return requisicao<Atualizacao[]>(`/ocorrencias/${id}/atualizacoes`);
}

export function criarAtualizacao(id: number, dados: NovaAtualizacao) {
  return requisicao<Atualizacao>(`/ocorrencias/${id}/atualizacoes`, {
    method: "POST",
    body: JSON.stringify(dados),
  });
}
