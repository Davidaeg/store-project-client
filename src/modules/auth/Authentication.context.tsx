import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSignin } from '../../shared/datasources/user/user-api/useSignin.hook';

enum UserType {
  GUEST = 'guest',
  CUSTOMER = 'customer',
  EMPLOYEE = 'employee'
}

type User = {
  rootPath: string;
  routes: string[];
  username: string;
  id: string;
  userType: UserType;
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

export const AuthenticationContext = React.createContext(
  {} as AuthenticationContextType
);

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const { signin } = useSignin();
  const [user, setUser] = useState<User>();

  const userRoutesMap: Record<UserType, string[]> = {
    [UserType.CUSTOMER]: ['/home', '/products', '/signup', 'login'],
    [UserType.EMPLOYEE]: ['/sale', '/empsignup', '/form'],
    [UserType.GUEST]: ['/home', '/signup', '/login']
  };

  const doLogin = async (attrs: LoginForm) => {
    try {
      const userData = await signin(attrs.username, attrs.password);
      const userType: UserType | undefined = Object.values(UserType).find(
        (type) => type === userData?.userType
      );

      const user: User = !userData
        ? {
            id: 'guest',
            rootPath: '/store',
            routes: userRoutesMap[UserType.GUEST],
            username: 'Guest',
            userType: UserType.GUEST
          }
        : {
            id: userData.userId?.toString() || '',
            rootPath: userType === UserType.CUSTOMER ? '/store' : '/admin',
            routes: userType
              ? userRoutesMap[userType]
              : userRoutesMap[UserType.GUEST],
            username: userData.username || '',
            userType: userType || UserType.GUEST
          };

      setUser(user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  useEffect(() => {
    setUser({
      id: 'guest',
      rootPath: '/store',
      routes: userRoutesMap[UserType.GUEST],
      username: 'Guest',
      userType: UserType.GUEST
    });
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
