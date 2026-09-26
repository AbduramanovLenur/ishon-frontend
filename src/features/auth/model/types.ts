import type { IUser } from "@entities/user";

export interface IAuthFields {
  username: string;
  password: string;
}

export interface IAuthData {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  user: IUser;
}