export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
  image: string;
};
