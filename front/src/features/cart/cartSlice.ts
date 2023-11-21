import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart, IProduct, IProductView } from '@/types';
import { RootState } from '@/store/store';

interface CartState {
  cart: ICart[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, { payload: product }: PayloadAction<IProduct | IProductView>) => {
      const existingIndex = state.cart.findIndex(
        (cartItem) => cartItem.product._id === product._id,
      );

      if (existingIndex !== -1) {
        state.cart[existingIndex].amount++;
      } else {
        state.cart.push({
          amount: 1,
          product,
        });
      }
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
});

export const selectCart = (state: RootState) => state.cart.cart;
export const { addProduct, resetCart } = cartSlice.actions;
