import { Panel } from 'primereact/panel';
import { useGetAllProducts } from '../../shared/datasources/products/products-api/useGetAllProducts.hook';
import { useEffect } from 'react';
import { ProductCard } from '../../shared/components/productCard/ProductCard';

export const Products = () => {
  const { currentPoducts, getAllProducts, error } = useGetAllProducts();

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
          <div
            className="col-12 md:col-6 lg:col-3 xl:col-2"
            key={product.productId}
          >
            {ProductCard(product)}
          </div>
        ))}
      </div>
    </Panel>
  );
};
