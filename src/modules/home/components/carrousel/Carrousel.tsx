import { useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { responsiveOptions } from './carrousel.utils';
import { ProductCard } from '../../../../shared/components/productCard/ProductCard';
import { useGetAllProducts } from '../../../../shared/datasources/products/products-api/useGetAllProducts.hook';

export const Carrousel = () => {
  const { currentPoducts, getAllProducts } = useGetAllProducts();
  useEffect(() => {
    getAllProducts()
      .then(() => {
        console.log('Products Loaded');
      })
      .catch((e) => {
        console.log('Error' + e);
      });
  }, []);

  return (
    <div className="card">
      <Carousel
        value={currentPoducts}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={ProductCard}
      />
    </div>
  );
};
