import { useState } from 'react';
import { Product } from '../products.types';
import storeService from '../../store-service/storeService';

export const useUpdateProduct = () => {
  const [error, setError] = useState<string>('');
  const [productToUpdate, setProductToUpdate] = useState<Product>();

  const updateProduct = async (id: number, newInfo: Partial<Product>) => {
    try {
      await storeService
        .patch(`/products/${id}`, newInfo)
        .then((resp) => {
          setProductToUpdate(resp.data as Product);
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
    updateProduct,
    productToUpdate,
    error
  };
};
