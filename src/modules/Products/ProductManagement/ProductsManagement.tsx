import { TabPanel, TabView } from 'primereact/tabview';
import { ProductForm } from './components/ProductForm/ProductForm';
import ProductsList from './components/products-list/ProductsList';

export const ProductsManagement = () => {
  return (
    <TabView>
      <TabPanel header="Crear Producto">
        <ProductForm />
      </TabPanel>
      <TabPanel header="Lista De Productos">
        <ProductsList />
      </TabPanel>
      <TabPanel header="Generar Pedido">
        <h1>Generar Pedido</h1>
      </TabPanel>
    </TabView>
  );
};
