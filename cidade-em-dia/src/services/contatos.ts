import type { Contato, NovoContato } from "../types/contato";
import { requisicao } from "./api";

export function enviarContato(dados: NovoContato) {
  return requisicao<Contato>("/contatos", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}
