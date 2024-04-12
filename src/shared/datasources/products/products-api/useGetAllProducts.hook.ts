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

  const getAllProductsForList = async () => {
    try {
      return await storeService
        .get('/products')
        .then((resp) => {
          const reponse = resp.data as Product[];
          return reponse.map((product) => {
            return {
              id: product.productId,
              code: product.productId.toString(),
              name: product.name,
              image: product.image,
              price: product.priceWithIva,
              quantity: product.stock,
              rating: 5,
              inventoryStatus: product.stock > 0 ? 'INSTOCK' : 'OUTOFSTOCK',
              location: product.location
            };
          });
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
          return [];
        });
    } catch (e: any) {
      console.log(e);
      setError(e.message);
      return [];
    }
  };

  return {
    getAllProducts,
    getAllProductsForList,
    currentPoducts,
    error
  };
};
