import { TabPanel, TabView } from 'primereact/tabview';
import { ProductForm } from './components/productForm/ProductForm';
import ProductsList from './components/productsList/ProductsList';
import { CreateOrder } from './components/createOrder/CreateOrder';

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
        <CreateOrder />
      </TabPanel>
    </TabView>
  );
};
