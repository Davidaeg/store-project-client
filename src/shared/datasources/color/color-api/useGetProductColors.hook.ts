import { useState } from 'react';
import { Color } from '../color.entity';
import { storeService } from '../../store-service/storeService';

export const useGetProductColors = () => {
  const [error, setError] = useState<string>('');
  const [currentColors, setCurrentColors] = useState<Color[]>([]);

  const getAllColors = async (productId: number) => {
    try {
      await storeService
        .get(`/color/product/${productId}`)
        .then((resp) => {
            setCurrentColors(resp.data as Color[]);
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
    getAllColors,
    currentColors,
    error
  };
};
