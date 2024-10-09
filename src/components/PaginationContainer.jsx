import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;

  const btns = Array.from({ length: pageCount }, (_, index) => {
    const btnIndex = index + 1;
    return (
      <Link
        key={btnIndex}
        className={`join-item btn btn-sm ${btnIndex === page && 'btn-active'}`}
        to={`/products?page=${btnIndex}`}
      >
        {btnIndex}
      </Link>
    );
  });
  console.log(page);
  return (
    <div className='join mt-5 flex justify-end'>
      <Link
        className={`join-item btn btn-sm ${page === 1 && 'btn-disabled'}`}
        to={`/products?page=${page === 1 ? '1' : page - 1}`}
      >
        Prev
      </Link>
      {btns}
      <Link
        className={`join-item btn btn-sm ${
          page === pageCount && 'btn-disabled'
        }`}
        to={`/products?page=${page === pageCount ? page : page + 1}`}
      >
        Next
      </Link>
    </div>
  );
};

{
  /* <button className='join-item btn btn-disabled'>...</button> */
}
