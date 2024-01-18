import React from 'react';
import { useAppSelector } from '@/store/hook';
import { selectBanners } from '@/features/banners/bannersSlice';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import cls from '../../../styles/_homeOpener.module.scss';

const HomeOpener = () => {
  const banners = useAppSelector(selectBanners);

  return (
    <div className={cls.opener}>
      <ImageSlider images={banners} width={1074} />
    </div>
  );
};

export default HomeOpener;
