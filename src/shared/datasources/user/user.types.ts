export enum UserType {
  GUEST = 'guest',
  CUSTOMER = 'customer',
  EMPLOYEE = 'employee'
}

export type User = {
  rootPath: string;
  routes: string[];
  username: string;
  id: number;
  userType: UserType;
};

export type LoginForm = {
  username: string;
  password: string;
};
