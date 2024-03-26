import { useState } from 'react';
import { Product } from '../products.types';
import { storeService } from '../../store-service/storeService';

export const useGetProductById = () => {
  const [error, setError] = useState<string>('');
  const [currentPoduct, setCurrentProduct] = useState<Product>();

  const getProductByID = async (id: number) => {
    try {
      await storeService
        .get(`/products/${id}`)
        .then((resp) => {
          setCurrentProduct(resp.data as Product);
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
    getProductByID,
    currentPoduct,
    error
  };
};
