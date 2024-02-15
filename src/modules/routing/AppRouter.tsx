import { Navigate, Route, Routes } from 'react-router-dom';
import { appRoutes } from './routes';
import { useContext } from 'react';
import { AuthenticationContext } from '../auth/Authentication.context';

export const AppRouter = () => {
  const { user } = useContext(AuthenticationContext);

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
        <Route path="/*" element={<Navigate to={'/store/home'} />} />
      </>
    </Routes>
  );
};
