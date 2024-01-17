import React from 'react';
import { StaticImageData } from 'next/image';
import DeliveryItm from '@/components/DelivetyItm/DeliveryItm';
import cls from '@/styles/_delivery.module.scss';

interface Props {
  array: { img: StaticImageData; text: string }[];
  content?: string;
  bgCl?: string;
}

const DeliveryItms: React.FC<Props> = ({ bgCl, array, content }) => {
  const stl = { justifyContent: content };

  return (
    <div style={stl} className={cls.delivery_media}>
      {array.map((item, index) => (
        <DeliveryItm key={index} item={item} bg={bgCl} />
      ))}
    </div>
  );
};

export default DeliveryItms;
