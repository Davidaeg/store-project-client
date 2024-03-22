import { useState } from 'react';
import storeService from '../../store-service/storeService';
import { ErrorResponse } from 'react-router-dom';
import { User } from '../user.types';
import { useModals } from '../../../hooks/modals/useModals.hook';

export const useSignin = () => {
  const { showErrorModal } = useModals();
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
        showErrorModal(
          'Error!',
          'Correo electrónico o contraseña incorrectos.'
        );
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
