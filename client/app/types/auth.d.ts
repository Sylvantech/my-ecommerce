export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    reduction: number;
    is_active: boolean;
    updated_at: string;
  };
  token: string;
  expiresAt: string;
}

export interface AuthError {
  error: string;
  details?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}