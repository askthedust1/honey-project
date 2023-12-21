import React from 'react';
import cls from '@/styles/_delivery.module.scss';
import Image, { StaticImageData } from 'next/image';

interface Props {
  item: { img: StaticImageData; text: string };
  bg?: string;
}

const DeliveryItm: React.FC<Props> = ({ item, bg }) => {
  const stl = { background: bg };
  return (
    <div style={stl} className={cls.delivery_media_card}>
      <div className={cls.delivery_media_card_img}>
        <Image src={item.img} alt={item.text} layout="fill" objectFit="contain" />
      </div>
      <p className={cls.delivery_media_card_text}>{item.text}</p>
    </div>
  );
};

export default DeliveryItm;
