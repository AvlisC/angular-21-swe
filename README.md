# Angular SWE – Front-end

Aplicação front-end desenvolvida em **Angular** com foco em **boas práticas, arquitetura escalável e conceitos modernos do framework**, servindo como base de estudo e demonstração técnica.

O projeto simula um **catálogo de produtos**, com funcionalidades de listagem, criação, edição e exclusão, consumindo uma API.

---

## 🎯 Objetivo do Projeto

- Entender e aplicar conceitos modernos do Angular 21+.
- Construir uma aplicação escalável e de fácil manutenção (enterprise-first).
- Utilizar boas práticas de arquitetura front-end, pensando em performance e developer experience.
- Usar na prática Signals, RxJS, onPush strategy, standalone e interceptors.
- Entender conceitos de zoneless, dumb vs smart components, estados derivados, instâncias de estado e tree shaking.

---

## 🧱 Arquitetura do Projeto

O projeto segue a **Feature-Based Architecture**, onde cada funcionalidade é organizada de forma isolada como uma feature onde cada feature é autossuficiente.

```text
src/
 ├── app/
 │   ├── core/
 │   │   ├── constants/        # Constantes globais (rotas)
 │   │   ├── http/             # Configuração de API
 │   │   └── interceptors/     # Interceptors HTTP
 │   │
 │   ├── features/             # Features isoladas
 │   │   └── products/
 │   │       └── pages/
 │   │           └── products-list/
 │   │           └── products-form/
 │   │       └── mocks/
 │   │       └── services/
 │   │       └── models/
 │   │       └── products.routes.ts   #Rotas das páginas (products)
 │   │       └── products.store.ts    #Controle de estados
 │   │
 │   ├── shared/               # Componentes reutilizáveis
 │   │   ├── icons/
 │   │   ├── ui/
 │   │   └── utils/
 │   │
 │   ├── app.config.ts         # Configuração global da aplicação
 │   ├── app.routes.ts         # Rotas principais
 │   └── app.ts
 │
 ├── assets/                   # Assets públicos (svg, imagens)
 ├── styles/                   # Estilos globais
 └── main.ts                   # Entry point
```

---

## 🚀 Funcionalidades Técnicas Implementadas

Além do uso de novos métodos da versão mais recente do Angular, também foi utilizado convenções e boas práticas que auxiliam manutenção e facilitam a leitura de código para outros desenvolvedores.

✅ Lazy Loading

- Aplicar lazy loading às rotas para carregamento sob demanda
- Reduzindo alta carga de dados ao client, mostrando apenas o que está visível

✅ Signals

- Uso de signals para controle de estado global e local (apenas dentro da feature).
- Estado derivado para armazenamento de cálculos (computed signals).

✅ OnePush Change Detection Strategy

- Controle de reatividade explícita nos componentes, reduzindo re-renderizações desnecessárias.
- Aumenta previsibilidade das re-renderizações.

✅ Standalone

- Redução de boiler plate com os ngModules

✅ Control Flow

- Mudança de diretivas condicionais no template, com o uso de @if, @for, @switch

✅ Componentização de SVG

- Para facilitar a usabilidade em diversos componentes, podendo aplicar dinamicamente cores e tamanhos diferentes.

✅ Centralização de rotas

- Para reduzir o uso de rotas hardcoded, uma boa prática é usar arquivos constantes, facilitando as trocas de nomenclaturas de rotas.

✅ Interceptor HTTP Global

- Centralizar tratamento de erros HTTP em um único lugar.

---
