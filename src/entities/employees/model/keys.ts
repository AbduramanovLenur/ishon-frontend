export const employeesKeys = {
  all: ['employees'],
  list: (search?: string, page?: number) => [...employeesKeys.all, search, page ],
  byId: (employeeId: string | number | null) => [...employeesKeys.all, employeeId]
} as const;