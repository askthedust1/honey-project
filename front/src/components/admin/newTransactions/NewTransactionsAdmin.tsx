import {useAppSelector} from "@/store/hook";
import {selectAdminNewTransactions} from "@/features/adminNewMessages/adminNewTransactionSlice";
import cls from '../../../styles/_adminNewTransaction.module.scss';
const NewTransactionsAdmin = () => {
    const newTransactions = useAppSelector(selectAdminNewTransactions);
    const sixFirstTransactions = newTransactions.slice(0, 6);
    console.log(newTransactions[0]);
    return (
        <div className={cls.container}>
            <h3 className={cls.title}>Новые заказы</h3>
            <ul className={cls.cardList}>
                {sixFirstTransactions.map((transaction, index) => (
                    <li key={index} className={cls.card}>
                        <span>{index + 1}</span>
                        <span className={cls.user}>{transaction.user.displayName}</span>
                        <span className={cls.kits}>
                            {transaction.kits.length}{' '}
                            {transaction.kits.length === 1
                                ? 'товар'
                                : transaction.kits.length > 1 && transaction.kits.length <= 4
                                    ? 'товара'
                                    : 'товаров'}
                        </span>
                        <span className={cls.dateTime}>
                            {new Date(transaction.dateTime).toLocaleString('en-US', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                                timeZone: 'UTC',
                            })}
                        </span>

                    </li>
                ))}
            </ul>
            {newTransactions.length > 6 && <div className={cls.more}>
                <span>еще {newTransactions.length - 6}</span>
            </div>}
        </div>
    );
};

export default NewTransactionsAdmin;
