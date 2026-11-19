import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App";
import Contato from "./pages/Contato";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import IntegranteDetalhe from "./pages/IntegranteDetalhe";
import Integrantes from "./pages/Integrantes";
import NaoEncontrada from "./pages/NaoEncontrada";
import NovaOcorrencia from "./pages/NovaOcorrencia";
import OcorrenciaDetalhe from "./pages/OcorrenciaDetalhe";
import Ocorrencias from "./pages/Ocorrencias";
import Sobre from "./pages/Sobre";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/integrantes/:id", element: <IntegranteDetalhe /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/faq", element: <Faq /> },
      { path: "/contato", element: <Contato /> },
      { path: "/ocorrencias", element: <Ocorrencias /> },
      { path: "/ocorrencias/nova", element: <NovaOcorrencia /> },
      { path: "/ocorrencias/:id", element: <OcorrenciaDetalhe /> },
      { path: "*", element: <NaoEncontrada /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
