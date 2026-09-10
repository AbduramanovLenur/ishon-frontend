export const employeesKeys = {
  all: ['employees'],
  collection: () => [...employeesKeys.all, 'list'],
  list: (search?: string, page?: number) => [...employeesKeys.collection(), search, page],
  byId: (employeeId: string | number | null) => [...employeesKeys.all, employeeId],
  username: (employeeId: string | number | null) => [...employeesKeys.all, 'username', employeeId],
  profile: (employeeId: string | number | null) => [...employeesKeys.all, 'profile', employeeId],
} as const;