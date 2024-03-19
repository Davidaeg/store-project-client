export interface User {
  userId: number;
  username: string;
  password: string;
  userType: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
}
export interface SigninResponse {
  id: number;
  username: string;
  userType: string;
}
