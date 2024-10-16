import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ComplexPaginationContainer,
  OrdersList,
  SectionTitle,
} from '../components';
import { customFetch } from '../utils';

const orderQuery = (params, user) => {
  return {
    queryKey: ['orders', user.username, params.page ? +params.page : 1],
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const { user } = store.getState().userState;

    if (!user) {
      toast.warn('You must logged in to view orders');
      return redirect('/login');
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const { data } = await queryClient.ensureQueryData(
        orderQuery(params, user)
      );
      return { orders: data.data, meta: data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error placing your order';
      toast.error(errorMessage);

      if (error.response?.status === 401 || error.response?.status === 403) {
        redirect('/login');
      }
      return null;
    }
  };

export const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) {
    return <SectionTitle text='please, make an order' />;
  }
  return (
    <>
      <SectionTitle text='your orders' />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};
