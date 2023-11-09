import React, { memo } from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hook";
import { selectCategories } from "@/features/categories/categoriesSlice";
import cls from './categoriesList.module.scss';
import CategoryItem from "@/components/UI/categories/components/CategoryItem";
import {ICategory} from "@/types";
import Arrow from '@/assets/images/icon-arrow.svg';

const CategoriesList = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const slideLeft = () => {
    let slider = document.getElementById("slider");

    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 343;
    }
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");

    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 343;
    }
  };

  return (
    <div className={cls.categories}>
      <div className={cls.categories_inner}>
        <button className={cls.btn_carousel} title="scroll left" onClick={slideLeft}>
          <svg xmlns={Arrow} width="22" height="23" viewBox="0 0 22 23" fill="none">
            <path d="M9.23718 20.5717L10.3136 21.675C10.7694 22.1422 11.5065 22.1422 11.9574 21.675L21.3837 12.0183C21.8395 11.5511 21.8395 10.7957 21.3837 10.3335L11.9574 0.671797C11.5016 0.204616 10.7646 0.204616 10.3136 0.671797L9.23718 1.77514C8.77653 2.24729 8.78623 3.01764 9.25657 3.47985L15.0995 9.18542H1.16372C0.51881 9.18542 -2.47955e-05 9.71721 -2.47955e-05 10.3782V11.9686C-2.47955e-05 12.6296 0.51881 13.1614 1.16372 13.1614H15.0995L9.25657 18.867C8.78138 19.3292 8.77168 20.0995 9.23718 20.5717Z" fill="#FF8F31"/>
          </svg>
        </button>
        <div className={cls.categories_list} id="slider">
          {categories.map((item: ICategory) => (
            <CategoryItem
              image={item.image}
              key={item._id}
              title={item.title}
              _id={item._id}
              description={item.description ? item.description : ''}
            />
          ))}
        </div>
        <button className={cls.btn_carousel} title="scroll right" onClick={slideRight}>
          <svg xmlns={Arrow} width="22" height="23" viewBox="0 0 22 23" fill="none">
            <path d="M9.23718 20.5717L10.3136 21.675C10.7694 22.1422 11.5065 22.1422 11.9574 21.675L21.3837 12.0183C21.8395 11.5511 21.8395 10.7957 21.3837 10.3335L11.9574 0.671797C11.5016 0.204616 10.7646 0.204616 10.3136 0.671797L9.23718 1.77514C8.77653 2.24729 8.78623 3.01764 9.25657 3.47985L15.0995 9.18542H1.16372C0.51881 9.18542 -2.47955e-05 9.71721 -2.47955e-05 10.3782V11.9686C-2.47955e-05 12.6296 0.51881 13.1614 1.16372 13.1614H15.0995L9.25657 18.867C8.78138 19.3292 8.77168 20.0995 9.23718 20.5717Z" fill="#FF8F31"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default memo(CategoriesList);