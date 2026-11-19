import { useState } from "react";
import { Link } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Aviso from "../components/Aviso";
import Campo from "../components/Campo";
import TituloPagina from "../components/TituloPagina";
import { botaoContorno, botaoPrimario, classeCampo, container } from "../components/estilos";
import { categorias } from "../data/categorias";
import { useTitulo } from "../hooks/useTitulo";
import { lerErro } from "../services/api";
import { criarOcorrencia } from "../services/ocorrencias";
import type { DadosAviso } from "../types/aviso";
import type { CategoriaOcorrencia, Ocorrencia } from "../types/ocorrencia";

const schema = yup.object({
  nomeCidadao: yup
    .string()
    .trim()
    .required("Informe o seu nome.")
    .min(2, "O nome precisa ter pelo menos 2 letras.")
    .max(60, "O nome pode ter no máximo 60 caracteres."),
  categoria: yup.string().required("Escolha uma categoria."),
  titulo: yup
    .string()
    .trim()
    .required("Informe um título para a ocorrência.")
    .min(5, "O título precisa ter pelo menos 5 caracteres.")
    .max(80, "O título pode ter no máximo 80 caracteres."),
  bairro: yup
    .string()
    .trim()
    .required("Informe o bairro.")
    .min(2, "O bairro precisa ter pelo menos 2 letras.")
    .max(60, "O bairro pode ter no máximo 60 caracteres."),
  endereco: yup.string().trim().max(120, "O endereço pode ter no máximo 120 caracteres.").default(""),
  descricao: yup
    .string()
    .trim()
    .required("Descreva o problema.")
    .min(10, "A descrição precisa ter pelo menos 10 caracteres.")
    .max(500, "A descrição pode ter no máximo 500 caracteres."),
});

type DadosFormulario = yup.InferType<typeof schema>;

export default function NovaOcorrencia() {
  useTitulo("Registrar ocorrência");

  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState<DadosAviso | null>(null);
  const [criada, setCriada] = useState<Ocorrencia | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<DadosFormulario>({
    resolver: yupResolver(schema),
    defaultValues: { nomeCidadao: "", categoria: "", titulo: "", bairro: "", endereco: "", descricao: "" },
  });

  const descricao = useWatch({ control, name: "descricao" });
  const tamanhoDescricao = descricao?.length ?? 0;

  async function enviar(dados: DadosFormulario) {
    setEnviando(true);
    setAviso(null);

    try {
      const nova = await criarOcorrencia({
        ...dados,
        categoria: dados.categoria as CategoriaOcorrencia,
      });
      setCriada(nova);
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
        titulo="Registrar ocorrência"
        subtitulo="Conte qual problema você encontrou. Quanto mais detalhes, mais fácil fica para a equipe resolver."
      />

      <div className={`${container} py-8`}>
        {criada ? (
          <div className="mx-auto max-w-2xl space-y-4">
            <Aviso
              tipo="sucesso"
              texto={`Ocorrência registrada com sucesso! Número do protocolo: ${criada.id}.`}
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to={`/ocorrencias/${criada.id}`} className={botaoPrimario}>
                Ver a ocorrência
              </Link>
              <button type="button" onClick={() => setCriada(null)} className={botaoContorno}>
                Registrar outra
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(enviar)}
            noValidate
            className="mx-auto max-w-2xl space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-700">Os campos marcados com * são obrigatórios.</p>

            {aviso && <Aviso tipo={aviso.tipo} texto={aviso.texto} detalhes={aviso.detalhes} />}

            <Campo id="nomeCidadao" rotulo="Seu nome" obrigatorio erro={errors.nomeCidadao?.message}>
              <input
                id="nomeCidadao"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.nomeCidadao}
                aria-describedby={errors.nomeCidadao ? "nomeCidadao-erro" : undefined}
                className={classeCampo}
                {...register("nomeCidadao")}
              />
            </Campo>

            <Campo id="categoria" rotulo="Categoria" obrigatorio erro={errors.categoria?.message}>
              <select
                id="categoria"
                aria-invalid={!!errors.categoria}
                aria-describedby={errors.categoria ? "categoria-erro" : undefined}
                className={classeCampo}
                {...register("categoria")}
              >
                <option value="">Selecione...</option>
                {categorias.map((categoria) => (
                  <option key={categoria.valor} value={categoria.valor}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </Campo>

            <Campo id="titulo" rotulo="Título" obrigatorio erro={errors.titulo?.message}>
              <input
                id="titulo"
                type="text"
                placeholder="Ex.: Buraco grande na Rua das Acácias"
                aria-invalid={!!errors.titulo}
                aria-describedby={errors.titulo ? "titulo-erro" : undefined}
                className={classeCampo}
                {...register("titulo")}
              />
            </Campo>

            <div className="grid gap-5 md:grid-cols-2">
              <Campo id="bairro" rotulo="Bairro" obrigatorio erro={errors.bairro?.message}>
                <input
                  id="bairro"
                  type="text"
                  aria-invalid={!!errors.bairro}
                  aria-describedby={errors.bairro ? "bairro-erro" : undefined}
                  className={classeCampo}
                  {...register("bairro")}
                />
              </Campo>

              <Campo id="endereco" rotulo="Endereço (opcional)" erro={errors.endereco?.message}>
                <input
                  id="endereco"
                  type="text"
                  placeholder="Rua, número ou referência"
                  aria-invalid={!!errors.endereco}
                  aria-describedby={errors.endereco ? "endereco-erro" : undefined}
                  className={classeCampo}
                  {...register("endereco")}
                />
              </Campo>
            </div>

            <Campo id="descricao" rotulo="Descrição do problema" obrigatorio erro={errors.descricao?.message}>
              <textarea
                id="descricao"
                rows={5}
                aria-invalid={!!errors.descricao}
                aria-describedby={errors.descricao ? "descricao-erro" : undefined}
                className={classeCampo}
                {...register("descricao")}
              />
              <span className="text-sm text-slate-700">{tamanhoDescricao}/500 caracteres</span>
            </Campo>

            <button type="submit" disabled={enviando} className={`${botaoPrimario} w-full sm:w-auto`}>
              {enviando ? "Enviando..." : "Registrar ocorrência"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
