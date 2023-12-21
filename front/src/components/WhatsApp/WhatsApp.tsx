import React from 'react';
import cls from './wa.module.scss';

const WhatsApp = () => {
  return (
    <a
      href="https://wa.me/+996555557577"
      className={cls.whatsapp_float}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className={cls.whatsapp_icon}></i>
    </a>
  );
};

export default WhatsApp;
