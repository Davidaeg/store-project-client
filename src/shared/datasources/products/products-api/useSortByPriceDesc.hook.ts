import { useState } from 'react';
import { Product } from '../products.types';
import { storeService } from '../../store-service/storeService';

export const useSortByPriceDesc = () => {
  const [errorDesc, setError] = useState<string>('');
  const [currentPoductsDesc, setCurrentProductsDesc] = useState<Product[]>([]);

  const getAllProductsDesc = async () => {
    try {
      await storeService
        .get('/products/desc/price')
        .then((resp) => {
          setCurrentProductsDesc(resp.data as Product[]);
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
    getAllProductsDesc,
    currentPoductsDesc,
    errorDesc
  };
};
