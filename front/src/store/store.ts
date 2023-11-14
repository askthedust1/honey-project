import { createWrapper } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { productsSlice } from '@/features/products/productsSlice';
import {usersSlice, UserState} from '@/features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import {categoriesSlice} from "@/features/categories/categoriesSlice";
import { PersistPartial } from 'redux-persist/es/persistReducer';
import {bannersSlice} from "@/features/banners/bannersSlice";

type PersistedReducer<S> = (state: S | undefined, action: any) => S & PersistPartial;

const usersPersistConfig = {
    key: 'honey:users',
    storage,
    whitelist: ['user'],
};

const makeStore = () => {
    const isServer = typeof window === 'undefined';

    const reducers = {
        [productsSlice.name]: productsSlice.reducer,
        [categoriesSlice.name]: categoriesSlice.reducer,
        [bannersSlice.name]: bannersSlice.reducer,
        [usersSlice.name]: usersSlice.reducer,
    };

    if (!isServer) {
        reducers[usersSlice.name] = persistReducer(usersPersistConfig, usersSlice.reducer) as PersistedReducer<UserState>;
    }

    const reducer = combineReducers(reducers);

    const store = configureStore({
        reducer,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            });
        },
    });

    if (!isServer) {
        // @ts-expect-error
        store.__persistor = persistStore(store);
    }

    return store;
};

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export const wrapper = createWrapper<RootStore>(makeStore);
