import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string(),
  image: z.string(),
  stock: z.number().nonnegative(),
  price: z.number().nonnegative(),
  priceWithIva: z.number().nonnegative(),
  location: z.string()
});
