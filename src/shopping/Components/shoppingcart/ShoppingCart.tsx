import { Panel } from 'primereact/panel';
import { useShoppingCart } from '../../../context/shoppingCartContext';
import { CartItem } from '../CartItem';
import { Button } from 'primereact/button';
import '../shoppingcart/ShoppingCart.Styles.css'

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
    <Panel header={`Cart Total: $` + totalInCart()}>
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      {cartItems.length > 0 && ( 
        <div className="pay-button-container">
          <Button label="Proceder con el pago" className="pay-button" onClick={() => window.location.href = '/store/payment'} />
        </div>
      )}
    </Panel>
  );
};
