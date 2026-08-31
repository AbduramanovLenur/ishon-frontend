export const companiesKeys = {
  all: ['companies-admin'],
  list: (search?: string, page?: number) => [...companiesKeys.all, search, page ]
} as const;