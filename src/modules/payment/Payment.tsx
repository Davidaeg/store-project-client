import { Panel } from 'primereact/panel';
import PaymentForm from './components/paymentform/PaymentForm';


export const Payment = () => {
  return (
    <Panel header="Pago">
      <div className="p-d-flex p-jc-center">
        <PaymentForm />
      </div>
    </Panel>
  );
};
