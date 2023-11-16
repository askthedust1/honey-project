import React from 'react';
import cls from '../../../styles/_benefitsOfHoney.module.scss';
import BenefitImg from '../../../assets/images/benefit-img.svg';
import Honeybee from '../../../assets/images/benefit-honeybee.svg';
import Hexagon from '../../../assets/images/benefit-hexagon.png';
import {useTranslation} from "next-i18next";

const BenefitsOfHoney = () => {
  const { t } = useTranslation('home');

  return (
    <div className={cls.benefit}>

      <h2>{t('BenefitTitle')}</h2>

      <div className={cls.benefit_inner}>
        <div className={cls.benefit_img}>
          <img className={cls.benefit_img_main} src={BenefitImg.src} alt="Photo"/>
          <span>
            <img src={Honeybee.src} alt="Honeybee"/>
          </span>
          <span>
            <img className={cls.firstBee} src={Honeybee.src} alt="Honeybee"/>
          </span>
        </div>

        <div className={cls.benefit_list}>
          <div className={cls.benefit_list_item}>
            <span>
              <img src={Hexagon.src} alt="Hexagon"/>
            </span>
            <p>1</p>
            <h3>{t('BenefitCard1')}</h3>
          </div>

          <div className={cls.benefit_list_item}>
            <span>
              <img src={Hexagon.src} alt="Hexagon"/>
            </span>
            <p>2</p>
            <h3>{t('BenefitCard2')}</h3>
          </div>

          <div className={cls.benefit_list_item}>
            <span>
              <img src={Hexagon.src} alt="Hexagon"/>
            </span>
            <p>3</p>
            <h3>{t('BenefitCard3')}</h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BenefitsOfHoney;