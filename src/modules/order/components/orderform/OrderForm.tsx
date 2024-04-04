import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Order } from '../types/Types';
import { OrderStatus } from '../OrderStates.enum';
import ChangeStateModal from '../modals/ChangeStateModal';
import DetailsModal from '../modals/DetailsModal';

const OrderForm = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      client: 'Cliente',
      status: OrderStatus.DELIVERED,
      details: [
        {
          quantity: 1,
          product: {  name: 'Producto 1', price: 10 },
        },
        {
          quantity: 2,
          product: {  name: 'Producto 2', price: 20 },
        },
      ],
      
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleChangeOrderState = (order: Order, newState: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(prevOrder =>
        prevOrder === order ? { ...prevOrder, status: newState } : prevOrder
      )
    );
    setSelectedOrder(null);
  };

  return (
    <div className="card">
      <DataTable
        value={orders}
        tableStyle={{ minWidth: '50rem' }}
        selectionMode="single"
        selection={selectedOrder}
        onSelectionChange={(e) => setSelectedOrder(e.value[0])}
      >
        <Column field="id" header="Pedido" sortable style={{ width: '25%' }} />
        <Column field="client" header="Cliente" sortable style={{ width: '25%' }} />
        <Column field="status" header="Estado" sortable style={{ width: '25%' }} />
        <Column
          header="Opciones"
          body={(rowData) => (
            <>
              <DetailsModal order={rowData} onClose={() => setSelectedOrder(null)} />
              <ChangeStateModal
                order={rowData}
                onChangeState={(newState) => handleChangeOrderState(rowData, newState)}
                onClose={() => setSelectedOrder(null)}
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