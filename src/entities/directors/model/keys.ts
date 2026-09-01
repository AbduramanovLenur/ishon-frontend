export const companiesOwnerKeys = {
  all: ['companies-owner-admin'],
  list: (search?: string, page?: number) => [...companiesOwnerKeys.all, search, page ],
  byId: (companyOwnerId: string | number | null) => [...companiesOwnerKeys.all, companyOwnerId]
} as const;