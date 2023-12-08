import React from 'react';
import cls from '@/styles/cart.module.scss';
import { apiUrl } from '@/constants';
import { ICart } from '@/types';
import { useAppDispatch } from '@/store/hook';
import { addProduct, decreaseProduct, delProduct } from '@/features/cart/cartSlice';

interface Props {
  item: ICart;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
      <tr key={item.product._id}>
        <td className={cls.productInfo}>
          <img className={cls.img} src={apiUrl + '/' + item.product.image} alt={item.product.title} />
            <div>
                <div className={cls.name}>{item.product.title}</div>
                <div
                    className={cls.delete} onClick={() =>
                    dispatch(delProduct(item.product._id))}>
                    Удалить из корзины
                </div>
            </div>
        </td>
        <td>
            <div className={cls.amount}>
                {item.amount > 1 && (
                    <button className={cls.amount_btn} onClick={() => dispatch(decreaseProduct(item.product._id))}>
                        -
                    </button>
                )}
                <span>{item.amount}</span>
                <button className={cls.amount_btn} onClick={() => dispatch(addProduct(item.product))}>
                    +
                </button>
            </div>
        </td>
        <td className={cls.price}>{item.product.actualPrice} KGS</td>
        <td className={cls.cost}>{item.product.actualPrice * item.amount} KGS</td>
      </tr>
  );
};

export default CartItem;
