import { useState } from 'react';
import { CreateProduct } from '../products.types';
import {
  cloudinaryService,
  storeService
} from '../../store-service/storeService';

export const useCreateProduct = () => {
  const [error, setError] = useState<string>('');

  const createProduct = async (newProduct: CreateProduct, imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile, imageFile.name);
      formData.append(
        'upload_preset',
        `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
      );
      formData.append(
        'cloud_name',
        `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`
      );
      formData.append('folder', 'products');

      const result = await cloudinaryService.post(
        `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      const resp = await storeService.post('/products', {
        ...newProduct,
        image: result.data.secure_url
      });

      if (resp.status === 201) {
        console.log('Product created:', resp.data);
        return true;
      }
    } catch (error: any) {
      console.error('Error creating product:', error);
      setError(
        error.response?.data?.error ||
          'An error occurred while creating the product.'
      );
      return false;
    }
  };

  return {
    createProduct,
    error
  };
};
