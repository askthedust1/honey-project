import React, { FC } from 'react';
import { useAppDispatch } from '@/store/hook';
import Image from 'next/image';
import {
  confirmOrderAdmin,
  fetchAdminHewTransaction,
} from '@/features/adminNewMessages/adminNewTransactionThunk';
import { apiUrl } from '@/constants';
import { IOrderMutation } from '@/types';
import cls from '../../../../styles/_adminModal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: IOrderMutation | null;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, order }) => {
  const dispatch = useAppDispatch();
  if (!isOpen) return null;
  const handleInnerBlockClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const handleConfirmOrder = async () => {
    if (order) {
      await dispatch(confirmOrderAdmin(order._id));
      await dispatch(fetchAdminHewTransaction());
      onClose();
    }
  };
  return (
    <div className={cls.modal} onClick={onClose}>
      <div className={cls.modal_container} onClick={handleInnerBlockClick}>
        <button className={cls.closeButton} onClick={onClose}></button>
        <h2>Информация о заказе</h2>
        {order && (
          <div className={cls.content}>
            <div className={cls.adminModalTable}>
              <table>
                <thead>
                  <tr>
                    <th>Фотография</th>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Хит</th>
                  </tr>
                </thead>
                <tbody className={cls.tableBodyBlock}>
                  {order.kits.map((kit) => (
                    <tr key={kit.product._id}>
                      <td className={cls.imageTd}>
                        <Image
                          width={150}
                          height={150}
                          priority
                          quality={80}
                          src={apiUrl + '/' + kit.product.image}
                          alt={kit.product.translations.ru.title}
                        />
                      </td>
                      <td>{kit.product.translations.ru.title}</td>
                      <td>{kit.product.category.translations.ru.title}</td>
                      <td>{kit.product.actualPrice}</td>
                      <td>{kit.amount}</td>
                      <td>{kit.product.isHit ? 'хит' : 'не хит'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={cls.infoContainer}>
              <div>
                <span>Имя: </span>
                {order.user.displayName}
              </div>
              <div>
                <span>Тел: </span>
                {order.user.phone}
              </div>
              <div>
                <span>Адрес: </span>
                {order.address}
              </div>
              <div className={cls.kits}>
                <span>Заказ: </span>
                {order.kits.length}{' '}
                {order.kits.length === 1
                  ? 'товар'
                  : order.kits.length > 1 && order.kits.length <= 4
                  ? 'товара'
                  : 'товаров'}
              </div>
              <div>
                <span>Всего: </span>
                {order.totalPrice} сом
              </div>
              <div className={cls.dateTime}>
                <span>Дата: </span>
                {new Date(order.dateTime).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false,
                  timeZone: 'UTC',
                })}
              </div>
              <div>
                <button onClick={handleConfirmOrder} className={cls.btnConfirmOrder}>
                  Подтвердить заказ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
