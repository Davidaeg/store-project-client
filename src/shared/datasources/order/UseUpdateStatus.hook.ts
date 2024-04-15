import { useState } from "react";
import { storeService } from "../store-service/storeService";
import { Order } from "./order.entity";

export const useUpdateStatus = () => {
  const [error, setError] = useState<string>('');
  const [StatusToUpdate, setStatusToUpdate] = useState<Order>();

  const updateStatus = async (orderId: number, newInfo: Partial<Order>) => {
    try {
      await storeService
        .patch(`/order/updateOrderStatus/${orderId}`, newInfo)
        .then((resp) => {
          console.log('Respuesta del backend:', resp.data);
          setStatusToUpdate(resp.data as Order);
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
    updateStatus,
    StatusToUpdate,
    error
  };
};
