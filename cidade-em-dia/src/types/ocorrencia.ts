export type StatusOcorrencia = "ABERTA" | "EM_ANDAMENTO" | "RESOLVIDA";

export type CategoriaOcorrencia =
  | "BURACO"
  | "ILUMINACAO"
  | "LIXO"
  | "ALAGAMENTO"
  | "CALCADA"
  | "OUTRO";

export interface Ocorrencia {
  id: number;
  titulo: string;
  descricao: string;
  categoria: CategoriaOcorrencia;
  bairro: string;
  endereco: string;
  status: StatusOcorrencia;
  nomeCidadao: string;
  dataCriacao: string;
}

export interface NovaOcorrencia {
  titulo: string;
  descricao: string;
  categoria: CategoriaOcorrencia;
  bairro: string;
  endereco: string;
  nomeCidadao: string;
}

export interface EdicaoOcorrencia extends NovaOcorrencia {
  status: StatusOcorrencia;
}

export interface Atualizacao {
  id: number;
  ocorrenciaId: number;
  mensagem: string;
  autor: string;
  dataCriacao: string;
}

export interface NovaAtualizacao {
  mensagem: string;
  autor: string;
}
