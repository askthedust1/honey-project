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
    <div>
      <li className={cls.row} key={item.product._id}>
        <div className={cls.col}>
          <div className={cls.remove}>
            <svg
              onClick={() => dispatch(delProduct(item.product._id))}
              version="1.1"
              className={cls.close}
              x="0px"
              y="0px"
              viewBox="0 0 60 60"
              enableBackground="new 0 0 60 60"
            >
              <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
            </svg>
          </div>
          <div className={cls.thumbnail}>
            <img
              className={cls.img}
              src={apiUrl + '/' + item.product.image}
              alt={item.product.title}
            />
          </div>
          <div className={cls.detail}>
            <div className={cls.name}>{item.product.title}</div>
            <div className={cls.priceOne}>{item.product.actualPrice} KGS</div>
          </div>
          <div className={cls.quantity}>
            {item.amount > 1 ? (
              <button
                className={cls.decrease}
                onClick={() => dispatch(decreaseProduct(item.product._id))}
              >
                -
              </button>
            ) : null}
            <span>{item.amount}</span>
            <button className={cls.add} onClick={() => dispatch(addProduct(item.product))}>
              +
            </button>
          </div>
          <div className={cls.detailpr}>
            <div className={cls.price}>{item.product.actualPrice * item.amount} KGS</div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
