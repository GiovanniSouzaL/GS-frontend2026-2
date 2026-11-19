import { Link } from "react-router";
import EstadoVazio from "../components/EstadoVazio";
import TituloPagina from "../components/TituloPagina";
import { botaoContorno, botaoPrimario, container } from "../components/estilos";
import { useTitulo } from "../hooks/useTitulo";

export default function NaoEncontrada() {
  useTitulo("Página não encontrada");

  return (
    <>
      <TituloPagina titulo="Página não encontrada" />
      <div className={`${container} py-10`}>
        <EstadoVazio titulo="Erro 404" texto="O endereço que você tentou abrir não existe no Cidade em Dia.">
          <Link to="/" className={botaoPrimario}>
            Voltar para a Home
          </Link>
          <Link to="/ocorrencias" className={botaoContorno}>
            Ver ocorrências
          </Link>
        </EstadoVazio>
      </div>
    </>
  );
}
