import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Aviso from "../components/Aviso";
import Campo from "../components/Campo";
import TituloPagina from "../components/TituloPagina";
import { botaoContorno, botaoPrimario, classeCampo, container } from "../components/estilos";
import { integrantes } from "../data/integrantes";
import { useTitulo } from "../hooks/useTitulo";
import { lerErro } from "../services/api";
import { enviarContato } from "../services/contatos";
import type { DadosAviso } from "../types/aviso";

const schema = yup.object({
  nome: yup
    .string()
    .trim()
    .required("Informe o seu nome.")
    .min(2, "O nome precisa ter pelo menos 2 letras.")
    .max(60, "O nome pode ter no máximo 60 caracteres."),
  email: yup
    .string()
    .trim()
    .required("Informe o seu e-mail.")
    .max(100, "O e-mail pode ter no máximo 100 caracteres.")
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Digite um e-mail válido, como nome@exemplo.com."),
  assunto: yup
    .string()
    .trim()
    .required("Informe o assunto.")
    .min(3, "O assunto precisa ter pelo menos 3 caracteres.")
    .max(80, "O assunto pode ter no máximo 80 caracteres."),
  mensagem: yup
    .string()
    .trim()
    .required("Escreva a sua mensagem.")
    .min(10, "A mensagem precisa ter pelo menos 10 caracteres.")
    .max(500, "A mensagem pode ter no máximo 500 caracteres."),
});

type DadosContato = yup.InferType<typeof schema>;

export default function Contato() {
  useTitulo("Contato");
  const autor = integrantes[0];

  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState<DadosAviso | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DadosContato>({
    resolver: yupResolver(schema),
    defaultValues: { nome: "", email: "", assunto: "", mensagem: "" },
  });

  async function enviar(dados: DadosContato) {
    setEnviando(true);
    setAviso(null);

    try {
      await enviarContato(dados);
      setAviso({ tipo: "sucesso", texto: `Mensagem enviada com sucesso! Obrigado pelo contato, ${dados.nome}.` });
      reset();
    } catch (e) {
      const { mensagem, detalhes } = lerErro(e);
      setAviso({ tipo: "erro", texto: mensagem, detalhes });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <TituloPagina
        titulo="Contato"
        subtitulo="Tem uma dúvida, sugestão ou elogio sobre o projeto? Escreva para a gente."
      />

      <div className={`${container} grid gap-8 py-10 lg:grid-cols-3`}>
        <section
          aria-labelledby="titulo-formulario"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <h2 id="titulo-formulario" className="text-xl font-bold text-slate-900">
            Envie uma mensagem
          </h2>

          <form onSubmit={handleSubmit(enviar)} noValidate className="mt-4 space-y-5">
            <p className="text-sm text-slate-700">Os campos marcados com * são obrigatórios.</p>

            {aviso && <Aviso tipo={aviso.tipo} texto={aviso.texto} detalhes={aviso.detalhes} />}

            <div className="grid gap-5 md:grid-cols-2">
              <Campo id="nome" rotulo="Nome" obrigatorio erro={errors.nome?.message}>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? "nome-erro" : undefined}
                  className={classeCampo}
                  {...register("nome")}
                />
              </Campo>

              <Campo id="email" rotulo="E-mail" obrigatorio erro={errors.email?.message}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-erro" : undefined}
                  className={classeCampo}
                  {...register("email")}
                />
              </Campo>
            </div>

            <Campo id="assunto" rotulo="Assunto" obrigatorio erro={errors.assunto?.message}>
              <input
                id="assunto"
                type="text"
                aria-invalid={!!errors.assunto}
                aria-describedby={errors.assunto ? "assunto-erro" : undefined}
                className={classeCampo}
                {...register("assunto")}
              />
            </Campo>

            <Campo id="mensagem" rotulo="Mensagem" obrigatorio erro={errors.mensagem?.message}>
              <textarea
                id="mensagem"
                rows={5}
                aria-invalid={!!errors.mensagem}
                aria-describedby={errors.mensagem ? "mensagem-erro" : undefined}
                className={classeCampo}
                {...register("mensagem")}
              />
            </Campo>

            <button type="submit" disabled={enviando} className={`${botaoPrimario} w-full sm:w-auto`}>
              {enviando ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        </section>

        <aside aria-labelledby="titulo-canais" className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 id="titulo-canais" className="text-xl font-bold text-slate-900">
            Outros canais
          </h2>
          <p className="mt-2 text-slate-800">
            Projeto desenvolvido por {autor.nome} (RM {autor.rm}), aluno da FIAP.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <a href={autor.github} target="_blank" rel="noreferrer" className={botaoContorno}>
              GitHub
            </a>
            <a href={autor.linkedin} target="_blank" rel="noreferrer" className={botaoContorno}>
              LinkedIn
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
