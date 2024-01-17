import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Link from 'next/link';
import {
  changeCurrentPage,
  changeName,
  changePhone,
  resetCurrentStatus,
  resetTotalPages,
  selectOrderOneAdmin,
} from '@/features/orderAdmin/ordersAdminSlice';
import { fetchOrderOneAdmin } from '@/features/orderAdmin/ordersAdminThunk';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import OneOrderItem from '@/components/admin/oneOrder/OneOrderItem';
import { MyPage } from '@/components/common/types';
import { IProductOfKits } from '@/types';
import cls from '../../../styles/_adminOneOrder.module.scss';

const OrderInfo: MyPage = () => {
  const { id } = useParams() || {};
  const dispatch = useAppDispatch();
  const orderOne = useAppSelector(selectOrderOneAdmin);
  useEffect(() => {
    if (id) {
      if (typeof id === 'string') {
        dispatch(fetchOrderOneAdmin(id));
      }
    }
  }, [dispatch, id]);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  const onClick = async () => {
    dispatch(changeCurrentPage(1));
    dispatch(resetTotalPages());
    dispatch(resetCurrentStatus());
    dispatch(changeName(null));
    dispatch(changePhone(null));
  };

  return (
    <ProtectedRoute>
      {orderOne && (
        <div className={cls.orderContainer}>
          <Link className={cls.back} href={`/admin/orders/`} onClick={onClick}>
            Вернуться в заказы
          </Link>
          <h1 className={cls.adminOrdersMainTitle}>Информация о заказе</h1>
          <h2>Заказ №: {orderOne.indexNumber}</h2>
          <div className={cls.infoBlock}>
            <div className={cls.infoUser}>
              <h3>Покупатель:</h3>
              <p className={cls.infoPont}>
                <span className={cls.infoPointSpan}>Имя:</span> {orderOne.user.displayName}
              </p>
              <p className={cls.infoPont}>
                <span className={cls.infoPointSpan}>e-mail:</span> {orderOne.user.email}
              </p>
              <p className={cls.infoPont}>
                <span className={cls.infoPointSpan}>Телефон:</span> {orderOne.user.phone}
              </p>
            </div>

            <div className={cls.infoKit}>
              <h3>Заказ:</h3>
              <ul className={cls.infoProductsList}>
                {orderOne.kits.map((orderItem: IProductOfKits) => (
                  <OneOrderItem item={orderItem} key={orderItem.product._id} />
                ))}
              </ul>
            </div>

            <div className={cls.infoKit}>
              <h3>
                Сумма заказа: <span className={cls.innerPointSpan}>{orderOne.totalPrice} KGS</span>
              </h3>
            </div>

            <div className={cls.infoKit}>
              <h3>
                Статус заказа:{' '}
                <span className={cls.innerPointSpan}>
                  {orderOne.status ? 'Подтвержден' : 'Не подтвержден'}
                </span>
              </h3>
            </div>

            <div className={cls.infoKit}>
              <h3>
                Адрес доставки: <span className={cls.innerPointSpan}>{orderOne.address} KGS</span>
              </h3>
            </div>

            <div className={cls.infoKit}>
              <h3>
                Дата заказа:{' '}
                <span className={cls.innerPointSpan}>
                  {new Date(orderOne.dateTime).toLocaleDateString('ru-RU', options)}
                </span>
              </h3>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

OrderInfo.Layout = 'Admin';

export default OrderInfo;
