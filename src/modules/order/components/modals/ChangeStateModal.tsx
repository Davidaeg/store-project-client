import { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { OrderStatus } from '../OrderStates.enum';
import { Toast } from 'primereact/toast';
import { Order } from '../../../../shared/datasources/order/order.entity';
import { useUpdateStatus } from '../../../../shared/datasources/order/UseUpdateStatus.hook';
import '../modals/Modals.css';

interface ModalProps {
  orderId: number; 
  order: Order;
  onChangeState?: (newState: OrderStatus) => Promise<void>; 
  updateOrders?: () => Promise<void>;
  onClose: () => void;
}

const ChangeStateModal = ({ orderId, order,  updateOrders, onClose }: ModalProps) => {
  const { updateStatus } = useUpdateStatus();

  const [isVisible, setIsVisible] = useState(false);
  const [selectedState, setSelectedState] = useState<OrderStatus>(order.status); 
  const orderStates = Object.values(OrderStatus);
  const toast = useRef<Toast>(null);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleChangeState = async () => {
    try {
      await updateStatus(orderId, { status: selectedState });
      toggleModal();
      if (updateOrders) {
        await updateOrders(); 
      }
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El estado del pedido se ha cambiado con éxito',
          life: 3000
        });
      }
    } catch (error) {
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al actualizar el estado de la orden',
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
          onChange={(e) => setSelectedState(e.value as OrderStatus)} 
          placeholder="Seleccionar estado"
        />
      </Dialog>
      <Toast ref={toast} />
    </>
  );
};

export default ChangeStateModal;





