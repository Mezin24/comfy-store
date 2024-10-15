import { Form, Link, redirect } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  try {
    const { data } = await customFetch.post('/auth/local/register', userData);
    const user = { ...data.user, token: data.jwt };

    toast.success('account created successfully');
    return redirect('/');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || 'please double check your data';
    toast.error(errorMessage);
  }
  return null;
};

export const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='post'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <FormInput
          type='text'
          label='username'
          name='username'
          defaultValue='mezin24'
        />
        <FormInput
          type='email'
          label='email'
          name='email'
          defaultValue='mezin24@mail.ru'
        />
        <FormInput
          type='password'
          label='password'
          name='password'
          defaultValue='123456'
        />
        <div className='mt-4'>
          <SubmitBtn text='register' />
        </div>
        <p className='text-center'>
          Already a member?
          <Link
            to='/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};
