import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '../layouts/root-layout';
import RequireGuest from './guards/RequireGuest';
import RequireAuth from './guards/RequireAuth';
import RequireRole from './guards/RequireRole';
import IndexRedirect from './guards/IndexRedirect';

import { 
  AuthPage, 
  CompaniesPage, 
  DirectorsPage, 
  DashboardPage, 
  EmployeesPage,
  LogsPage,
  ObjectsPage,
  TodaysPresencePage,
  SingleEmployeePage,
  SettingsPage,
  NotFoundPage
} from './pages';

import { roles } from '@shared/config';
import { routes } from '@shared/config';
import { ErrorBoundary } from '@shared/ui';

const router = createBrowserRouter([
  { 
    element: <RequireGuest />,
    errorElement: <ErrorBoundary><span /></ErrorBoundary>,
    children: [
      {
        path: routes.AUTH,
        element: <AuthPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  },
  {
    element: <RequireAuth />,
    errorElement: <ErrorBoundary><span /></ErrorBoundary>,
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
              },
              {
                path: routes.OBJECTS,
                element: <ObjectsPage />
              },
              {
                path: routes.EMPLOYEES,
                element: <EmployeesPage />
              },
              {
                path: routes.SINGLE_EMPLOYEE(':id'),
                element: <SingleEmployeePage />
              },
              {
                path: routes.LOGS,
                element: <LogsPage />
              },
              {
                path: routes.TODAYS_PRESENCE,
                element: <TodaysPresencePage />
              },
              {
                path: routes.SETTINGS,
                element: <SettingsPage />
              }
            ]
          },
          {
            path: '*',
            element: <NotFoundPage />
          }
        ]
      }
    ]
  }
]);

export default router;