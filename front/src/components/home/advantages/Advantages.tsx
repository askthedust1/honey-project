import React from 'react';
import cls from '../../../styles/_advantages.module.scss';
import { useTranslation } from 'next-i18next';
import advantages_i1 from '@/assets/images/Advan-img1.png';
import advantages_i2 from '@/assets/images/Advan-img2.png';
import advantages_i3 from '@/assets/images/Advan-img3.png';

const Advantages = () => {
  const { t } = useTranslation('home');
  return (
    <div className={cls.advantages}>
      <div className={cls.advantages_item}>
        <h3 className={cls.advantages_item_title}>{t('titleAdvantages')}</h3>
        <div className={cls.advantages_item_cards}>
          <div className={cls.advantages_item_cards_card}>
            <img src={advantages_i1.src} alt={''} />
            <p>{t('AdvantagesCard1')}</p>
          </div>
          <div className={cls.points}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={cls.advantages_item_cards_card}>
            <img src={advantages_i2.src} alt={''} />
            <p>{t('AdvantagesCard2')}</p>
          </div>
          <div className={cls.points}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={cls.advantages_item_cards_card}>
            <img src={advantages_i3.src} alt={''} />
            <p>{t('AdvantagesCard3')}</p>
          </div>
        </div>
        <button className={cls.advantages_item_btn}>{t('AdvantagesBtn')}</button>
      </div>
    </div>
  );
};

export default Advantages;
