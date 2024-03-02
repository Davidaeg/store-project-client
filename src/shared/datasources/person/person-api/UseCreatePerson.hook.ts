import { useState } from 'react';
import { CreatePersonDto } from '../person.types';
import storeService from '../../store-service/storeService';

export const useCreatePerson = () => {
  const [error, setError] = useState<string>('');
  const [personToCreate, setPersonToCreate] = useState<
    CreatePersonDto | undefined
  >();

  const createPerson = async (newPerson: CreatePersonDto) => {
    try {
      const resp = await storeService.post('/Person', newPerson);
      setPersonToCreate(resp.data as CreatePersonDto);
      console.log('Person created:', resp.data);
      return Promise.resolve();
    } catch (error: any) {
      console.error('Error creating person:', error);
      setError(
        error.response?.data?.error ||
          'An error occurred while creating the person.'
      );
      return Promise.reject(error);
    }
  };

  return {
    createPerson,
    personToCreate,
    error
  };
};
