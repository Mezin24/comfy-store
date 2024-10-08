import { Link, useLoaderData } from 'react-router-dom';
import { convertToDollars } from '../utils/index.jsx';

export const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className='grid pt-12 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        const { image, title, price } = product.attributes;
        const dollarsAmount = convertToDollars(price);
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
          >
            <figure className='px-4 pt-4'>
              <img
                src={image}
                alt={title}
                className='rounded-xl h-64 md:h-48 w-full object-cover'
              />
            </figure>
            <div className='card-body items-center text-center '>
              <h2 className='card-title capitalize tracking-wider'>{title}</h2>
              <span className='text-primary'>{dollarsAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
