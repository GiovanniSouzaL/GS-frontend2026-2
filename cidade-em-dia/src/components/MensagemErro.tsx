type MensagemErroProps = {
  mensagem: string;
  detalhes?: string[];
  aoTentarNovamente?: () => void;
};

export default function MensagemErro({ mensagem, detalhes = [], aoTentarNovamente }: MensagemErroProps) {
  return (
    <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-900">
      <p className="font-semibold">Ops, algo deu errado</p>
      <p className="mt-1">{mensagem}</p>
      {detalhes.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-sm">
          {detalhes.map((detalhe) => (
            <li key={detalhe}>{detalhe}</li>
          ))}
        </ul>
      )}
      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="mt-3 cursor-pointer rounded bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
