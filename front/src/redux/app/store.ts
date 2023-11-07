import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import {usersReducer} from "@/app/users/tools/usersSlice";
import {categoriesReducer} from "@/redux/features/categories/categoriesSlice";
const usersPersistConfig = {
    key: 'honey:users',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    users: persistReducer(usersPersistConfig, usersReducer),
    // products: productsReducer,
    categories: categoriesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
