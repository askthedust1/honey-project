import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart, IProduct, IProductView } from '@/types';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';

interface CartState {
  cart: ICart[];
  itemsCart: string[];
  dataLoaded: boolean;
}

const initialState: CartState = {
  cart: [],
  itemsCart: [],
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

    addToCartState: (state, action: PayloadAction<string>) => {
      // state.itemsCart.push(action.payload);
    },
    clearCart: (state) => {
      state.itemsCart = [];
    },
    setProductsDataLoaded: (state, action) => {
      state.dataLoaded = action.payload;
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
export const {
  addProduct,
  decreaseProduct,
  delProduct,
  resetCart,
  addToCartState,
  clearCart,
  setProductsDataLoaded,
} = cartSlice.actions;

export const selectProductsDataLoaded = (state: RootState) => state.cart.dataLoaded;
export const selectCartItems = (state: RootState) => state.cart.itemsCart;
