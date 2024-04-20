import { useState } from 'react';
import { Color } from '../color.entity';
import { storeService } from '../../store-service/storeService';

export const useGetProductColors = () => {
  const [error, setError] = useState<string>('');
  const [currentColors, setCurrentColors] = useState<Color[]>([]);
  
  const getAllColors = async (productId: number) => {
    try {
      const resp = await storeService.get(`/color/product/${productId}`);
      setCurrentColors(resp.data);
    } catch (e: any) {
      setError(e.message);
    }
  };
  return {
    getAllColors,
    currentColors,
    error
  };
};
