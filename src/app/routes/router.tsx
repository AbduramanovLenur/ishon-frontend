import { createBrowserRouter } from 'react-router-dom';

import RequireGuest from './guards/RequireGuest';
import RequireAuth from './guards/RequireAuth';
import RequireRole from './guards/RequireRole';
import { RootLayout } from '../layouts/root-layout';

import { AuthPage } from '@pages/auth';
import { CompaniesPage } from '@pages/companies';
import { DirectorsPage } from '@pages/directors';

import { roles } from '@shared/config';
import { routes } from '@shared/config';

export const router = createBrowserRouter([
  { 
    element: <RequireGuest />,
    children: [
      {
        path: routes.AUTH,
        element: <AuthPage />
      }
    ]
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            element: <RequireRole roles={roles.ADMIN} />,
            children: [
              {
                path: routes.COMPANIES,
                element: <CompaniesPage />
              },
              {
                path: routes.DIRECTORS,
                element: <DirectorsPage />
              }
            ]
          },
          {
            element: <RequireRole roles={roles.COMPANY_OWNER} />,
            children: []
          }
        ]
      }
    ]
  }
]);