import { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { OrderStatus } from '../OrderStates.enum';
import { Order } from '../types/Types';
import { Toast } from 'primereact/toast';
import '../modals/Modals.css';

type ModalProps = {
  order: Order;
  onChangeState?: (newState: OrderStatus) => void;
  onClose: () => void;
};

const ChangeStateModal = ({ order, onChangeState }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedState, setSelectedState] = useState<OrderStatus>(order.status);
  const orderStates = Object.values(OrderStatus);
  const toast = useRef<Toast>(null);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleChangeState = () => {
    if (onChangeState) {
      onChangeState(selectedState);
      toggleModal();
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El estado del pedido se ha cambiado con éxito',
          life: 3000
        });
      }
    }
  };

  return (
    <>
      <Button label="Cambiar Estado" onClick={toggleModal} className="p-button-text modal-button" />
      <Dialog
        visible={isVisible}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Cambiar estado del pedido"
        modal
        className="p-fluid"
        footer={
          <div>
            <Button label="Cancelar" onClick={toggleModal} severity="danger" outlined />
            <Button label="Aceptar" onClick={handleChangeState} severity="success" />
          </div>
        }
        onHide={toggleModal}
      >
        <Dropdown
          value={selectedState}
          options={orderStates}
          onChange={(e) => setSelectedState(e.value)}
          placeholder="Seleccionar estado"
        />
      </Dialog>
      <Toast ref={toast} />
    </>
  );
};

export default ChangeStateModal;
