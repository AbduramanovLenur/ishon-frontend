export const companiesKeys = {
  all: ['companies-admin'],
  collection: () => [...companiesKeys.all, 'list'],
  list: (search: string, page: number) => [...companiesKeys.collection(), search, page],
  byId: (companyId: string | number | null) => [...companiesKeys.all, companyId],
  manualList: () => [...companiesKeys.all, 'manual-list']
} as const;