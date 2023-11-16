import React from 'react';
import cls from './homeOpener.module.scss';
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import {useAppSelector} from "@/store/hook";
import {selectBanners} from "@/features/banners/bannersSlice";

const HomeOpener = () => {
  const banners = useAppSelector(selectBanners);

  return (
    <div className={cls.opener}>
        <ImageSlider images={banners}/>
    </div>
  );
};

export default HomeOpener;
