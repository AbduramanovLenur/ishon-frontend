export const routes = {
  HOME: '/',
  AUTH: '/auth',
  COMPANIES: '/companies',
  DIRECTORS: '/directors',
  DASHBOARD: '/dashboard',
  OBJECTS: '/objects',
  EMPLOYEES: '/employees',
  LOGS: '/logs',
  TODAYS_PRESENCE: '/todays-presence',
  SINGLE_EMPLOYEE: (id: string | number) => `${routes.EMPLOYEES}/${id}`
} as const;