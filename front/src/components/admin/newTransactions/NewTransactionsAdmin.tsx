import {useAppSelector} from "@/store/hook";
import {selectAdminNewTransactions} from "@/features/adminNewMessages/adminNewTransactionSlice";

const NewTransactionsAdmin = () => {
    const newTransaction = useAppSelector(selectAdminNewTransactions);
    console.log(newTransaction[0]);
    return (
        <div>
            Новые заказы
            <span>{newTransaction.length}</span>
        </div>
    );
};

export default NewTransactionsAdmin;
