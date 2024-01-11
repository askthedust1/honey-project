import { createWrapper } from 'next-redux-wrapper';
import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { productsSlice } from '@/features/products/productsSlice';
import { usersSlice } from '@/features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { categoriesSlice } from '@/features/categories/categoriesSlice';
import { bannersSlice } from '@/features/banners/bannersSlice';
import { cartSlice } from '@/features/cart/cartSlice';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { productsAdminSlice } from '@/features/productAdmin/productsAdminSlice';
import { addInterceptors } from '@/axiosApi';
import { adminCategoriesSlice } from '@/features/adminCategories/adminCategoriesSlice';
import { adminMainSlice } from '@/features/adminMain/adminMainSlice';
import { orderSlice } from '@/features/order/orderSlice';
import { orderAdminSlice } from '@/features/orderAdmin/ordersAdminSlice';
import { bestsellersSlice } from '@/features/adminBestsellers/adminBestsellersSlice';
import { adminNewTransactionsSlice } from '@/features/adminNewMessages/adminNewTransactionSlice';

const usersPersistConfig = {
  key: 'honey:users',
  storage,
  whitelist: ['user'],
};

export const makeStore = wrapMakeStore(() => {
  const isServer = typeof window === 'undefined';

  const reducers = {
    [productsSlice.name]: productsSlice.reducer,
    [categoriesSlice.name]: categoriesSlice.reducer,
    [adminCategoriesSlice.name]: adminCategoriesSlice.reducer,
    [adminMainSlice.name]: adminMainSlice.reducer,
    [adminNewTransactionsSlice.name]: adminNewTransactionsSlice.reducer,
    [bannersSlice.name]: bannersSlice.reducer,
    [bestsellersSlice.name]: bestsellersSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [orderAdminSlice.name]: orderAdminSlice.reducer,
    [productsAdminSlice.name]: productsAdminSlice.reducer,
    [usersSlice.name]: isServer
      ? usersSlice.reducer
      : (persistReducer(usersPersistConfig, usersSlice.reducer) as Reducer),
  };

  const reducer = combineReducers(reducers);

  const store = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).prepend(
        nextReduxCookieMiddleware({
          subtrees: [`${cartSlice.name}.cart`, `${orderSlice.name}.dateOrder`],
        }),
      );
    },
  });
  addInterceptors(store);

  if (!isServer) {
    // @ts-expect-error
    store.__persistor = persistStore(store);
  }

  return store;
});

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export const wrapper = createWrapper<RootStore>(makeStore);
