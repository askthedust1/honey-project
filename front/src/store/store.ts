import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {usersSlice} from "@/features/users/usersSlice";
import {productsSlice} from "@/features/products/productsSlice";
import {categoriesSlice} from "@/features/categories/categoriesSlice";

const reducers = {
    [usersSlice.name]: usersSlice.reducer,
    [categoriesSlice.name]: categoriesSlice.reducer,
    [productsSlice.name]: productsSlice.reducer,

const reducer = combineReducers(reducers);

const makeStore = () =>
    configureStore({
        reducer,
        devTools: true,
    });

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = ReturnType<RootStore['dispatch']>;
export const wrapper = createWrapper<RootStore>(makeStore);