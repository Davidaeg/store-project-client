import { Button } from 'primereact/button';
import { useShoppingCart } from '../../../context/shoppingCartContext';
import { useGetProductById } from '../../../shared/datasources/products/products-api/useGetProductById.hook';
import { useEffect } from 'react';

type CartItemProps = {
  id: number;
  quantity: number;
  price: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { decreaseCartQuantity } = useShoppingCart();
  const { getProductByID, currentPoduct, error } = useGetProductById();

  useEffect(() => {
    getProductByID(id).catch(() => console.log(error));
  }, []);

  return (
    <div
      style={{ margin: 'auto' }}
      className="xl:col-4 grid nested-grid mb-3 bg-gray-200"
    >
      <div className="col-6 ">
        <div className="text-center">
          <img
            style={{ width: '125px', height: '150px', objectFit: 'cover' }}
            src={currentPoduct?.image}
            alt="item-image"
          />
        </div>
      </div>
      <div className="col-6">
        <div className="grid">
          <div className="col-12 ">
            <div className=" p-3 border-round-sm font-bold">
              {currentPoduct?.name}{' '}
              {quantity > 1 && (
                <span style={{ fontSize: '.65rem' }} className="text-muted">
                  x{quantity}
                </span>
              )}
            </div>
          </div>

          <div className="col-12">
            <div className="p-3 border-round-sm font-bold">
              {(currentPoduct?.price ?? 0) * quantity}{' '}
              <span style={{ fontSize: '.75rem' }} className="text-muted">
                CRC
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-12"
        style={{
          margin: 'auto',
          width: '50%',
          border: '3px',
          padding: '10px'
        }}
      >
        <div
          style={{
            margin: 'auto',
            width: '50%',
            border: '3px',
            padding: '10px'
          }}
        >
          <Button
            style={{
              background: '#fba855',
              border: '#fba855'
            }}
            icon="pi pi-minus"
            rounded
            className="ml-1 mr-5 lg:mr-0"
            label="Eliminar"
            onClick={() =>
              decreaseCartQuantity(
                currentPoduct!.productId,
                currentPoduct!.price
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
