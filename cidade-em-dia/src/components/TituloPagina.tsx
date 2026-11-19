import { container } from "./estilos";

type TituloPaginaProps = {
  titulo: string;
  subtitulo?: string;
};

export default function TituloPagina({ titulo, subtitulo }: TituloPaginaProps) {
  return (
    <section className="bg-blue-800 text-white">
      <div className={`${container} py-10`}>
        <h1 className="text-3xl font-bold md:text-4xl">{titulo}</h1>
        {subtitulo && <p className="mt-3 max-w-2xl text-lg text-blue-100">{subtitulo}</p>}
      </div>
    </section>
  );
}
