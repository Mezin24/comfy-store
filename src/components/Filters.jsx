import { Form, Link } from 'react-router-dom';
import { FormInput } from './FormInput';

export const Filters = () => {
  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      <FormInput
        type='search'
        label='search product'
        name='search'
        size='input-sm'
      />
      <button type='submit' className='btn btn-primary btn-sm uppercase'>
        search
      </button>
      <Link className='btn btn-accent btn-sm uppercase' to='/products'>
        reset
      </Link>
    </Form>
  );
};
