import { Panel } from 'primereact/panel';
import { useShoppingCart } from '../../../context/shoppingCartContext';
import { CartItem } from '../CartItem';
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
    </Panel>
  );
};
