import { useState } from 'react';
import { Product } from '../products.types';
import storeService from '../../store-service/storeService';

export const useDeleteProduct = () => {
  const [error, setError] = useState<string>('');
  const [productToDelete, setProductToDelete] = useState<Product>();

  const deleteProduct = async (id: number) => {
    try {
      await storeService
        .delete(`/products/${id}`)
        .then((resp) => {
          setProductToDelete(resp.data as Product);
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
    deleteProduct,
    productToDelete,
    error
  };
};
