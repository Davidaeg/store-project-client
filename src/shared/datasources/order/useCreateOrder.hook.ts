import { useState } from 'react';
import { CreateOrderDto } from './order.entity';
import { storeService } from '../store-service/storeService';

export const useCreateOrder = () => {
  const [error, setError] = useState<string>('');
  const [orderToCreate, setOrderToCreate] = useState<CreateOrderDto>();

  const createOrder = async (newOrder: CreateOrderDto) => {
    try {
      const resp = await storeService.post('/order', newOrder);
      setOrderToCreate(resp.data as CreateOrderDto);
      console.log('Person created:', resp.data);
      return Promise.resolve();
    } catch (error: any) {
      console.error('Error creating order:', error);
      setError(
        error.response?.data?.error ||
          'An error occurred while creating the order.'
      );
      return Promise.reject(error);
    }
  };

  return {
    createOrder,
    orderToCreate,
    error
  };
};
