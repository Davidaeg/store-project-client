import { Panel } from 'primereact/panel';
import { useProductApi } from '../../shared/datasources/products/products-api/useProductApi.hook';
import { useEffect } from 'react';

export const TempView = () => {
  const { currentPoducts, getAllProducts, error } = useProductApi();

  useEffect(() => {
    getAllProducts()
      .then(() => {
        console.log('Products loaded');
      })
      .catch(() => console.log(error));
  }, []);

  return (
    <Panel header="Temp View" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="p-d-flex p-jc-center">
        <h1>Temp View</h1>
        {currentPoducts.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
};
