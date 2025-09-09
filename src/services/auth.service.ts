import { User, UserSession, UpdateProfileData } from '../types/auth.types';
import { IAuthService } from './interfaces/auth.service.interface';
import { HttpService } from './http.service';
import { SessionService } from './session.service';
import { AuthError } from '../types/errors';

export class AuthService implements IAuthService {
  private static instance: AuthService;
  private readonly httpService: HttpService;
  private readonly sessionService: SessionService;

  private constructor() {
    this.httpService = HttpService.getInstance();
    this.sessionService = SessionService.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.sessionService.getToken();
    if (!token) {
      console.error('No token available in session service');
      throw new AuthError('No authentication token available');
    }
    return { Authorization: `Bearer ${token}` };
  }

  public async register(userData: {
    name: string;
    email: string;
    whatsapp: string;
  }): Promise<void> {
    try {
      await this.httpService.post('/api/v1/auth/register', userData);
    } catch (error) {
      throw new AuthError('Failed to register user', error as Error);
    }
  }

  public async activateAccount(email: string, code: string): Promise<void> {
    try {
      await this.httpService.post('/api/v1/auth/activate-account', {
        email,
        code,
      });
    } catch (error) {
      throw new AuthError('Failed to activate account', error as Error);
    }
  }

  public async login(email: string): Promise<void> {
    try {
      await this.httpService.post('/api/v1/auth/login', { email });
    } catch (error) {
      throw new AuthError('Failed to initiate login', error as Error);
    }
  }

  public async verifyLogin(email: string, code: string): Promise<UserSession> {
    try {
      const response = await this.httpService.post<{
        status: string;
        data: { accessToken: string; user: User };
        error: any;
        timestamp: string;
      }>('/api/v1/auth/verify-account-code', {
        email,
        code,
      });

      // A API retorna uma estrutura aninhada: response.data.data
      const apiData = response.data.data;

      if (!apiData || !apiData.accessToken || !apiData.user) {
        console.error('Invalid session response from API:', response.data);
        throw new AuthError(
          'Invalid session response from API - missing required fields'
        );
      }

      // Transform the API response into our UserSession format
      const session: UserSession = {
        id: apiData.user.id,
        name: apiData.user.name,
        email: apiData.user.email,
        description: apiData.user.description,
        token: apiData.accessToken,
      };

      this.sessionService.setSession(session);
      return session;
    } catch (error) {
      console.error('Login verification failed:', error);
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Failed to verify login', error as Error);
    }
  }

  public async logout(): Promise<void> {
    try {
      const token = this.sessionService.getToken();
      if (token) {
        await this.httpService.post('/auth/logout', null, {
          headers: this.getAuthHeaders(),
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      this.sessionService.clearSession();
    }
  }

  public async getUserProfile(): Promise<User> {
    try {
      const response = await this.httpService.get<User>('/auth/profile', {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw new AuthError('Failed to get user profile', error as Error);
    }
  }

  public async updateProfile(data: UpdateProfileData): Promise<UserSession> {
    try {
      const response = await this.httpService.put<UserSession>(
        '/profile',
        data,
        {
          headers: this.getAuthHeaders(),
        }
      );

      const updatedSession = response.data;
      this.sessionService.setSession(updatedSession);
      return updatedSession;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw new AuthError('Failed to update profile', error as Error);
    }
  }
}

export default AuthService;
