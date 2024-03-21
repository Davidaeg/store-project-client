import { Navigate, Route, Routes } from 'react-router-dom';
import { appRoutes } from './routes';
import { useContext } from 'react';
import { AuthenticationContext } from '../auth/Authentication.context';
import { Home } from '../home/Home';
import { TempView } from '../tempViews/TempView';

const userTypeComponents: Record<string, JSX.Element> = {
  customer: <Home />,
  employee: <TempView />
};
export const AppRouter = () => {
  const { user } = useContext(AuthenticationContext);

  const initialComponent = () => {
    return (
      userTypeComponents[user?.userType || 'Guest'] || (
        <Navigate to="/store/home" />
      )
    );
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
      </>
    </Routes>
  );
};
