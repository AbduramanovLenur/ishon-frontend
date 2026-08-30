import { lazy } from 'react';

export const AuthPage = lazy(() => import('@pages/auth'));
export const CompaniesPage = lazy(() => import('@pages/companies'));
export const DirectorsPage = lazy(() => import('@pages/directors'));