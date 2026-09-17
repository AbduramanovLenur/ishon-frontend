export const employeesKeys = {
  all: ['employees'],
  collection: () => [...employeesKeys.all, 'list'],
  list: (search: string, page: number, objectId: string | number) => [...employeesKeys.collection(), search, page, objectId],
  byId: (employeeId: string | number | null) => [...employeesKeys.all, employeeId],
  username: (employeeId: string | number | null) => [...employeesKeys.all, 'username', employeeId],
  profile: (employeeId: string | number) => [...employeesKeys.all, 'profile', employeeId],
  history: (
    employeeId: string | number | null, 
    eventType?: string, 
    late?: boolean | string, 
    early?: boolean | string, 
    page?: number
  ) => [...employeesKeys.all, 'history', employeeId, eventType, late, early, page],
  excel: () => [...employeesKeys.all, 'excel'],
  excelFilters: (search: string, objectId: string | number) => [...employeesKeys.excel(), search, objectId]
} as const;