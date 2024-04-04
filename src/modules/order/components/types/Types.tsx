import { ProductDetail } from "../../../../shared/datasources/products/products.types";
import { OrderStatus } from "../OrderStates.enum";

export interface Order {
  id: number;
  client: string;
  status: OrderStatus;
  details: OrderDetail[];
}

export interface OrderDetail {
  quantity: number;
  product: ProductDetail;
}