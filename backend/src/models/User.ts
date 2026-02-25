export interface User {
  id?: number;
  email: string;
  password_hash: string;
  name?: string;
  skin_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}