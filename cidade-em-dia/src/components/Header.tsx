import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { botaoDestaque, container } from "./estilos";

const links = [
  { to: "/", nome: "Home" },
  { to: "/ocorrencias", nome: "Ocorrências" },
  { to: "/integrantes", nome: "Integrantes" },
  { to: "/sobre", nome: "Sobre" },
  { to: "/faq", nome: "FAQ" },
  { to: "/contato", nome: "Contato" },
];

const classeLink = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "block rounded px-3 py-2 font-semibold text-blue-800 bg-blue-50"
    : "block rounded px-3 py-2 font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-800";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    if (!menuAberto) return;

    function fecharComEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuAberto(false);
    }

    window.addEventListener("keydown", fecharComEsc);
    return () => window.removeEventListener("keydown", fecharComEsc);
  }, [menuAberto]);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link to="/" onClick={fecharMenu} className="flex items-center gap-2 text-xl font-bold text-blue-800">
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center rounded bg-blue-800 text-base text-white"
          >
            C
          </span>
          Cidade em Dia
        </Link>

        <nav aria-label="Menu principal" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={classeLink}>
              {link.nome}
            </NavLink>
          ))}
          <Link to="/ocorrencias/nova" className={`${botaoDestaque} ml-3 py-2`}>
            Registrar ocorrência
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          className="cursor-pointer rounded p-2 text-slate-800 hover:bg-slate-100 lg:hidden"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            viewBox="0 0 24 24"
          >
            <path d={menuAberto ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu mobile"
        className={`border-t border-slate-200 bg-white lg:hidden ${menuAberto ? "block" : "hidden"}`}
      >
        <ul className={`${container} flex flex-col gap-1 py-3`}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} onClick={fecharMenu} className={classeLink}>
                {link.nome}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/ocorrencias/nova" onClick={fecharMenu} className={`${botaoDestaque} mt-2 w-full`}>
              Registrar ocorrência
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
