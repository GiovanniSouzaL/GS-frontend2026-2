import type { DadosAviso } from "../types/aviso";

export default function Aviso({ tipo, texto, detalhes = [] }: DadosAviso) {
  const cores =
    tipo === "sucesso"
      ? "border-green-300 bg-green-50 text-green-900"
      : "border-red-300 bg-red-50 text-red-900";

  return (
    <div role={tipo === "sucesso" ? "status" : "alert"} className={`rounded-lg border p-4 ${cores}`}>
      <p className="font-semibold">{texto}</p>
      {detalhes.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-sm">
          {detalhes.map((detalhe) => (
            <li key={detalhe}>{detalhe}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
