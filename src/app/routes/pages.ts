import { lazyRetry } from '@shared/utils/lazyRetry';

export const AuthPage = lazyRetry(() => import('@pages/auth'));
export const CompaniesPage = lazyRetry(() => import('@pages/companies'));
export const DirectorsPage = lazyRetry(() => import('@pages/directors'));
export const DashboardPage = lazyRetry(() => import('@pages/dashboard'));
export const ObjectsPage = lazyRetry(() => import('@pages/objects'));
export const EmployeesPage = lazyRetry(() => import('@pages/employees'));
export const LogsPage = lazyRetry(() => import('@pages/system-logs'));
export const TodaysPresencePage = lazyRetry(() => import('@pages/todays-presence'));
export const NotFoundPage = lazyRetry(() => import('@pages/not-found'));