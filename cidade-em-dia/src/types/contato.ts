export interface NovoContato {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export interface Contato extends NovoContato {
  id: number;
  dataCriacao: string;
}
