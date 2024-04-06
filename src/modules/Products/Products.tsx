import { Panel } from 'primereact/panel';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../shared/components/productCard/ProductCard';
import '../Products/ProductsStyles.css';
import { useProductFilter } from '../../shared/datasources/products/products-api/useProductFilter.hook';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Orders, options } from './OrdersTypes.enum';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

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
  const [searchByName, setSearchByName] = useState<string>('');

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

  const handleSearch = () => {
    filterProductsByName(searchByName);
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
        <div className="card flex justify-content-center grid">
          <div className="dropdown-container">
            <small id="username-help">Sort Items by price</small>
            <Dropdown
              value={order}
              onChange={handleOrderChange}
              options={options}
              optionLabel="label"
              placeholder="Select a City"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="input-button-container">
            <InputText
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
            <Button label="Search" icon="pi pi-search" onClick={handleSearch} />
          </div>
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
