import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSignin } from '../../shared/datasources/user/user-api/useSignin.hook';

type User = {
  rootPath: string;
  routes: string[];
  username: string;
  id: string;
  userType: string;
};

type LoginForm = {
  username: string;
  password: string;
};

type AuthenticationContextType = {
  user: User | undefined;
  login: (attrs: LoginForm) => void;
  logout: () => void;
};

const defaultUser = {
  id: '1',
  rootPath: '/store',
  routes: ['/home', '/login', '/signup'],
  username: 'guest',
  userType: 'guest',
  userId: 0,
  personId: 0
};

export const AuthenticationContext = React.createContext(
  {} as AuthenticationContextType
);

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const { signin } = useSignin();
  const [user, setUser] = useState<User>();

  const doLogin = async (attrs: LoginForm) => {
    try {
      const userData = await signin(attrs.username, attrs.password);
      if (userData) {
        let userRoutes: string[] = [];
        if (userData.userType === 'customer') {
          userRoutes = ['/home', '/products', '/signup', '/login'];
        } else if (userData.userType === 'employee') {
          userRoutes = ['/sale', '/empsignup', '/form'];
        }
        setUser({
          id: userData.userId.toString(),
          rootPath: userData.userType === 'customer' ? '/store' : '/admin',
          routes: userRoutes,
          username: userData.username,
          userType: userData.userType
        });
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const logout = () => {
    setUser(undefined);
  };

  useEffect(() => {
    setUser(defaultUser);
  }, []);
  return (
    <AuthenticationContext.Provider value={{ user, login: doLogin, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
