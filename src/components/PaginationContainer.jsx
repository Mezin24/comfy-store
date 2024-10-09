import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const handleClick = (page) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', page);
    const query = `${pathname}?${searchParams.toString()}`;
    navigate(query);
  };

  const btns = Array.from({ length: pageCount }, (_, index) => {
    const btnIndex = index + 1;
    return (
      <button
        key={btnIndex}
        className={`join-item btn btn-sm sm:btn-md ${
          btnIndex === page && 'btn-active'
        }`}
        onClick={() => handleClick(btnIndex)}
      >
        {btnIndex}
      </button>
    );
  });

  if (pageCount < 2) return null;

  return (
    <div className='join mt-16 flex justify-end'>
      <button
        className={`join-item btn btn-sm sm:btn-md ${
          page === 1 && 'btn-disabled'
        }`}
        onClick={() => {
          if (page === 1) return;
          handleClick(page - 1);
        }}
      >
        Prev
      </button>
      {btns}
      <button
        className={`join-item btn btn-sm sm:btn-md ${
          page === pageCount && 'btn-disabled'
        }`}
        onClick={() => {
          if (page === pageCount) return;
          handleClick(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};
