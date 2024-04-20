import { Panel } from 'primereact/panel';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../shared/components/productCard/ProductCard';
import _styles from '../Products/ProductsStyles.css';
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

  const [order, setOrder] = useState<Orders>(Orders.Predeterminada);
  const [searchByName, setSearchByName] = useState<string>('');

  const handleOrder: Record<string, () => void> = {
    [Orders.Ascendente]: () => {
      getAllProductsAsc();
    },
    [Orders.Descendente]: () => {
      getAllProductsDesc();
    },
    [Orders.Predeterminada]: () => {
      getAllProducts();
    }
  };

  const handleOrderChange = (e: DropdownChangeEvent) => {
    handleOrder[e.value]();
    setOrder(e.value);
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
    <Panel header="Productos">
      <div className="grid justify-content-center">
        <div className="card flex justify-content-center grid">
          <div className="dropdown-container">
            <small id="username-help">Ordenar artículos por precio</small>
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
            <Button
              label="Buscar"
              icon="pi pi-search"
              onClick={handleSearch}
              style={{ background: '#fba855', border: '#fba855' }}
            />
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
