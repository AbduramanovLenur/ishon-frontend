export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  APP_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
} as const