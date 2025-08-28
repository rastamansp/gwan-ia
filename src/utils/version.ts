/**
 * Utilitário para gerenciar a versão da aplicação
 * A versão é lida dinamicamente do package.json através do Vite
 */

// Obtém a versão atual da aplicação
export const getAppVersion = (): string => {
  return '1.0.0';
};

export const getBuildInfo = () => {
  return {
    version: getAppVersion(),
    buildTime: new Date().toISOString(),
  };
};

// Formata a versão para exibição
export const formatVersion = (version: string): string => {
  return `v${version}`;
};
