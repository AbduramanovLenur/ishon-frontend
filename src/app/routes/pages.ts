import { lazy } from 'react';

export const AuthPage = lazy(() => import('@pages/auth'));
export const CompaniesPage = lazy(() => import('@pages/companies'));
export const DirectorsPage = lazy(() => import('@pages/directors'));
export const DashboardPage = lazy(() => import('@pages/dashboard'));
export const ObjectsPage = lazy(() => import('@pages/objects'));
export const EmployeesPage = lazy(() => import('@pages/employees'));
export const LogsPage = lazy(() => import('@pages/system-logs'));
export const TodaysPresencePage = lazy(() => import('@pages/todays-presence'));