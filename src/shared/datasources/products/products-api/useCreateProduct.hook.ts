import { useState } from 'react';
import { CreateProduct } from '../products.types';
import storeService from '../../store-service/storeService';

export const useCreateProduct = () => {
  const [error, setError] = useState<string>('');
  const [productToCreate, setProductToCreate] = useState<
    CreateProduct | undefined
  >();

  const createProduct = async (newProduct: CreateProduct, imageFile?: File) => {
    try {
      const resp = await storeService.post('/products', newProduct);
      setProductToCreate(resp.data as CreateProduct);

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile, imageFile.name);

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        await storeService.post('/products/upload', formData, config);
      }
    } catch (error: any) {
      console.error('Error creating product:', error);
      setError(
        error.response?.data?.error ||
          'An error occurred while creating the product.'
      );
    }
  };

  //this returns the object
  return {
    createProduct,
    productToCreate,
    error
  };
};
