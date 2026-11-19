export interface DadosAviso {
  tipo: "sucesso" | "erro";
  texto: string;
  detalhes?: string[];
}
