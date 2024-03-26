import { useState } from 'react';
import { Person } from '../person.types';
import { storeService } from '../../store-service/storeService';

export const useGetAllPerson = () => {
  const [error, setError] = useState<string>('');
  const [currentPerson, setCurrentPerson] = useState<Person[]>([]);

  const getAllPeople = async () => {
    try {
      await storeService
        .get('/Person')
        .then((resp) => {
          setCurrentPerson(resp.data as Person[]);
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
        });
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };

  return {
    getAllPeople,
    currentPerson,
    error
  };
};
