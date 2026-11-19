import type { ReactNode } from "react";

type EstadoVazioProps = {
  titulo: string;
  texto: string;
  children?: ReactNode;
};

export default function EstadoVazio({ titulo, texto, children }: EstadoVazioProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-400 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-slate-900">{titulo}</p>
      <p className="mt-2 text-slate-700">{texto}</p>
      {children && <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">{children}</div>}
    </div>
  );
}
