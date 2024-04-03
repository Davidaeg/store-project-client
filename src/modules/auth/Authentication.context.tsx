import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSignin } from '../../shared/datasources/user/user-api/useSignin.hook';
import {
  LoginForm,
  User,
  UserType
} from '../../shared/datasources/user/user.types';
import { userRoutesMap } from './userRoutes';

const guestUser: User = {
  id: 0,
  rootPath: '/store',
  routes: userRoutesMap[UserType.GUEST],
  username: 'Guest',
  userType: UserType.GUEST
};

type AuthenticationContextType = {
  user: User | undefined;
  login: (attrs: LoginForm) => void;
  logout: () => void;
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
      if (!userData) {
        setUser(guestUser);
        return;
      }
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user: User = JSON.parse(localStorage.getItem('user') as string);
      setUser(user);
    } else {
      setUser(guestUser);
    }
  }, []);

  const logout = () => {
    setUser(guestUser);
    localStorage.removeItem('user');
  };

  return (
    <AuthenticationContext.Provider value={{ user, login: doLogin, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
