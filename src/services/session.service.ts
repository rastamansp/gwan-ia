import { UserSession } from '../types/auth.types';

export class SessionService {
  private static instance: SessionService;
  private readonly SESSION_KEY = 'gwan_user_session';
  private readonly TOKEN_KEY = 'gwan_auth_token';

  private constructor() {}

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  public setSession(session: UserSession): void {
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      localStorage.setItem(this.TOKEN_KEY, session.token);
    } catch (error) {
      console.error('Failed to save session to localStorage:', error);
    }
  }

  public getSession(): UserSession | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (sessionData) {
        return JSON.parse(sessionData) as UserSession;
      }
      return null;
    } catch (error) {
      console.error('Failed to parse session from localStorage:', error);
      return null;
    }
  }

  public getToken(): string | null {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get token from localStorage:', error);
      return null;
    }
  }

  public clearSession(): void {
    try {
      localStorage.removeItem(this.SESSION_KEY);
      localStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear session from localStorage:', error);
    }
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token.length > 0;
  }

  public getUserId(): string | null {
    const session = this.getSession();
    return session?.id || null;
  }

  public getUserName(): string | null {
    const session = this.getSession();
    return session?.name || null;
  }

  public getUserEmail(): string | null {
    const session = this.getSession();
    return session?.email || null;
  }
}
