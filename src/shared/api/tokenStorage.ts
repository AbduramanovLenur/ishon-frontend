import { type AuthTokens } from '@shared/types';
import { tokens } from '@shared/config';

export function getAccessToken(): string | null {
  return localStorage.getItem(tokens.ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(tokens.REFRESH_TOKEN_KEY);
}

export function setTokens(tokensValues: AuthTokens): void {
  localStorage.setItem(tokens.ACCESS_TOKEN_KEY, tokensValues.accessToken);

  if (tokensValues.refreshToken) localStorage.setItem(tokens.REFRESH_TOKEN_KEY, tokensValues.refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(tokens.ACCESS_TOKEN_KEY);
  localStorage.removeItem(tokens.REFRESH_TOKEN_KEY);
}

export function hasValidSession(): boolean {
  return Boolean(getAccessToken());
}