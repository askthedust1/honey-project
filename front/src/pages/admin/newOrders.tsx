import React from 'react';
import ProtectedRoute from "@/components/UI/protectedRoute/ProtectedRoute";
import {MyPage} from "@/components/common/types";
import NewTransactionsAdmin from "@/components/admin/newTransactions/NewTransactionsAdmin";

const NewOrders: MyPage = () => {
    return (
        <ProtectedRoute>
            <NewTransactionsAdmin/>
        </ProtectedRoute>
    );
};

NewOrders.Layout = 'Admin';

export default NewOrders;
