import { Panel } from 'primereact/panel';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../shared/components/productCard/ProductCard';
import '../Products/ProductsStyles.css';
import { useProductFilter } from '../../shared/datasources/products/products-api/useProductFilter.hook';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Orders, options } from './OrdersTypes.enum';

export const Products = () => {
  const {
    filterProductsByName,
    getAllProducts,
    getAllProductsDesc,
    getAllProductsAsc,
    currentPoducts,
    error
  } = useProductFilter();

  const [order, setOrder] = useState<Orders>(Orders.Default);

  const handleOrder: Record<string, () => void> = {
    [Orders.Ascendent]: () => {
      getAllProductsAsc();
    },
    [Orders.Descendent]: () => {
      getAllProductsDesc();
    },
    [Orders.Default]: () => {
      getAllProducts();
    }
  };

  const handleOrderChange = (e: DropdownChangeEvent) => {
    setOrder(e.value);
    handleOrder[e.value]();
  };

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
        <div className="card flex justify-content-center">
          <Dropdown
            value={order}
            onChange={handleOrderChange}
            options={options}
            optionLabel="label"
            placeholder="Select a City"
            className="w-full md:w-14rem"
          />
        </div>
      </div>
      <div className="grid justify-content-center products-display">
        {currentPoducts.map((product: any) => (
          <div className="col-12 md:col-6 lg:col-3" key={product.productId}>
            {ProductCard(product)}
          </div>
        ))}
      </div>
    </Panel>
  );
};
