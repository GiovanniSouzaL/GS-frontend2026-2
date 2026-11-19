export const API_URL: string =
  import.meta.env.VITE_API_URL ?? "https://cidade-em-dia-api.onrender.com";

export class ErroApi extends Error {
  status: number;
  detalhes: string[];

  constructor(status: number, mensagem: string, detalhes: string[] = []) {
    super(mensagem);
    this.status = status;
    this.detalhes = detalhes;
  }
}

export async function requisicao<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: opcoes.body ? { "Content-Type": "application/json" } : undefined,
    });
  } catch {
    throw new ErroApi(0, "Não foi possível conectar à API. Verifique sua internet e tente novamente.");
  }

  if (!resposta.ok) {
    let mensagem = `A API respondeu com erro ${resposta.status}.`;
    let detalhes: string[] = [];
    try {
      const corpo = await resposta.json();
      mensagem = corpo.erro ?? mensagem;
      detalhes = corpo.detalhes ?? [];
    } catch {
      detalhes = [];
    }
    throw new ErroApi(resposta.status, mensagem, detalhes);
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return (await resposta.json()) as T;
}

export function lerErro(erro: unknown): { mensagem: string; detalhes: string[] } {
  if (erro instanceof ErroApi) {
    return { mensagem: erro.message, detalhes: erro.detalhes };
  }
  return { mensagem: "Ocorreu um erro inesperado. Tente novamente.", detalhes: [] };
}
