import { useState } from 'react';
import { Person } from '../person.types';
import storeService from '../../store-service/storeService';

export const useUpdatePerson = () => {
  const [error, setError] = useState<string>('');
  const [personToUpdate, setPersonToUpdate] = useState<Person>();

  const updatePerson = async (id: number, newInfo: Partial<Person>) => {
    try {
      await storeService
        .patch(`/Person${id}`, newInfo)
        .then((resp) => {
          setPersonToUpdate(resp.data as Person);
        })
        .catch((e) => {
          setError(e.message);
        });
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };

  return {
    updatePerson,
    personToUpdate,
    error
  };
};
