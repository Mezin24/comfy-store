import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const cartSlice = createSlice({
  name: 'cartState',
  initialState: defaultState,
  reducers: {
    addItem: (state, { payload }) => {
      const { product } = payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.cartId === product.cartId
      );
      if (item) {
        item.amount += product.amount;
      } else {
        0;
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      state.tax = state.cartTotal * 0.1;
      state.orderTotal += state.cartTotal + state.tax + state.shipping;
      localStorage.setItem('COMFY_CART', JSON.stringify(state));
      toast.success('Item was added to cart');
    },
    removeItem: (state, { payload }) => {},
    clearCart: (state) => {},
    editItem: (state, { payload }) => {},
  },
});

export const { addItem, clearCart, editItem, removeItem } = cartSlice.actions;
export const { reducer: cartReducer } = cartSlice;
