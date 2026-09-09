export const employeesKeys = {
  all: ['employees'],
  list: (search?: string, page?: number) => [...employeesKeys.all, search, page ],
  byId: (employeeId: string | number | null) => [...employeesKeys.all, employeeId],
  login: (employeeId: string | number | null) => [...employeesKeys.all, 'login', employeeId],
} as const;