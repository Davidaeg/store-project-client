import { useState } from "react";
import { storeService } from "../store-service/storeService";
import { CreateOrderDetailsDto } from "./order.entity";

export const useGetDetailsByOrderId = (orderId: number) => {
  const [error, setError] = useState<string>('');
  const [currentDetails, setCurrentDetails] = useState<CreateOrderDetailsDto[]>([]);

  const getDetails= async () => {
    try {
      const resp = await storeService.get(`/order/details/${orderId}`); 
      setCurrentDetails(resp.data); 
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  return {
    getDetails,
    currentDetails,
    error
  };
};

