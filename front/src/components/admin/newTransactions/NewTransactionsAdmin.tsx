import { useAppSelector } from '@/store/hook';
import { selectAdminNewTransactions } from '@/features/adminNewMessages/adminNewTransactionSlice';
import cls from '../../../styles/_adminNewTransaction.module.scss';
import { IOrderMutation } from '@/types';
import { useState } from 'react';
import Modal from '@/components/UI/modal/modalAdmin/ModalAdmin';
interface IModal {
  state: boolean;
  order: IOrderMutation | null;
}
const NewTransactionsAdmin = () => {
  const [more, setMore] = useState<boolean>(false);
  const newTransactions = useAppSelector(selectAdminNewTransactions);
  let sixFirstTransactions: IOrderMutation[] = [];
  if (Array.isArray(newTransactions)) {
    if (newTransactions.length > 6) {
      sixFirstTransactions = newTransactions.slice(0, 6);
    } else {
      if (newTransactions.length) sixFirstTransactions = newTransactions;
    }
    if (more && newTransactions.length) sixFirstTransactions = newTransactions;
  }
  const moreShow = () => {
    setMore(!more);
  };
  const [isModalOpen, setModalOpen] = useState<IModal>({
    state: false,
    order: null,
  });
  const handleOpenModal = (order: IOrderMutation) => {
    setModalOpen({
      state: true,
      order: order,
    });
  };
  const handleCloseModal = () => {
    setModalOpen({
      state: false,
      order: null,
    });
  };
  return (
    <>
      {newTransactions && (
        <div className={cls.container}>
          <h3 className={cls.title}>Новые заказы</h3>
          <ul className={cls.cardList}>
            {sixFirstTransactions.length ? (
              sixFirstTransactions.map((transaction, index) => (
                <li
                  onClick={() => handleOpenModal(transaction)}
                  key={transaction._id}
                  className={cls.card}
                >
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
              ))
            ) : (
              <li className={cls.empty}>
                <span>Новых заказов нет</span>
              </li>
            )}
          </ul>
          {newTransactions &&
          newTransactions.length > 6 &&
          newTransactions.length !== sixFirstTransactions.length ? (
            <div className={cls.more}>
              <span onClick={moreShow}>еще {newTransactions.length - 6}</span>
            </div>
          ) : (
            newTransactions.length > 6 && (
              <div className={cls.more}>
                <span onClick={moreShow}>скрыть</span>
              </div>
            )
          )}

          <Modal isOpen={isModalOpen.state} onClose={handleCloseModal} order={isModalOpen.order} />
        </div>
      )}
    </>
  );
};

export default NewTransactionsAdmin;
