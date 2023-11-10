import React from 'react';
import { apiUrl } from '@/constants';
import Cart from '@/assets/images/cart.svg';
import Link from "next/link";
import cls from "./products.module.scss";

interface Props {
    _id: string;
    title: string;
    price: number;
    image: string;
}

const ProductItem: React.FC<Props> = ({ _id, title, price, image }) => {
    const picture = apiUrl + '/' + image;
    return (
        <Link href={'/products/' + _id}>
            <div className={cls.card}>
                <div className={cls.imgContainer}>
                    <div className={cls.cartIcon}>
                        <img src={Cart.src} alt="cart" />
                    </div>
                    <img className={cls.cardImg} src={picture} alt={title} />
                </div>
                <div className={cls.content}>
                    <h3 className={cls.title}>{title}</h3>
                    <p className={cls.price}>{price} сом</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
