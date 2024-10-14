import { useSelector } from 'react-redux';
import { convertToDollars } from '../utils';
import { getCartState } from '../features/cart/cartSelectors';

export const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(getCartState);

  return (
    <div className='card bg-base-200'>
      <div className='card-body'>
        <div className='flex justify-between text-sm border-b border-base-300 pb-2'>
          <span>Subtotal</span>
          <div className='font-medium '>{convertToDollars(cartTotal)}</div>
        </div>
        <div className='flex justify-between text-sm border-b border-base-300 pb-2'>
          <span>Shipping</span>
          <div className='font-medium '>{convertToDollars(shipping)}</div>
        </div>
        <div className='flex justify-between text-sm border-b border-base-300 pb-2'>
          <span>Tax</span>
          <div className='font-medium '>{convertToDollars(tax)}</div>
        </div>
        <div className='flex justify-between text-sm mt-4 pb-2 font-bold'>
          <span>Order Total</span>
          <div className='font-medium '>{convertToDollars(orderTotal)}</div>
        </div>
      </div>
    </div>
  );
};
