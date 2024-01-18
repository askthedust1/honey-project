import React from 'react';
import ProductItem from '@/components/ProductsAll/ProductItem';
import { IProduct } from '@/types';
import cls from '../../styles/_product.module.scss';

interface Props {
  products: IProduct[];
}

const RelatedProducts: React.FC<Props> = ({ products }) => {
  return (
    <div>
      {products.length === 0 ? null : (
        <div>
          <h4 className={cls.relatedText}>Похожие товары:</h4>
          <div className={cls.relatedWrap}>
            {products.map((el: IProduct) => (
              <ProductItem key={el._id} product={el} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
