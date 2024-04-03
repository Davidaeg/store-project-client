import { useState } from 'react';
import { Person } from '../person.types';
import { storeService } from '../../store-service/storeService';

export const useGetPersonById = () => {
  const [error, setError] = useState<string>('');
  const [currentPerson, setCurrentPerson] = useState<Person>();

  const getPersonByID = async (id: number) => {
    try {
      await storeService
        .get(`/Person${id}`)
        .then((resp) => {
          setCurrentPerson(resp.data as Person);
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
    getPersonByID,
    currentPerson,
    error
  };
};
