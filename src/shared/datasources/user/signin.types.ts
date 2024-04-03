import { UserType } from './user.types';

export interface User {
  userId: number;
  username: string;
  password: string;
  userType: UserType;
}

export interface CreateUserDto {
  username: string;
  password: string;
}
export interface SigninResponse {
  id: number;
  username: string;
  userType: UserType;
}
