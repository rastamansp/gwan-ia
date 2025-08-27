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

    public async register(userData: { name: string; email: string; whatsapp: string }): Promise<void> {
        try {
            await this.httpService.post('/auth/register', userData);
        } catch (error) {
            throw new AuthError('Failed to register user', error as Error);
        }
    }

    public async login(email: string): Promise<void> {
        try {
            await this.httpService.post('/auth/login', { email });
        } catch (error) {
            throw new AuthError('Failed to initiate login', error as Error);
        }
    }

    public async verifyLogin(email: string, code: string): Promise<UserSession> {
        try {
            const response = await this.httpService.post<{ accessToken: string; user: User }>('/auth/verify-login-code', {
                email,
                code
            });

            if (!response.data || !response.data.accessToken || !response.data.user) {
                console.error('Invalid session response from API:', response.data);
                throw new AuthError('Invalid session response from API - missing required fields');
            }

            // Transform the API response into our UserSession format
            const session: UserSession = {
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email,
                description: response.data.user.description,
                token: response.data.accessToken
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
                    headers: this.getAuthHeaders()
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
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Failed to get user profile:', error);
            throw new AuthError('Failed to get user profile', error as Error);
        }
    }

    public async updateProfile(data: UpdateProfileData): Promise<UserSession> {
        try {
            const response = await this.httpService.put<UserSession>('/profile', data, {
                headers: this.getAuthHeaders()
            });

            const updatedSession = response.data;
            this.sessionService.setSession(updatedSession);
            return updatedSession;
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw new AuthError('Failed to update profile', error as Error);
        }
    }

    async verifyLoginCode(email: string, code: string): Promise<UserSession> {
        const token = this.sessionService.getToken();
        if (!token) {
            throw new Error('No authentication token available');
        }

        try {
            const response = await this.httpService.post<{ user: User; token: string }>('/auth/verify-login-code', 
                { email, code },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const session: UserSession = {
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email,
                description: response.data.user.description,
                token: response.data.token
            };

            this.sessionService.setSession(session);
            return session;
        } catch (error) {
            console.error('Failed to verify login code:', error);
            if (error instanceof AuthError) {
                throw error;
            }
            throw new AuthError('Failed to verify login code', error as Error);
        }
    }
}

export default AuthService;
