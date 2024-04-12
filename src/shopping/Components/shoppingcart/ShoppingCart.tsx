import { Panel } from 'primereact/panel';
import { useShoppingCart } from '../../../context/shoppingCartContext';
import { CartItem } from '../CartItem';
import { Button } from 'primereact/button';
import '../shoppingcart/ShoppingCart.Styles.css';
import EmptyCartMessage from '../EmptyCart';

export const ShoppingCart = () => {
  const { cartItems, currentPoducts } = useShoppingCart();

  function totalInCart() {
    console.log(cartItems);
    return cartItems.reduce((total, cartItem) => {
      const item = currentPoducts.find((i) => i.productId === cartItem.id);
      return total + item!.price * cartItem.quantity;
    }, 0);
  }
  return (
    <Panel header={`Cart Total: $` + totalInCart().toFixed(2)}>
      <div>
        {cartItems.length === 0 ? (
          <div style={{ margin: '10% 0 50% 0' }}>
            <EmptyCartMessage />
          </div>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} {...item} />)
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="pay-button-container">
          <Button
            label="Proceder con el pago"
            className="pay-button"
            onClick={() => (window.location.href = '/store/payment')}
          />
        </div>
      )}
    </Panel>
  );
};
