## 1. Configuração

- [x] 1.1 `VITE_GWAN_MART_URL` no `env.ts` (default `https://mart.gwan.cloud/`)
- [x] 1.2 Helper `src/utils/martStore.ts`: URL da loja, URL de produto e mapeamento do caminho legado

## 2. Redirecionamento

- [x] 2.1 Rota de fallback na SPA (`/gwan-mart/*`) que redireciona com `location.replace`
- [x] 2.2 `nginx.conf`: 302 para `/gwan-mart/catalog` e `/gwan-mart/product/<code>`

## 3. Links

- [x] 3.1 "Ver Produtos" em `/gwan-mart` aponta para o catálogo da loja
- [x] 3.2 `MartProductCard` aponta para o produto na loja

## 4. Limpeza

- [x] 4.1 Remover `gwan-mart/CatalogPage`, `gwan-mart/ProductPage` e o código que só elas usavam
      (`GwanMartChatWidget`, `ProductCarousel`, `useGwanMartChat`, `useProductsWithFilters`, `useProduct`)

## 5. Verificação

- [x] 5.1 `npm run type-check` e `npm run build` passam; os arquivos tocados passam no ESLint sem erro.
      O `npm run lint` do repo inteiro segue com 8 erros **que já existiam no `main`** (`import/@export/…`
      e `src/presentation/chatbot-showcase/ChatBubble.tsx`), fora desta change
- [x] 5.2 nginx com o build responde 302 com `Location` correto nos caminhos legados (catálogo com e sem
      barra, com query string, produto, produto com `%20` — que expôs e corrigiu o uso da URI decodificada)
      e 200 em `/gwan-mart`, `/bot-gwan-mart` e `/gwan-mart-x/catalog`
- [x] 5.3 No navegador, contra o nginx com o build: `/gwan-mart` renderiza a apresentação com "Ver Produtos"
      em `https://mart.gwan.cloud/catalog`, e `/gwan-mart/qualquer` sai para `mart.gwan.cloud` (onde hoje dá
      erro de certificado, porque a loja não está publicada — ver 5.4)
- [ ] 5.4 Deploy pelo Portainer **somente depois** de `mart.gwan.cloud` responder (issue #4 do
      `gwan-mart-backend`), conferindo o redirecionamento em produção
