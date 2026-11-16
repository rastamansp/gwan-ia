import env from '../config/env';

/**
 * A loja do Gwan Mart vive em mart.gwan.cloud (repo gwan-mart-backend, pasta
 * web/). O institucional guarda só a página de apresentação em /gwan-mart.
 *
 * As rotas da loja são `/catalog` e `/product/:code`. A segunda é a mesma que a
 * API do Mart monta em `buildProductUrl()`, então mudar uma sem a outra quebra
 * os links que o bot devolve.
 */
const storeBase = env.VITE_GWAN_MART_URL.replace(/\/+$/, '');

export function martStoreUrl(path = '/'): string {
  return `${storeBase}${path.startsWith('/') ? path : `/${path}`}`;
}

export function martProductUrl(code: string): string {
  return martStoreUrl(`/product/${encodeURIComponent(code)}`);
}

/**
 * Converte um caminho legado do institucional (`/gwan-mart/...`) no
 * equivalente da loja, preservando query string e âncora. Caminho que não
 * corresponde a catálogo nem a produto cai na home da loja.
 *
 * O nginx do site faz o mesmo mapeamento para catálogo e produto (302); esta
 * função cobre a navegação dentro da SPA e o dev, onde não há nginx.
 */
export function legacyMartPathToStore(
  pathname: string,
  search = '',
  hash = ''
): string {
  const rest = pathname.replace(/^\/gwan-mart/, '');
  const product = rest.match(/^\/product\/([^/]+)\/?$/);

  let path = '/';
  if (product) {
    // O segmento já chega codificado na URL; não codificar de novo.
    path = `/product/${product[1]}`;
  } else if (/^\/catalog\/?$/.test(rest)) {
    path = '/catalog';
  }

  return `${martStoreUrl(path)}${search}${hash}`;
}
