import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {usersSlice} from "@/features/users/usersSlice";

const reducers = {
    [usersSlice.name]: usersSlice.reducer,
};

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