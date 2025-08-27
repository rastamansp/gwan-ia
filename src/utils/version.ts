/**
 * Utilitário para gerenciar a versão da aplicação
 * A versão é lida dinamicamente do package.json através do Vite
 */

// Obtém a versão atual da aplicação
export const getAppVersion = (): string => {
  return __APP_VERSION__ || '0.0.0'
}

// Obtém informações completas da versão
export const getVersionInfo = () => {
  return {
    version: getAppVersion(),
    buildTime: new Date().toISOString(),
    environment: 'production',
    isDevelopment: false,
    isProduction: true
  }
}

// Formata a versão para exibição
export const formatVersion = (version: string = getAppVersion()): string => {
  return `v${version}`
}

// Verifica se é uma versão de desenvolvimento
export const isDevelopmentVersion = (): boolean => {
  const version = getAppVersion()
  return version === '0.0.0' || version.includes('dev') || version.includes('alpha') || version.includes('beta')
}
