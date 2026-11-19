import { useEffect, useState } from "react";
import { lerErro } from "../services/api";

export function useBusca<T>(buscar: () => Promise<T>) {
  const [dados, setDados] = useState<T | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;

    buscar()
      .then((resultado) => {
        if (ativo) setDados(resultado);
      })
      .catch((e) => {
        if (ativo) setErro(lerErro(e).mensagem);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [buscar, tentativa]);

  function recarregar() {
    setCarregando(true);
    setErro("");
    setTentativa(tentativa + 1);
  }

  return { dados, carregando, erro, recarregar };
}
