export interface User {
  dpi: string;
  name: string;
  email: string;
  password: string;
}

export interface JwtPayload {
  dpi: string;
  email: string;
}
