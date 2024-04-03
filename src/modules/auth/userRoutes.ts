import { UserType } from '../../shared/datasources/user/user.types';

export const userRoutesMap: Record<UserType, string[]> = {
  [UserType.CUSTOMER]: ['/home', '/products', '/signup'],
  [UserType.EMPLOYEE]: ['/sale', '/empsignup', '/form','/order'],
  [UserType.GUEST]: ['/home', '/signup', '/login']
};
