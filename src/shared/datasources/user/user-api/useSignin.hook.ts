import { useState } from 'react';
import storeService from '../../store-service/storeService';
import { ErrorResponse } from 'react-router-dom';
import { User } from '../user.types';

export const useSignin = () => {
  const [error, setError] = useState<string>('');

  const signin = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    try {
      const response = await storeService.post<User>('/users/signin', {
        email,
        password
      });
      const user = { ...response.data };
      return user;
    } catch (error: any) {
      console.error('Error signing in:', error);
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        const errorMessage =
          (error.response && (error.response.data as ErrorResponse)) ||
          'Error signing in';
        setError(errorMessage);
      }
      return undefined;
    }
  };

  return {
    signin,
    error
  };
};
