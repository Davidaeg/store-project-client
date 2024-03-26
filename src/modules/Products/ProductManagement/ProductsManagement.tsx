import { TabPanel, TabView } from 'primereact/tabview';
import { ProductForm } from './components/ProductForm/ProductForm';

export const ProductsManagement = () => {
  return (
    <TabView>
      <TabPanel header="Crear Producto">
        <ProductForm />
      </TabPanel>
      <TabPanel header="Lista De Productos">
        <h1>Lista de productos</h1>
      </TabPanel>
      <TabPanel header="Generar Pedido">
        <h1>Generar Pedido</h1>
      </TabPanel>
    </TabView>
  );
};
