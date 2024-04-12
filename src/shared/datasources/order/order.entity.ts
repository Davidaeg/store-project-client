export interface CreateOrderDetailsDto {
  productId: number;
  quantity: number;
}
export interface CreateOrderDto {
  customerId: number;
  purchaseDate: Date;
  status: string;
  products: CreateOrderDetailsDto[];
}
