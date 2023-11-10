import React from 'react';
import cls from './bestseller.module.scss'
import best_i1 from '@/assets/images/best-img1.png'
import best_i2 from '@/assets/images/best-img2.png'
import best_i3 from '@/assets/images/best-img3.png'
import {useTranslation} from "next-i18next";

const Bestseller = () => {
    const { t } = useTranslation('home');
    return (
        <div className={cls.bestseller}>
            <div className={cls.bestseller_container}>
                <div className={cls.bestseller_btns}>
                    <button className={cls.bestseller_btns_btn1}>{t('bestsellerBtn1')}</button>
                    <button className={cls.bestseller_btns_btn2}>{t('bestsellerBtn2')}</button>
                </div>

                <div className={cls.bestseller_cards}>
                    <div className={cls.bestseller_cards_card}>
                        <img src={best_i1.src} alt={'product1'}/>
                        <p>ANGEL'S GIFT THYME</p>
                        <span>500 KGS</span>
                    </div>
                    <div className={cls.bestseller_cards_card}>
                        <img src={best_i2.src} alt={'product2'}/>
                        <p>MOUNTAIN HONEY POLYFLOR</p>
                        <span>500 KGS</span>
                    </div>
                    <div className={cls.bestseller_cards_card}>
                        <img src={best_i3.src} alt={'product3'}/>
                        <p>WHITE HONEY SAINFOIN</p>
                        <span>500 KGS</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Bestseller;
