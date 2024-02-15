import { useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { responsiveOptions } from './carrousel.utils';
import { ProductCard } from '../../../../shared/components/productCard/ProductCard';
import { useProductApi } from '../../../../shared/datasources/products/products-api/useProductApi.hook';

export const Carrousel = () => {
  const { currentPoducts, getAllProducts } = useProductApi();
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
