import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-blue-800"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="grow focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
