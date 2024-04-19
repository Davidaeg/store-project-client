import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../modals/Modals.css';
import { useGetDetailsByOrderId } from '../../../../shared/datasources/order/UseGetDetailsByOrderId.hook';

interface ModalProps {
  orderId: number;
  onClose: () => void;
}

const DetailsModal = ({ orderId }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { getDetails, currentDetails, error } = useGetDetailsByOrderId(orderId);

  const toggleModal = () => {
    setIsVisible(!isVisible);
    getDetails();
  };

  return (
    <>
      <Button
        label="Detalles"
        onClick={toggleModal}
        className="p-button-text modal-button"
      />
      <Dialog
        visible={isVisible}
        style={{ width: '50rem' }}
        header={`Detalles del pedido ${orderId}`}
        modal
        className="p-fluid"
        onHide={toggleModal}
      >
        <div>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <DataTable value={currentDetails} className="p-datatable-sm">
              <Column field="productName" header="Producto" />
              <Column field="productPrice" header="Precio" />
              <Column field="quantity" header="Cantidad" />
            </DataTable>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default DetailsModal;
