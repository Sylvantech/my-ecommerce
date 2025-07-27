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
