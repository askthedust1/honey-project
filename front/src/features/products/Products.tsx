import React from 'react';
import { useAppSelector } from '@/store/hook';
import { selectAllProducts } from '@/features/products/productsSlice';
import ProductItem from '@/features/products/components/ProductItem';
import { IProduct } from '@/types';

const Products = () => {
  const products = useAppSelector(selectAllProducts);

  return (
    <div>
      Вся продукция:
      <div className="cards-list">
        {products.map((el: IProduct) => (
          <ProductItem
            key={el._id}
            _id={el._id}
            title={el.title}
            price={el.price}
            image={el.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
