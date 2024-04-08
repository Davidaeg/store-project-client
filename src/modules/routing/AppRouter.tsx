import { Navigate, Route, Routes } from 'react-router-dom';
import { appRoutes } from './routes';
import { useContext } from 'react';
import { AuthenticationContext } from '../auth/Authentication.context';
import { PageNotFound } from '../pagenotfound/PageNotFound';

const userTypeComponents: Record<string, JSX.Element> = {
  customer: <Navigate to="/store/home" />,
  employee: <Navigate to="/admin/sale" />,
  guest: <Navigate to="/store/home" />
};

export const AppRouter = () => {
  const { user } = useContext(AuthenticationContext);

  const initialComponent = () => {
    return userTypeComponents[user?.userType || 'guest'];
  };
  return (
    <Routes>
      <>
        {appRoutes.map((prop, key) => {
          if (user?.routes.includes(prop.path)) {
            return (
              <Route
                path={`${user.rootPath}${prop.path}/*`}
                element={<prop.component />}
                key={key}
              />
            );
          }
        })}
        <Route path="/*" element={initialComponent()} />
        <Route path="*" element={<PageNotFound />} />
      </>
    </Routes>
  );
};
