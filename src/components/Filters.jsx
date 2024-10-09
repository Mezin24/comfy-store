import { Form, Link, useLoaderData } from 'react-router-dom';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormRange } from './FormRange';
import { FormCheckbox } from './FormCheckbox';

export const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, category, company, order, price, shipping } = params;
  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      <FormInput
        type='search'
        label='search product'
        name='search'
        size='input-sm'
        defaultValue={search || ''}
      />
      {/* CATEGORIES */}
      <FormSelect
        label='select category'
        name='category'
        list={meta.categories}
        defaultValue={category || meta.categories?.[0]}
      />
      {/* COMPANIES */}
      <FormSelect
        label='select company'
        name='company'
        list={meta.companies}
        defaultValue={company || meta.company?.[0]}
      />
      {/* ORDER */}
      <FormSelect
        label='sort by'
        name='order'
        list={['a-z', 'z-a', 'high', 'low']}
        defaultValue={order || 'a-z'}
      />
      {/* PRICE */}
      <FormRange
        name='price'
        label='select price'
        size='range-sm'
        price={price}
      />
      {/* SHIPPING */}
      <FormCheckbox
        name='shipping'
        label='free shipping'
        size='checkbox-sm'
        defaulrValue={shipping}
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
