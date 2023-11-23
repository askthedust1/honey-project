import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart, IProduct, IProductView } from '@/types';
import { RootState } from '@/store/store';

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
    resetCart: (state) => {
      state.cart = [];
    },

    addToCartState: (state, action: PayloadAction<string>) => {
      state.itemsCart.push(action.payload);
    },
    clearCart: (state) => {
      state.itemsCart = [];
    },
    setProductsDataLoaded: (state, action) => {
      state.dataLoaded = action.payload;
    },
  },
});

export const selectCart = (state: RootState) => state.cart.cart;
export const { addProduct, resetCart, addToCartState, clearCart, setProductsDataLoaded } =
  cartSlice.actions;

export const selectProductsDataLoaded = (state: RootState) => state.cart.dataLoaded;
export const selectCartItems = (state: RootState) => state.cart.itemsCart;
