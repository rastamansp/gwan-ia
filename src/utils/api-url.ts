/**
 * Constrói uma URL completa evitando barras duplas
 * @param baseUrl - URL base (ex: https://api.gwan.com.br/api)
 * @param endpoint - Endpoint (ex: /v1/products ou v1/products)
 * @returns URL completa sem barras duplas
 */
export const buildApiUrl = (baseUrl: string, endpoint: string): string => {
  // Remove barra final da baseUrl se existir
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');

  // Remove barra inicial do endpoint se existir
  const cleanEndpoint = endpoint.replace(/^\//, '');

  // Constrói a URL final
  return `${cleanBaseUrl}/${cleanEndpoint}`;
};

/**
 * Constrói uma URL de API com query string
 * @param baseUrl - URL base
 * @param endpoint - Endpoint
 * @param queryParams - Parâmetros de query (opcional)
 * @returns URL completa com query string
 */
export const buildApiUrlWithQuery = (
  baseUrl: string,
  endpoint: string,
  queryParams?: Record<string, string | number | boolean | undefined>
): string => {
  const url = buildApiUrl(baseUrl, endpoint);

  if (!queryParams || Object.keys(queryParams).length === 0) {
    return url;
  }

  const queryString = Object.entries(queryParams)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join('&');

  return queryString ? `${url}?${queryString}` : url;
};
