import { Product } from '../../datasources/products/products.types';

export const getSeverity = (product: Product) => {
  const stockStatus = product.stock > 0 ? 'INSTOCK' : 'OUTOFSTOCK';

  const severityMap = {
    INSTOCK: 'INSTOCK',
    LOWSTOCK: 'LOWSTOCK',
    OUTOFSTOCK: 'OUTOFSTOCK'
  };

  return severityMap[stockStatus] || null;
};
