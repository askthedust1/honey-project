import React from 'react';
import Image, { StaticImageData } from 'next/image';
import cls from '@/styles/_delivery.module.scss';

interface Props {
  item: { img: StaticImageData; text: string };
  bg?: string;
}

const DeliveryItm: React.FC<Props> = ({ item, bg }) => {
  const stl = { background: bg };
  return (
    <div style={stl} className={cls.delivery_media_card}>
      <div className={cls.delivery_media_card_img}>
        <Image
          style={{ objectFit: 'contain' }}
          src={item.img}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          quality={100}
          alt={item.text}
          fill
        />
      </div>
      <p className={cls.delivery_media_card_text}>{item.text}</p>
    </div>
  );
};

export default DeliveryItm;
