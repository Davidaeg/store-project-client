import { UserType } from '../../shared/datasources/user/user.types';

export const userRoutesMap: Record<UserType, string[]> = {
  [UserType.CUSTOMER]: ['/home', '/products', '/signup', 'login'],
  [UserType.EMPLOYEE]: ['/sale', '/empsignup', '/form'],
  [UserType.GUEST]: ['/home', '/signup', '/login']
};
