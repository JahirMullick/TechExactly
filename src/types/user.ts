export interface User {
  id: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}
