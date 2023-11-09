import React from 'react';
import cls from "@/components/UI/categories/categoriesList.module.scss";
import IMG from "@/assets/images/logo.svg";
import Link from "next/link";
import {apiUrl} from "@/constants";

interface Props {
  title: string;
  description: string;
  _id: string;
  image: string | null;
}

const CategoryItem:React.FC<Props> = ({ _id, title, description, image }) => {
  let categoryImage = IMG.src;

  if (image) {
    categoryImage = apiUrl + '/' + image;
  }

  return (
    <Link key={_id} href={`/products`} className={cls.category_item}>
      <img className={cls.category_img} src={categoryImage} alt="product"/>
      <p className={cls.category_title}>{title}</p>
    </Link>
  );
};

export default CategoryItem;