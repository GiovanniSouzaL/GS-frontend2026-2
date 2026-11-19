import { Link } from "react-router";
import { container } from "./estilos";

const ano = new Date().getFullYear();

const linksRodape = [
  { to: "/ocorrencias", nome: "Ocorrências" },
  { to: "/ocorrencias/nova", nome: "Registrar ocorrência" },
  { to: "/sobre", nome: "Sobre o projeto" },
  { to: "/faq", nome: "Perguntas frequentes" },
  { to: "/contato", nome: "Contato" },
];

export default function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 text-slate-300">
      <div className={`${container} grid gap-8 py-10 md:grid-cols-3`}>
        <div>
          <p className="text-lg font-bold text-white">Cidade em Dia</p>
          <p className="mt-2 text-sm">
            Zeladoria colaborativa: o cidadão registra o problema e acompanha a solução.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <p className="font-semibold text-white">Navegação</p>
          <ul className="mt-2 space-y-1 text-sm">
            {linksRodape.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white hover:underline">
                  {link.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-white">Projeto acadêmico</p>
          <p className="mt-2 text-sm">
            Global Solution 2026/2 · CitizenTech
            <br />
            FIAP · Front-End Design Engineering
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700 px-4 py-4 text-center text-sm">
        © {ano} Giovanni de Souza Lima · RM 556536 · Turma 1TDSPI
      </div>
    </footer>
  );
}
