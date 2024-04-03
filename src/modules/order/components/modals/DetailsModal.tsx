import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Order} from '../types/Types';
import '../modals/Modals.css'

type ModalProps = {
  order: Order;
  onClose: () => void;
};

const DetailsModal = ({ order }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Button label="Detalles" onClick={toggleModal} className="p-button-text modal-button" />
      <Dialog
        visible={isVisible}
        style={{ width: '50rem' }}
        header={`Detalles del pedido ${order.id}`}
        modal
        className="p-fluid"
        onHide={toggleModal}
      >
        <div>
          <DataTable value={order.details} className="p-datatable-sm">
            <Column field="product.name" header="Producto" />
            <Column field="product.price" header="Precio" />
            <Column field="quantity" header="Cantidad" />
          </DataTable>
        </div>
      </Dialog>
    </>
  );
};

export default DetailsModal;
