import { UserType } from '../../shared/datasources/user/user.types';

export const userRoutesMap: Record<UserType, string[]> = {
  [UserType.CUSTOMER]: ['/home', '/products', '/shopping'],
  [UserType.EMPLOYEE]: ['/sale', '/empsignup', '/form', '/products', '/order'],
  [UserType.GUEST]: ['/home', '/signup', '/login', '/products']
};
