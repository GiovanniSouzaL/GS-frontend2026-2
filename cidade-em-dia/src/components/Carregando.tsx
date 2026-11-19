import { useEffect, useState } from "react";

type CarregandoProps = {
  texto?: string;
};

export default function Carregando({ texto = "Carregando..." }: CarregandoProps) {
  const [demorando, setDemorando] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDemorando(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div role="status" className="flex flex-col items-center gap-3 py-12 text-slate-700">
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-700"
      />
      <p>{texto}</p>
      {demorando && (
        <p className="max-w-sm text-center text-sm">
          A API está acordando, isso pode levar até 1 minuto na primeira vez.
        </p>
      )}
    </div>
  );
}
