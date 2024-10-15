import { Form, redirect } from 'react-router-dom';
import { FormInput } from './FormInput';
import { SubmitBtn } from './SubmitBtn';
import { customFetch, convertToDollars } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    const { user } = store.getState().userState;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: convertToDollars(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const response = await customFetch.post(
        '/orders',
        { data: info },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      store.dispatch(clearCart());
      toast.success('order placed successfully');
      return redirect('/ordres');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error placing your order';
      toast.error(errorMessage);
      return null;
    }
  };

export const CheckoutForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl capitalize'>shipping informatio</h4>
      <FormInput label='first name' name='name' type='text' />
      <FormInput label='address' name='address' type='text' />
      <div className='nt-4 '>
        <SubmitBtn text='place your order' />
      </div>
    </Form>
  );
};
