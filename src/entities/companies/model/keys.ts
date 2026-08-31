export const companiesKeys = {
  all: ['companies-admin'],
  list: (search?: string, page?: number) => [...companiesKeys.all, search, page ],
  byId: (companyId: string | number | null) => [...companiesKeys.all, companyId]
} as const;