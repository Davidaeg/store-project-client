import { useState } from 'react';
import { Product } from '../products.types';
import { storeService } from '../../store-service/storeService';

export const useGetAllProducts = () => {
  const [error, setError] = useState<string>('');
  const [currentPoducts, setCurrentProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    try {
      await storeService
        .get('/products')
        .then((resp) => {
          setCurrentProducts(resp.data as Product[]);
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
    getAllProducts,
    currentPoducts,
    error
  };
};
