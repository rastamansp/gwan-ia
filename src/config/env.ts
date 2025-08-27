interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_SMTP_HOST: string;
  readonly VITE_SMTP_PORT: string;
  readonly VITE_SMTP_SECURE: string;
  readonly VITE_SMTP_USER: string;
  readonly VITE_SMTP_PASSWORD: string;
  readonly VITE_SMTP_FROM_NAME: string;
  readonly VITE_SMTP_FROM_EMAIL: string;
  readonly VITE_ADMIN_EMAIL: string;
  readonly VITE_ADMIN_PASSWORD: string;
  readonly VITE_ADMIN_NAME: string;
  readonly VITE_CHATWOOT_KEY: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const env = {
  // API
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Gwan IA',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // SMTP
  SMTP_HOST: import.meta.env.VITE_SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(import.meta.env.VITE_SMTP_PORT || '587'),
  SMTP_SECURE: import.meta.env.VITE_SMTP_SECURE === 'true',
  SMTP_USER: import.meta.env.VITE_SMTP_USER || '',
  SMTP_PASSWORD: import.meta.env.VITE_SMTP_PASSWORD || '',
  SMTP_FROM_NAME: import.meta.env.VITE_SMTP_FROM_NAME || 'GWAN',
  SMTP_FROM_EMAIL: import.meta.env.VITE_SMTP_FROM_EMAIL || 'noreply@gwan.com.br',
  
  // Admin
  ADMIN_EMAIL: import.meta.env.VITE_ADMIN_EMAIL || 'admin@gwan.com.br',
  ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD || 'pazdeDeus',
  ADMIN_NAME: import.meta.env.VITE_ADMIN_NAME || 'Administrador Gwan',
  
  // Chatwoot
  CHATWOOT_KEY: import.meta.env.VITE_CHATWOOT_KEY || '',
};

export default env;
