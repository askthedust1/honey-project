import React from 'react';
import cls from '@/styles/_contacts.module.scss';

interface Props {
  src: string;
}

const GoogleMap: React.FC<Props> = ({ src }) => {
  return (
    <div>
      <iframe
        src={src}
        className={cls.contacts_mapWrapper_map}
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
