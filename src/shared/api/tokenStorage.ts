import { type AuthTokens } from '@shared/types';

let accessToken: string | null = null;
let refreshToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function getRefreshToken(): string | null {
  return refreshToken;
}

export function setTokens(tokens: AuthTokens): void {
  accessToken = tokens.accessToken;

  if (tokens.refreshToken) {
    refreshToken = tokens.refreshToken;
  }
}

export function clearTokens(): void {
  accessToken = null;
  refreshToken = null;
}

export function hasValidSession(): boolean {
  return Boolean(accessToken);
}