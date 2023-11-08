import React from 'react';
import { apiUrl } from '@/constants';
import Link from "next/link";

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
            <div className="card">
                <img src={picture} alt={title} />
                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-price">{price} сом</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;