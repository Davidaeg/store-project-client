import { Panel } from 'primereact/panel';
import { useProductApi } from '../../shared/datasources/products/products-api/useProductApi.hook';
import { useEffect } from 'react';

import { ProductCard } from '../../shared/components/productCard/ProductCard';
export const Products = () => {
  const { currentPoducts, getAllProducts, error } = useProductApi();

  useEffect(() => {
    getAllProducts()
      .then(() => {
        console.log('Products loaded');
      })
      .catch(() => console.log(error));
  }, []);

  return (
    <Panel header="Products">
      <div className="grid justify-content-center">
        {currentPoducts.map((product) => (
          <div className="col-12 md:col-6 lg:col-3 ">
            {ProductCard(product)}
          </div>
        ))}
      </div>
    </Panel>
  );
};
