import { useState } from 'react';
import { Product } from '../products.types';
import { storeService } from '../../store-service/storeService';

export const useProductFilter = () => {
  const [error, setError] = useState<string>('');
  const [currentPoducts, setCurrentProducts] = useState<Product[]>([]);

  const getAllProductsAsc = async () => {
    try {
      await storeService
        .get('/products/asc/price')
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

  const getAllProductsDesc = async () => {
    try {
      await storeService
        .get('/products/desc/price')
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

  const filterProductsByName = async (name: String) => {
    try {
      await storeService
        .get(`/products/search/${name}`)
        .then((resp) => {
          setCurrentProducts(resp.data as Product[]);
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
    getAllProducts,
    getAllProductsDesc,
    getAllProductsAsc,
    currentPoducts,
    error
  };
};
