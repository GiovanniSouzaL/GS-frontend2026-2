import type { ReactNode } from "react";

type CampoProps = {
  id: string;
  rotulo: string;
  erro?: string;
  obrigatorio?: boolean;
  children: ReactNode;
};

export default function Campo({ id, rotulo, erro, obrigatorio = false, children }: CampoProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium text-slate-900">
        {rotulo}
        {obrigatorio && (
          <span aria-hidden="true" className="text-red-700">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {erro && (
        <span id={`${id}-erro`} role="alert" className="text-sm font-medium text-red-700">
          {erro}
        </span>
      )}
    </div>
  );
}
