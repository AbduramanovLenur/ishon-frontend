export const companiesOwnerKeys = {
  all: ['companies-owner-admin'],
  collection: () => [...companiesOwnerKeys.all, 'list'],
  list: (search: string, page: number) => [...companiesOwnerKeys.collection(), search, page ],
  byId: (companyOwnerId: string | number | null) => [...companiesOwnerKeys.all, companyOwnerId]
} as const;