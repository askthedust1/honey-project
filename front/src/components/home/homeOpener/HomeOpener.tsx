import React from 'react';
import cls from './homeOpener.module.scss';
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import {useAppSelector} from "@/store/hook";
import {selectBanners} from "@/features/banners/bannersSlice";

const HomeOpener = () => {
  const banners = useAppSelector(selectBanners);
  console.log(banners)

  return (
    <div className={cls.opener}>
        <ImageSlider images={banners}/>
      {/*<div className={cls.opener_item}>*/}
      {/*  <h2 className={cls.opener_item_title}>{t('titleOpened')}</h2>*/}
      {/*  <p className={cls.opener_item_content}>{t('contentOpened')}</p>*/}
      {/*  <button className={cls.opener_item_btn}>{t('btnOpened')}</button>*/}
      {/*</div>*/}
      {/*<img src={jar.src} alt={'jar'} />*/}
    </div>
  );
};

export default HomeOpener;
