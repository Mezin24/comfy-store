import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

export const OrdersList = () => {
  const { orders, meta } = useLoaderData();

  return (
    <div className='mt-8'>
      <h4 className='mb-4 capitalize'>total orders: {meta.pagination.total}</h4>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Coast</th>
              <th className='hidden sm:block'>Date</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {orders.map((order) => {
              const { name, address, numItemsInCart, orderTotal, createAt } =
                order.attributes;
              const date = day(createAt).format('hh:mm a - MMM Do, YYYY');
              return (
                <tr key={order.id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className='hidden sm:block'>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
