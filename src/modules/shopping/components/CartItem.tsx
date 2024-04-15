import { Button } from 'primereact/button';
import { useShoppingCart } from '../../../context/shoppingCartContext';
import { Product } from '../../../shared/datasources/products/products.types';

type CartItemProps = {
  product: Product;
  quantity: number;
};

export function CartItem({ product, quantity }: CartItemProps) {
  const { decreaseCartQuantity } = useShoppingCart();

  return (
    <div
      style={{ margin: 'auto' }}
      className="xl:col-4 grid nested-grid mb-3 bg-gray-200"
    >
      <div className="col-6 ">
        <div className="text-center">
          <img
            style={{ width: '125px', height: '150px', objectFit: 'cover' }}
            src={product.image}
            alt="item-image"
          />
        </div>
      </div>
      <div className="col-6">
        <div className="grid">
          <div className="col-12 ">
            <div className=" p-3 border-round-sm font-bold">
              {product.name}{' '}
              {quantity > 1 && (
                <span style={{ fontSize: '.65rem' }} className="text-muted">
                  x{quantity}
                </span>
              )}
            </div>
          </div>

          <div className="col-12">
            <div className="p-3 border-round-sm font-bold">
              {(product.price ?? 0) * quantity}{' '}
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
              decreaseCartQuantity(product.productId, product.price)
            }
          />
        </div>
      </div>
    </div>
  );
}
