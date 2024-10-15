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
const LS_STATE_KEY = 'COMFY_CART';
const getStateFromLS = () =>
  JSON.parse(localStorage.getItem(LS_STATE_KEY)) || defaultState;

const cartSlice = createSlice({
  name: 'cartState',
  initialState: getStateFromLS(),
  reducers: {
    addItem: (state, { payload }) => {
      const { product } = payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.cartId === product.cartId
      );
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Item was added to cart');
    },
    clearCart: () => {
      localStorage.setItem(LS_STATE_KEY, JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, { payload }) => {
      const { cartId } = payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.cartId === cartId
      );
      state.numItemsInCart -= item.amount;
      state.cartTotal -= item.price * item.amount;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.cartId !== cartId
      );
      cartSlice.caseReducers.calculateTotals(state);
      toast.warn('Item was removed');
    },
    editItem: (state, { payload }) => {
      const { cartId, amount } = payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.cartId === cartId
      );
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.warn('Cart updated');
    },
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal += state.cartTotal + state.tax + state.shipping;
      localStorage.setItem(LS_STATE_KEY, JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, editItem, removeItem } = cartSlice.actions;
export const { reducer: cartReducer } = cartSlice;
