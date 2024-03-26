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
}

export interface CreateProduct {
  name: string;
  image: string;
  stock: number;
  price: number;
  priceWithIva: number;
  location: Location;
}
