import React, { PropsWithChildren, useEffect, useState } from 'react';
// import { useModals } from '../../shared/hooks/modals/useModals.hook';

type User = {
  rootPath: string;
  routes: string[];
  username: string;
  id: string;
};

type LoginForm = {
  username: string;
  password: string;
};

type AuthenticationContextType = {
  user: User | undefined;
  login: (atrs: LoginForm) => void;
  logout: () => void;
};

const clientUser = {
  username: 'client',
  id: '1',
  rootPath: '/store',
  routes: ['/home', '/products', '/signup', '/login']
};

const adminUser = {
  username: 'Admin',
  id: '1',
  rootPath: '/admin',
  routes: ['/sale']
};

export const AuthenticationContext = React.createContext(
  {} as any as AuthenticationContextType
);

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  //   const { showErrorModal } = useModals();
  const [user, setuser] = useState<User>();
  //   const { login, whoAmI } = useAuthApi();

  const doLogin = async (atrs: LoginForm) => {
    console.log('Login', atrs);

    // const response = await login(atrs);
    // if (!response) {
    //   showErrorModal('Error en login', 'Constraseña incorrecta');
    //   return;
    // }
    // localStorage.setItem('user', (response as User).email);
    // setuser(response as User);
  };

  const logout = () => {
    console.log('Logout');

    // localStorage.removeItem('user');
    // setuser(undefined);
  };

  useEffect(() => {
    setuser(clientUser);
    // if (!localStorage.getItem('user')) return;
    // whoAmI(localStorage.getItem('user')!)
    //   .then((response) => setuser(response as User))
    //   .catch((err) => {
    //     console.log('Error en el whoAmI', err);
    //     showErrorModal('Error en login', 'Constraseña incorrecta');
    //   });
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        login: doLogin,
        logout
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
