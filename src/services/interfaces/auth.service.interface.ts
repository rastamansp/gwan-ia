import { User, UserSession, UpdateProfileData } from '../../types/auth.types';

export interface IAuthService {
  register(userData: {
    name: string;
    email: string;
    whatsapp: string;
  }): Promise<void>;
  login(email: string): Promise<void>;
  verifyLogin(email: string, code: string): Promise<UserSession>;
  logout(): Promise<void>;
  getUserProfile(): Promise<User>;
  updateProfile(data: UpdateProfileData): Promise<UserSession>;
}
