# Cidade em Dia

Zeladoria colaborativa: o cidadão registra problemas da cidade (buraco, lâmpada queimada, lixo acumulado, alagamento, calçada quebrada) e acompanha cada caso até ele ser resolvido.

Projeto de **Front-End Design Engineering** da **Global Solution 2026/2 (CitizenTech)** da FIAP.

## Links

| Item | Link |
| --- | --- |
| Repositório GitHub (front-end) | https://github.com/GiovanniSouzaL/GS-frontend2026-2 |
| Repositório GitHub (API Java) | https://github.com/GiovanniSouzaL/Apifrontend |
| Vídeo no YouTube | será feita em conjunto com o video da aprensentação completa do projeto(foi dito pelo professor de fazer a apresentação em conjunto do video) |

## Objetivo

Aproximar o cidadão da prefeitura. Quem vê um problema urbano quase nunca sabe onde avisar nem se alguém já avisou. O Cidade em Dia resolve isso com:

- registro de ocorrência com categoria, bairro e descrição;
- número de protocolo para acompanhar o caso;
- linha do tempo com as atualizações de cada caso;
- situação clara: **Aberta**, **Em andamento** ou **Resolvida**.

Alinhado aos ODS 11 (cidades sustentáveis), 9 (infraestrutura) e 10 (redução das desigualdades).

## Funcionalidades

- Home com resumo das ocorrências (dados da API) e as últimas registradas.
- Lista com busca por texto e filtros por situação e categoria.
- Registro de ocorrência com formulário validado.
- Detalhe com linha do tempo, troca de situação, comentário e exclusão com confirmação.
- Formulário de contato.
- Páginas Integrantes, Sobre e FAQ.
- Estados de carregamento, erro (com "Tentar novamente") e lista vazia.
- Layout responsivo, menu mobile e navegação por teclado.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 19 | Interface em componentes |
| Vite 8 | Servidor de desenvolvimento e build |
| TypeScript 7 | Tipagem de props, estados e dados da API |
| Tailwind CSS 4 | Estilização e responsividade |
| React Router 8 | Rotas estáticas e com parâmetro |
| React Hook Form + Yup | Formulários e validação |
| Fetch API | Chamadas HTTP (sem Axios) |
| oxlint | Análise estática do código |
| Java 21 | API REST usada pelo front (repositório separado) |

## Estrutura de pastas

```
├── public/            favicon e foto do integrante
├── src/
│   ├── components/    Header, Footer, Campo, Aviso, CardOcorrencia, StatusBadge...
│   ├── data/          categorias, FAQ e integrantes
│   ├── hooks/         useBusca e useTitulo
│   ├── pages/         uma página por rota
│   ├── services/      chamadas à API com fetch
│   ├── types/         interfaces TypeScript
│   ├── utils/         formatação de datas
│   ├── App.tsx        layout comum
│   └── main.tsx       rotas
├── index.html
├── vite.config.ts
└── package.json
```

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/integrantes` | Integrantes |
| `/integrantes/:id` | Detalhe do integrante |
| `/sobre` | Sobre |
| `/faq` | Perguntas frequentes |
| `/contato` | Contato |
| `/ocorrencias` | Lista de ocorrências |
| `/ocorrencias/nova` | Registrar ocorrência |
| `/ocorrencias/:id` | Detalhe e acompanhamento |
| `*` | Página não encontrada |

## Integração com a API Java

A URL base fica em `src/services/api.ts`: usa a variável `VITE_API_URL` quando existir e, se não existir, http://localhost:8080. Todas as chamadas passam pela função `requisicao`, que usa `fetch` e devolve os dados tipados.

| Método | Endpoint | Uso |
| --- | --- | --- |
| GET | `/ocorrencias` | Home e lista |
| GET | `/ocorrencias/{id}` | Detalhe |
| POST | `/ocorrencias` | Registrar ocorrência |
| PUT | `/ocorrencias/{id}` | Alterar situação |
| DELETE | `/ocorrencias/{id}` | Excluir |
| GET | `/ocorrencias/{id}/atualizacoes` | Linha do tempo |
| POST | `/ocorrencias/{id}/atualizacoes` | Comentar |
| POST | `/contatos` | Formulário de contato |

Os dados da API ficam em memória e voltam aos exemplos iniciais quando o servidor reinicia.

## Como executar

Pré-requisito: **Node.js 22.22 ou superior**.

```bash
git clone https://github.com/GiovanniSouzaL/GS-frontend2026-2.git
cd GS-frontend2026-2
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173). Se estiver usando o .zip, pule o `git clone` e rode `npm install` e `npm run dev` dentro da pasta descompactada.

```bash
npm run build     # verifica os tipos e gera a pasta dist
npm run lint      # roda o oxlint
```

Para o site mostrar dados, rode a API Java na sua máquina (veja o README do repositório da API). Ela sobe em http://localhost:8080, que é o endereço padrão do front. Para usar outro endereço, crie `.env.local` na raiz com `VITE_API_URL=...` e reinicie o `npm run dev`.

## Integrante

| Nome | RM | Turma |
| --- | --- | --- |
| Giovanni de Souza Lima | 556536 | 1TDSPI |

Projeto individual.

## Contato

- GitHub: https://github.com/GiovanniSouzaL
- LinkedIn: https://www.linkedin.com/in/giovanni-de-souza-lima-2770943b5/