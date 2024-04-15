import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OrderStatus } from '../OrderStates.enum';
import { Order } from '../../../../shared/datasources/order/order.entity';
import { useUpdateStatus } from '../../../../shared/datasources/order/UseUpdateStatus.hook';
import { useGetAllOrders } from '../../../../shared/datasources/order/useGetAllOrders.hook';
import ChangeStateModal from '../modals/ChangeStateModal';
import DetailsModal from '../modals/DetailsModal';


const OrderForm = () => {
  const { getAllOrders, currentOrders } = useGetAllOrders(); 
  const { updateStatus } = useUpdateStatus(); 

  useEffect(() => {
    getAllOrders(); 
  }, []); 

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleChangeOrderState = async (orderId: number, newState: OrderStatus) => {
    await updateStatus(orderId, { status: newState }); 
    getAllOrders();
  };

  return (
    <div className="card">
      <DataTable
        value={currentOrders} 
        tableStyle={{ minWidth: '50rem' }}
        selectionMode="single"
        selection={selectedOrder}
        onSelectionChange={(e) => setSelectedOrder(e.value[0])}
      >
       <Column field="orderId" header="Pedido" sortable style={{ width: '25%' }} />
        <Column field="customerName" header="Cliente" sortable style={{ width: '25%' }} />
        <Column field="purchaseDate" header="Fecha de Compra" sortable style={{ width: '25%' }} />
        <Column field="status" header="Estado" sortable style={{ width: '25%' }} />
        <Column
          header="Opciones"
          body={(rowData) => (
            <>
              <DetailsModal orderId={rowData.orderId} onClose={() => setSelectedOrder(null)} />
              <ChangeStateModal
                 orderId={rowData.orderId} 
                 order={rowData}
                 onChangeState={(newState) => handleChangeOrderState(rowData.orderId, newState)} 
                 onClose={() => setSelectedOrder(null)}
                 updateOrders={getAllOrders}
              />
            </>
          )}
          style={{ width: '50%' }} 
        />
      </DataTable>
    </div>
  );
};

export default OrderForm;
