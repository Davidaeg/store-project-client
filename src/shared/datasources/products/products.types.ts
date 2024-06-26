export enum Location {
  Estante1 = 'Shelf1',
  Estante2 = 'Shelf2',
  Estante3 = 'Shelf3'
}

export const locationsOptions = Object.entries(Location).map(
  ([label, value]) => ({
    label,
    value
  })
);

export interface Product {
  productId: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  priceWithIva: number;
  location: Location;
  colors: string[];
}

export interface ProductForList {
  id: number;
  code: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  inventoryStatus: string;
}

export interface ProductDetail {
  name: string;
  price: number;
}

export interface CreateProduct {
  name: string;
  image: string;
  stock: number;
  price: number;
  priceWithIva: number;
  location: Location;
}
