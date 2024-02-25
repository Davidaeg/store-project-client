import { useState } from 'react';
import { CreateProduct } from '../products.types';
import storeService from '../../store-service/storeService';

export const useCreateProduct = () => {
  const [error, setError] = useState<string>('');
  const [productToCreate, setProductToCreate] = useState<
    CreateProduct | undefined
  >();

  const createProduct = async (newProduct: CreateProduct) => {
    try {
      const resp = await storeService.post('/products', newProduct);
      setProductToCreate(resp.data as CreateProduct);
      console.log('Product created:', resp.data);
    } catch (error: any) {
      console.error('Error creating product:', error);
      setError(
        error.response?.data?.error ||
          'An error occurred while creating the product.'
      );
    }
  };

  return {
    createProduct,
    productToCreate,
    error
  };
};
