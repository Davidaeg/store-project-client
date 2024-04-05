import { Panel } from 'primereact/panel';
import { useShoppingCart } from '../../../context/shoppingCartContext';
import { Stack } from 'react-bootstrap';
import { CartItem } from '../CartItem';

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
      <Stack gap={5}>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </Stack>
    </Panel>
  );
};
