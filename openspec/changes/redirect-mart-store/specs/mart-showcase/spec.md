## ADDED Requirements

### Requirement: Loja do Mart vive em mart.gwan.cloud

O site institucional SHALL NOT renderizar catálogo nem página de produto do Gwan Mart. Os caminhos
legados de loja SHALL redirecionar para o equivalente em `mart.gwan.cloud`, preservando query
string e âncora.

#### Scenario: Catálogo legado

- **WHEN** alguém abre `gwan.cloud/gwan-mart/catalog?x=1`
- **THEN** é redirecionado para `mart.gwan.cloud/catalog?x=1`

#### Scenario: Produto legado

- **WHEN** alguém abre `gwan.cloud/gwan-mart/product/ABC123`
- **THEN** é redirecionado para `mart.gwan.cloud/product/ABC123`

#### Scenario: Caminho desconhecido sob /gwan-mart

- **WHEN** alguém abre `gwan.cloud/gwan-mart/qualquer-coisa`
- **THEN** é redirecionado para a home da loja em `mart.gwan.cloud/`

#### Scenario: Acesso direto sem JavaScript

- **WHEN** um cliente HTTP pede `/gwan-mart/catalog` ou `/gwan-mart/product/<code>` ao nginx do site
- **THEN** recebe `302` com `Location` apontando para a loja, sem depender da SPA

### Requirement: Apresentação do Mart permanece no institucional

O site SHALL manter `/gwan-mart` como página de apresentação do produto, no mesmo papel das páginas
dos demais produtos do ecossistema. As chamadas para ver produtos SHALL levar à loja.

#### Scenario: Ver produtos

- **WHEN** o visitante clica em "Ver Produtos" em `/gwan-mart`
- **THEN** vai para `mart.gwan.cloud/catalog`

#### Scenario: Card de produto

- **WHEN** o visitante clica num produto em destaque em `/gwan-mart`
- **THEN** vai para `mart.gwan.cloud/product/<code>` daquele produto
