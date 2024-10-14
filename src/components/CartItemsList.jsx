import { useSelector } from 'react-redux';
import { getCartState } from '../features/cart/cartSelectors';
import { CartItem } from './CartItem';

export const CartItemsList = () => {
  const { cartItems } = useSelector(getCartState);

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.cartId} cartItem={item} />;
      })}
    </>
  );
};
