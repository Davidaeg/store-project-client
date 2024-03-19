import { Navigate, Route, Routes } from 'react-router-dom';
import { appRoutes } from './routes';
import { useContext } from 'react';
import { AuthenticationContext } from '../auth/Authentication.context';
import { Home } from '../home/Home';
import { TempView } from '../tempViews/TempView';

export const AppRouter = () => {
  const { user } = useContext(AuthenticationContext);

  const InitialComponent = () => {
    if (user) {
      if (user.userType === 'customer') {
        return <Home />;
      } else if (user.userType === 'employee') {
        return <TempView />;
      }
    }
    return <Navigate to="/store/home" />;
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
        <Route path="/*" element={InitialComponent()} />
      </>
    </Routes>
  );
};
