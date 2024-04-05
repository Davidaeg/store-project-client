import { Button } from 'primereact/button';
import { useShoppingCart } from '../../context/shoppingCartContext';
import { useGetProductById } from './../../shared/datasources/products/products-api/useGetProductById.hook';
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
    <div className="grid nested-grid mb-3">
      <div className="lg:col-2 bg-gray-200">
        <div className="text-center">
          <img
            style={{ width: '125px', height: '150px', objectFit: 'cover' }}
            src={`/images/${currentPoduct?.image}`}
            alt="item-image"
          />
        </div>
      </div>
      <div className="col-4  lg:col-2 xl:col-1 bg-gray-200">
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
                usd
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-2 bg-gray-200">
        <div className="mt-6">
          <Button
            style={{ background: '#fba855', border: '#fba855' }}
            icon="pi pi-minus"
            rounded
            className="ml-1 mr-5 lg:mr-0"
            label="remove"
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
