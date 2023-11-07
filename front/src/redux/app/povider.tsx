"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import React from "react";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import { addInterceptors } from "@/axiosApi";

export function Providers({ children }: { children: React.ReactNode }) {
    let persistor = persistStore(store)
    addInterceptors(store);
    return <Provider store={store}>
        <PersistGate persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}