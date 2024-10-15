import { useSelector } from 'react-redux';
import { SectionTitle } from '../components/SectionTitle';
import { CartItemsList } from '../components/CartItemsList';
import { CartTotals } from '../components/CartTotals';
import { Link } from 'react-router-dom';
import { getCartState } from '../features/cart/cartSelectors';
import { getUser } from '../features/user/userSelectors';

export const Cart = () => {
  const user = useSelector(getUser);

  const { numItemsInCart } = useSelector(getCartState);

  if (numItemsInCart === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }
  return (
    <>
      <SectionTitle text='Shopping cart' />
      <div className='grid mt-8 gap-8 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {user ? (
            <Link
              to='/checkout'
              className='btn btn-primary btn-block mt-8 uppercase font-bold'
            >
              proceed to checkout
            </Link>
          ) : (
            <Link
              to='/login'
              className='btn btn-primary btn-block mt-8 uppercase font-bold'
            >
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
