# Task Manager - Vue 3

Aplicação de lista de tarefas desenvolvida com **Vue 3**, **Pinia** e **TailwindCSS**, utilizando **json-server** como backend mock para simular uma API REST.

## 🚀 Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/) — Framework JavaScript para construção de interfaces.
- [Vite](https://vitejs.dev/) — Ferramenta de build e dev server.
- [Pinia](https://pinia.vuejs.org/) — Gerenciador de estado.
- [TailwindCSS](https://tailwindcss.com/) — Framework CSS utilitário.
- [Axios](https://axios-http.com/) — Cliente HTTP para requisições.
- [Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller) — Renderização otimizada de listas.
- [json-server](https://github.com/typicode/json-server) — Mock de API REST.
- [Vitest](https://vitest.dev/) e [Vue Test Utils](https://test-utils.vuejs.org/) — Testes unitários.

---

## 📦 Requisitos

- Node.js **>= 22**
- npm **>= 9** (ou compatível)

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/tiagokb/tasks-manager.git
cd tasks-manager
```

Instale as dependências:
```bash
npm install
```

## ▶️ Executando o Projeto

Iniciar o backend mock (json-server):
```bash
npx json-server db.json
```

Rodar o frontend:
```bash
npm run dev
```

A aplicação estará disponível em:
``
http://localhost:5173
``

## 📄 Gerando o Banco de Dados Mock
Caso queira popular o db.json com dados de teste, você pode utilizar o seguinte template no site [JSON Generator](https://app.json-generator.com/):

````
JG.repeat(3000, { // gera 3000 tasks  
    id: JG.index(), // ID incremental
    title: JG.loremIpsum({ units: 'words', count: JG.integer(1, 2) }), // título curto
    status: JG.random("Em andamento", "Concluída", "Atrasada"), // status aleatório
    createdAt: JG.date(new Date()),
    updatedAt: JG.date(new Date()),
});
````

### Como utilizar:

- Acesse o JSON Generator.
- Cole o código acima e clique em Generate.
- Copie o array gerado.
- Abra o arquivo db.json do projeto.
- Substitua o conteúdo de tasks pelo array gerado, por exemplo:

```json
{
  "tasks": [
    { "id": 0, "title": "Lorem Ipsum", "status": "Concluída", "createdAt": "...", "updatedAt": "..." },
    ...
  ]
}
```

- Salve o arquivo e reinicie o json-server.

## 🛠 Scripts Disponíveis

``npm run dev`` — Executa o servidor de desenvolvimento.

``npm run build`` — Cria a build de produção.

``npm run preview`` — Visualiza a build localmente.

``npm run test:unit`` — Executa a suite de testes com Vitest.

## 🗂 Estrutura do Projeto

````
src/
  components/      → Componentes reutilizáveis (BaseInput, BaseSelect, BaseButton, etc.)
  stores/          → Pinia stores (lógica de estado e integração com API)
  views/           → Páginas principais
  __tests__/       → Testes unitários dos componentes e funcionalidades
  assets/          → Estilos, imagens e fontes
````

## 🏗 Decisões de Arquitetura


Utilização do Pinia como camada entre a View e o backend, mantendo o estado global e centralizando a lógica de negócios.

Uso do json-server apenas como mock simples para fins de demonstração.

Implementação de componentes base reutilizáveis para inputs, selects e botões, garantindo consistência visual e de comportamento.

Paginação e filtros implementados no front-end (store) após o carregamento dos dados, priorizando uma UX fluida para o usuário.
⚠️ Importante: em um cenário real, a paginação e filtragem deveriam ser feitas diretamente pelo backend.

Separação clara entre lógica, apresentação e estado para facilitar manutenção e evolução.

## 🧪 Testes

Implementados com Vitest e Vue Test Utils.

Testes focam em:

Renderização inicial dos componentes.

Interações do usuário (ex.: preenchimento de formulários, cliques).

Emissão de eventos para o componente pai.

## ⚠️ Limitações Conhecidas

Paginação e filtragem são simuladas no lado do cliente (mock).

Não há autenticação.

Backend é apenas mockado, sem persistência real.

## 💡 Possíveis Melhorias

Integração com uma API real.

Adição de autenticação e autorização.

Melhoria na cobertura de testes.

Paginação e filtragem no lado do servidor.

Acessibilidade (ARIA, navegação por teclado).

### Feito com ❤️ e Vue 3.