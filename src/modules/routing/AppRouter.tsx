import { Navigate, Route, Routes } from 'react-router-dom';
import { appRoutes } from './routes';

const user = {
  routes: ['/home', '/products', '/signup', '/login']
  // routes: ['/home'],
};

export const AppRouter = () => {
  //   const { user } = useContext(AuthenticationContext);

  return (
    <Routes>
      <>
        {appRoutes.map((prop, key) => {
          if (user?.routes.includes(prop.path)) {
            return (
              <Route
                path={`/store${prop.path}/*`}
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
