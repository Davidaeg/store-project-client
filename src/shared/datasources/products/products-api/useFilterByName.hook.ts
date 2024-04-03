import { useState } from 'react';
import { Product } from '../products.types';
import { storeService } from '../../store-service/storeService';

export const useFilterByName = () => {
  const [errorByName, setError] = useState<string>('');
  const [currentPoductsByName, setCurrentProducts] = useState<Product>();

  const filterProductsByName = async (name: String) => {
    try {
      await storeService
        .get(`/products/search/${name}`)
        .then((resp) => {
          setCurrentProducts(resp.data as Product);
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
    filterProductsByName,
    currentPoductsByName,
    errorByName
  };
};
