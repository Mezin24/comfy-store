import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { loginUser } from '../features/user/userSlice';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const action =
  (store) =>
  async ({ request }) => {
    const { dispatch } = store;
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    try {
      const { data } = await customFetch.post('/auth/local', userData);
      toast.success('logged in successfully');
      dispatch(loginUser(data));
      return redirect('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your data';
      toast.error(errorMessage);
    }
    return null;
  };

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const { data } = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });
      dispatch(loginUser(data));
      toast.success('Welcome guest user');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('guest user login error, please try again later');
    }
  };

  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='post'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput
          type='email'
          name='identifier'
          label='email'
          defaultValue='test@test.com'
        />
        <FormInput
          type='password'
          label='password'
          name='password'
          defaultValue='secret'
        />
        <div className='mt-4'>
          <SubmitBtn text='login' />
        </div>
        <button
          onClick={loginAsGuestUser}
          className='btn btn-secondary btn-block uppercase'
        >
          guest user
        </button>
        <p className='text-center'>
          Not a member yet?{' '}
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
