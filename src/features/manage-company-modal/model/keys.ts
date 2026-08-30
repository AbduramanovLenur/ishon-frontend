export const manageCompanyKeys = {
  all: ['companies-admin'],
  list: (search?: string, page?: number) => [...manageCompanyKeys.all, search, page ]
} as const;