// Типы токенов — здесь, в shared, а не в entities, потому что axiosInstance
// (тоже shared) должен уметь их использовать напрямую, а shared не видит entities/features
export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}
