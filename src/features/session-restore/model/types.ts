import type { IUser } from "@entities/user";

export interface IRefreshResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  user: IUser;
}