export interface User {
  id: string;
  name: string;
  email: string;
  description?: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  description?: string;
  token: string;
}

export interface UpdateProfileData {
  name?: string;
  description?: string;
}

export interface LoginRequest {
  email: string;
}

export interface VerifyLoginRequest {
  email: string;
  code: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
