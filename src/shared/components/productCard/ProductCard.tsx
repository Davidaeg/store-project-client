import { Button } from 'primereact/button';
import { Product } from '../../datasources/products/products.types';
import { getSeverity } from './ProductCard.utils';
import '../../../modules/home/components/carrousel/Carrousel.styles.css';
import 'primereact/resources/themes/saga-blue/theme.css';

export const ProductCard = (product: Product) => {
  return (
    <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 product-card  ">
      <div className="mb-3">
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          className="w-4 h-4 shadow-4  "
        />
      </div>
      <div>
        <h4 className="mb-1">{product.name}</h4>
        <h6 className="mt-0 mb-3">${product.price}</h6>
        <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
          <Button className="search-button" icon="pi pi-search" rounded />
          <Button
            icon="pi pi-star-fill"
            rounded
            severity={getSeverity(product)}
          />
        </div>
      </div>
    </div>
  );
};
