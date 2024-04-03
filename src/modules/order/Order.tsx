import { Panel } from 'primereact/panel';
import OrderForm from './components/orderform/OrderForm';


export const Order = () => {
  return (
    <Panel header="Pedidos">
      <div className="p-d-flex p-jc-center">
        <OrderForm />
      </div>
    </Panel>
  );
};
