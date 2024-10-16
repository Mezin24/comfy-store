import { Link, useLoaderData } from 'react-router-dom';
import {
  convertToDollars,
  customFetch,
  generateAmountOptions,
} from '../utils/index.jsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice.js';

const singleProductQuery = (id) => ({
  queryKey: ['singleProduct', id],
  queryFn: () => customFetch(`/products/${id}`),
});

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    const { data } = await queryClient.ensureQueryData(singleProductQuery(id));
    const product = data.data;
    return { product };
  };

export const SingleProduct = () => {
  const { product } = useLoaderData();
  const dispatch = useDispatch();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const { id } = product;
  const dollarsAmount = convertToDollars(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartItem = {
    cartId: id + productColor,
    company,
    image,
    price,
    productColor,
    productId: id,
    amount,
    title,
  };

  const addToCart = () => {
    dispatch(addItem({ product: cartItem }));
  };

  return (
    <section>
      <div className='text-md breadcrumbs'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16'>
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className='w-96 h-96 object-cover rounded-lg lg:w-full  '
        />
        {/* PRODUCT INFO */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2'>
            {company}
          </h4>

          <p className='mt-3 text-xl'>{dollarsAmount}</p>

          <p className='mt-6 leading-8'>{description}</p>

          {/* COLORS */}
          <div className='mt-6'>
            <h4 className='text-md font-medium tracking-wider capitalize'>
              colors
            </h4>
            <div className='mt-2'>
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type='button'
                    className={`badge  w-6 h-6 mr-2  ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <h4 className='text-md font-medium tracking-wider capitalize'>
                amount
              </h4>
            </label>
            <select
              className='select select-secondary select-bordered select-md'
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
            </select>
          </div>
          {/* CART BUTTON */}
          <div className='mt-10 '>
            <button className='btn btn-secondary btn-md' onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
