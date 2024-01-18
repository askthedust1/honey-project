import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import { ICart, IProduct, IProductView } from '@/types';

interface CartState {
  cart: ICart[];
  dataLoaded: boolean;
}

const initialState: CartState = {
  cart: [],
  dataLoaded: false,
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
    delProduct: (state, { payload: product }: PayloadAction<string>) => {
      const existingIndex = state.cart.findIndex((cartItem) => cartItem.product._id === product);

      state.cart.splice(existingIndex, 1);
    },
    decreaseProduct: (state, { payload: product }: PayloadAction<string>) => {
      const existingIndex = state.cart.findIndex((cartItem) => cartItem.product._id === product);

      state.cart[existingIndex].amount--;
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers(builder) {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, { payload }) => ({ ...state, ...payload.cart }),
    );
  },
});

export const selectCart = (state: RootState) => state.cart.cart;
export const { addProduct, decreaseProduct, delProduct, resetCart } = cartSlice.actions;
