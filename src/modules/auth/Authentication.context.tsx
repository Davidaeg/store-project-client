import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSignin } from '../../shared/datasources/user/user-api/useSignin.hook';
import {
  LoginForm,
  User,
  UserType
} from '../../shared/datasources/user/user.types';
import { userRoutesMap } from './userRoutes';

const guestUser: User = {
  id: 'guest',
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

      const currentUser = {
        id: userData.userId.toString() || '',
        rootPath: userData.userType === UserType.CUSTOMER ? '/store' : '/admin',
        routes: userRoutesMap[userData.userType],
        username: userData.username || '',
        userType: userData.userType
      };

      setUser(currentUser);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  useEffect(() => {
    setUser(guestUser);
  }, []);

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthenticationContext.Provider value={{ user, login: doLogin, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
