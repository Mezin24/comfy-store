import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

export const ComplexPaginationContainer = () => {
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

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`join-item btn btn-sm sm:btn-md ${
          activeClass && 'btn-active'
        }`}
        onClick={() => {
          handleClick(pageNumber);
        }}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    if (page > 2) {
      // dots
      pageButtons.push(
        <button
          className='join-item btn btn-sm sm:btn-md btn-disabled'
          key='dots-1'
        >
          ...
        </button>
      );
    }
    // active/current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }
    if (page < pageCount - 1) {
      pageButtons.push(
        <button
          className='join-item btn btn-sm sm:btn-md btn-disabled'
          key='dots-2'
        >
          ...
        </button>
      );
    }
    // last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

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
      {renderPageButtons()}
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
