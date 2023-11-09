import React from 'react';
import cls from './advantages.module.scss';
import {useTranslation} from "next-i18next";

const Advantages = () => {
    const { t } = useTranslation('home');
    return (
        <div className={cls.advantages}>
            <div className={cls.advantages_item}>
                <h3 className={cls.advantages_item_title}>{t('titleAdvantages')}</h3>
                <div className={cls.advantages_item_cards}>
                    <div className={cls.advantages_item_cards_card}>
                        <img alt={''}/>
                        <p>{t('AdvantagesCard1')}</p>
                    </div>
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={cls.advantages_item_cards_card}>
                        <img alt={''}/>
                        <p>{t('AdvantagesCard2')}</p>
                    </div>
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={cls.advantages_item_cards_card}>
                        <img alt={''}/>
                        <p>{t('AdvantagesCard3')}</p>
                    </div>
                </div>
                <button className={cls.advantages_item_btn}>{t('AdvantagesBtn')}</button>
            </div>
        </div>
    );
};

export default Advantages;
