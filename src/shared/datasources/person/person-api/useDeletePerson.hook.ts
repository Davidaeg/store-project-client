import { useState } from 'react';
import { Person } from '../person.types';
import { storeService } from '../../store-service/storeService';

export const useDeletePerson = () => {
  const [error, setError] = useState<string>('');
  const [personToDelete, setPersonToDelete] = useState<Person>();

  const deletePerson = async (id: number) => {
    try {
      await storeService
        .delete(`/Person/${id}`)
        .then((resp) => {
          setPersonToDelete(resp.data as Person);
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
    deletePerson,
    personToDelete,
    error
  };
};
