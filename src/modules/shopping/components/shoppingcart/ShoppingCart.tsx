import { Panel } from 'primereact/panel';

import { CartItem } from '../CartItem';
import { Button } from 'primereact/button';
import '../shoppingcart/ShoppingCart.Styles.css';
import { Payment } from '../../../payment/Payment';
import { useState } from 'react';
import { useShoppingCart } from '../../../../context/shoppingCartContext';

export const ShoppingCart = () => {
  const { cartItems, currentPoducts } = useShoppingCart();
  const [viewPayment, setViewPayment] = useState(false);

  function totalInCart() {
    return cartItems.reduce((total, cartItem) => {
      const item = currentPoducts.find((i) => i.productId === cartItem.id);
      return total + (item ? item.price * cartItem.quantity : 0);
    }, 0);
  }

  function handleClick() {
    setViewPayment(true);
  }

  return (
    <>
      {viewPayment ? (
        <Payment />
      ) : (
        <Panel header={`Total del carrito: ₡${totalInCart()}`}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          {cartItems.length > 0 && (
            <div className="pay-button-container">
              <Button
                label="Proceder con el pago"
                className="pay-button"
                onClick={handleClick}
              />
            </div>
          )}
        </Panel>
      )}
    </>
  );
};
