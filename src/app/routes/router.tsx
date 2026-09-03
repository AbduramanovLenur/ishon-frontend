import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '../layouts/root-layout';
import RequireGuest from './guards/RequireGuest';
import RequireAuth from './guards/RequireAuth';
import RequireRole from './guards/RequireRole';
import IndexRedirect from './guards/IndexRedirect';

import { AuthPage, CompaniesPage, DirectorsPage, DashboardPage } from './pages';

import { roles } from '@shared/config';
import { routes } from '@shared/config';

const router = createBrowserRouter([
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
          { index: true, element: <IndexRedirect /> },
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
            element: <RequireRole roles={[roles.COMPANY_OWNER, roles.COMPANY_ADMIN]} />,
            children: [
              {
                path: routes.DASHBOARD,
                element: <DashboardPage />
              }
            ]
          }
        ]
      }
    ]
  }
]);

export default router;