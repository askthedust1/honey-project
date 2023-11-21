import React from 'react';
import cls from "@/styles/_categoriesList.module.scss";
import IMG from "@/assets/images/logo.svg";
import Link from "next/link";
import {apiUrl} from "@/constants";

interface Props {
  title: string;
  description: string;
  _id: string;
  image: string | null;
}

const CategoryItem:React.FC<Props> = ({ _id, title, image }) => {
  let categoryImage = IMG.src;

  if (image) {
    categoryImage = apiUrl + '/' + image;
  }

  return (
    <Link
      key={_id}
      href={{
        pathname: 'category/page/path',
        query: { cId: _id, cPage: '1' },
      }}
      className={cls.category_item}
    >
      <img className={cls.category_img} src={categoryImage} alt="product"/>
      <p className={cls.category_title}>{title}</p>
    </Link>
  );
};

export default CategoryItem;