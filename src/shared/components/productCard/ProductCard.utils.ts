import { Product } from '../../datasources/products/products.types';

export const getSeverity = (product: Product) => {
  const stockStatus = product.stock > 0 ? 'INSTOCK' : 'OUTOFSTOCK';

  const severityMap = {
    INSTOCK: 'EN INVENTARIO',
    LOWSTOCK: 'BAJO EN INVENTARIO',
    OUTOFSTOCK: 'AGOTADO'
  };

  return severityMap[stockStatus] || null;
};
