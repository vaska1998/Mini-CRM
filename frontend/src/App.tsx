import {
  type AuthCredentialsWithClaims,
  parseTokenCredentials,
} from './tools/token.ts';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { getCookie } from './tools/cookie.ts';
import { createClientManager } from './infrastructure/client/manager.ts';
import { AxiosProxy } from './infrastructure/client/proxy/axios.proxy.ts';
import React from 'react';
import Login from './pages/Login.tsx';
import CompaniesList from './pages/CompaniesList.tsx';
import { useAppUser } from './contexts/user.context.tsx';
import { AppUserProvider } from './providers/AppUserProvider.tsx';
import EmployeesList from './pages/EmployeesList.tsx';
import CompanyDetails from "./pages/CompanyDetails.tsx";
import CreateCompany from "./pages/CreateCompany.tsx";
import EmployeeDetails from "./pages/EmployeeDetails.tsx";
import CreateEmployee from "./pages/CreateEmployee.tsx";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthorized } = useAppUser();
  return isAuthorized ? <>{children}</> : <Navigate to="/login" replace />;
};
const API_URL = import.meta.env.REACT_APP_PUBLIC_API_URL ?? 'http://localhost:5555';

export default function App() {
  const cookieJson = getCookie('vd_credentials');
  const user: AuthCredentialsWithClaims | null =
    parseTokenCredentials(cookieJson);
  const client = createClientManager(
    new AxiosProxy(
      API_URL,
      user?.accessToken ?? '',
    ),
  );

  return (
    <AppUserProvider user={user} client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/companies" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/companies"
            element={
              <PrivateRoute>
                <CompaniesList />
              </PrivateRoute>
            }
          />
            <Route
                path="/companies/:id"
                element={
                    <PrivateRoute>
                        <CompanyDetails/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/companies/create"
                element={
                    <PrivateRoute>
                        <CreateCompany/>
                    </PrivateRoute>
                }
            />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeesList />
              </PrivateRoute>
            }
          />
            <Route
                path="/employees/:id"
                element={
                    <PrivateRoute>
                        <EmployeeDetails />
                    </PrivateRoute>
                }
            />
            <Route
                path="/employees/create"
                element={
                    <PrivateRoute>
                        <CreateEmployee />
                    </PrivateRoute>
                }
            />
          <Route
            path="*"
            element={
              user ? (
                <Navigate to="/companies" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </AppUserProvider>
  );
}
