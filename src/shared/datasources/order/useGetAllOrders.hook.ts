import { useState } from "react";
import { storeService } from "../store-service/storeService";
import { Order } from "./order.entity";

export const useGetAllOrders = () => {
    const [error, setError] = useState<string>('');
    const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  
    const getAllOrders = async () => {
      try {
        const resp = await storeService.get('/order'); 
        setCurrentOrders(resp.data); 
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    };

    return {
      getAllOrders,currentOrders,error
    };
}
