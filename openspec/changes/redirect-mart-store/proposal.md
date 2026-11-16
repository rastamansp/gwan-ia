## Why

A loja do Gwan Mart ganhou casa própria em `mart.gwan.cloud` (repo `gwan-mart-backend`, pasta
`web/`), com as mesmas funcionalidades que o institucional tinha em `/gwan-mart/catalog` e
`/gwan-mart/product/:code`. Manter as duas vitrines significa fazer toda melhoria de loja duas
vezes, e o visitante encontra duas lojas diferentes para o mesmo catálogo.

Decisão do mantenedor (2026-11-16): a loja fica só em `mart.gwan.cloud`. O institucional mantém a
página de apresentação do produto, como faz com Events, Work, AR e os demais, e redireciona o que
era loja.

## What Changes

- `/gwan-mart` continua no institucional como **página de apresentação**. O botão "Ver Produtos"
  passa a levar ao catálogo em `mart.gwan.cloud`.
- `/gwan-mart/catalog` e `/gwan-mart/product/:code` **redirecionam** para `/catalog` e
  `/product/:code` da loja, preservando query string e âncora. O nginx responde **302** em acesso
  direto, e a SPA tem uma rota de fallback para a navegação interna e para o dev.
- Os cards de produto em destaque da apresentação apontam para a página do produto na loja.
- Novo `VITE_GWAN_MART_URL` (default `https://mart.gwan.cloud/`), no padrão das outras URLs de
  produto do `env.ts`.
- **BREAKING (interno)**: saem as páginas `gwan-mart/CatalogPage` e `gwan-mart/ProductPage` e o que só
  elas usavam: `GwanMartChatWidget`, `ProductCarousel`, `useGwanMartChat`, `useProductsWithFilters` e
  `useProduct`. O bot `/bot-gwan-mart` usa outros componentes e não muda.

Fora do escopo: o **admin de produtos** (`/admin/mart`) continua aqui e segue escrevendo pelo
`gwan-backend`. Levar o admin para a loja é a issue #13 do `gwan-mart-backend`. O **login** do
institucional (gwan-backend) e o da loja (gwan-mart-backend) continuam separados, por decisão.

## Impact

- **Ordem de deploy**: esta change **só pode ir ao ar depois de `mart.gwan.cloud` responder**. Hoje
  o domínio nem tem DNS, e publicar antes mandaria o visitante para um endereço morto.
- 302 de propósito: 301 fica em cache no navegador e não se desfaz. Trocar por 301 quando a loja
  estiver estável.
- O domínio da loja está fixo no `nginx.conf`, porque o nginx não lê `VITE_*`. Mudar o domínio exige
  editar os dois lugares.
- Os links que o bot do Mart devolve já usam `FRONTEND_URL=https://mart.gwan.cloud`, então não
  dependem deste redirecionamento.
